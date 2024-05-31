import os
import re
from typing import Annotated
import uvicorn
from fastapi import FastAPI, HTTPException, Header
from starlette.middleware.cors import CORSMiddleware
from create_jwt import create_access_token, decode_token
from dbxd.add import add_ment, add_user, add_car
from dbxd.checkLogin import check_login_ment, check_login_user
from dbxd.gai.get_dai_id import get_gai_id, get_gai_all
from dbxd.get_info import get_info_by_id, get_info_car, get_dtp_data, get_dtp_data_data
from dbxd.paterns import email_pattern, car_number_pattern
from dtp_logic.AddToBd import add_dtp, add_elements
from dtp_logic.check import check_cars
from models.CarModel import CarModel
from models.DTPModel import DTP
from models.ModelGetDtp import GetDtp
from models.UserModel import User
from models.loginModel import Login
from models.registerModel import lil_form
from models.useddataModel import userData

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешает все источники
    allow_credentials=True,
    allow_methods=["*"],  # Разрешает все методы
    allow_headers=["*"],  # Разрешает все заголовки
)


@app.get("/")
async def ret_pin():
    return {"message": "We are in work"}


@app.head("/")
async def ret_pin():
    return {}


# login для всех ментов
@app.post("/login/ment/")
async def login(ment: Login):
    if not re.match(email_pattern, ment.email):
        raise HTTPException(status_code=400, detail="Email is invalid")
    answer = await check_login_ment(ment.email, ment.password)
    if answer is not False:
        response = {"fio": answer[1], "id": answer[2], "token": create_access_token(answer[0])}
        return response
    raise HTTPException(status_code=404, detail="No such ment")


# регистрация lil ментов (может только main мент)
@app.post("/register/lil/")
async def register(ment: lil_form):
    if not re.match(email_pattern, ment.email):
        raise HTTPException(status_code=400, detail="Email is invalid")
    answer = await check_login_ment(ment.email, ment.password)
    if answer is False:
        rank = decode_token(token=ment.token)["rank"]
        print(rank)
        if rank in ["майор", "main"]:
            response = await add_ment(ment)
            if response is True:
                raise HTTPException(status_code=200, detail="Successfully registered")
        raise HTTPException(status_code=403, detail="No access right")
    raise HTTPException(status_code=409, detail="Ment already registered")


# получение ГАИ по id
@app.get("/get/gai/{id}")
async def get_gai(id: int):
    response = await get_gai_id(id)
    if response is False:
        raise HTTPException(status_code=404, detail="No such gai")
    return response


@app.get("/get/all/gai")
async def get_all_gai():
    response = await get_gai_all()
    if response is None:
        raise HTTPException(status_code=404, detail="No such gai")
    print(response)
    return response


# Получение данных мента по id
@app.get("/get/ment/{id}")
async def det_ment(id: int):
    response = await get_info_by_id("lil_ment", ["fio", "rank", "dep_id", "email", "experience"], id)
    if response is False:
        raise HTTPException(status_code=404, detail="No such ment")
    return {"gai": response}


# Регистрация user
@app.post("/register/user/")
async def register(user: User):
    if not re.match(email_pattern, user.email):
        raise HTTPException(status_code=400, detail="Email is invalid")
    request = await check_login_user(user.email, user.password)
    if request is not False:
        raise HTTPException(status_code=409, detail="User already registered")
    response = await add_user(user)
    if response is True:
        raise HTTPException(status_code=200, detail="Successfully registered")
    raise HTTPException(status_code=204, detail="No connect")


# Логин user
@app.post("/login/user/")
async def login(user: Login):
    if not re.match(email_pattern, user.email):
        raise HTTPException(status_code=400, detail="Email is invalid")
    response = await check_login_user(user.email, user.password)
    if response:
        response["rank"] = "user"
        token = create_access_token(response)
        response.pop("rank")
        return {"data": response, "token": token, "id": response["license"]}
    raise HTTPException(status_code=404, detail="No such user")


# Получить данные user по лицензии (только мент)
@app.post("/get/user/data")
async def userdata(user: userData):
    if decode_token(token=user.token)["rank"] in ["lil", "main"]:
        return await get_info_by_id("users", ["license", "fio", "card", "email"], user.license, "license")
    raise HTTPException(status_code=403, detail="No access right")


# Получение машин по удостоверению user
@app.get("/get/user/car/{id}")
async def usercar(id: str):
    response = await get_info_car(id)
    if response is not False:
        return response
    raise HTTPException(status_code=404, detail="No such car")


# Добавление машины
@app.post("/add/car/")
async def addcar(car: CarModel):
    if not re.match(car_number_pattern, car.car_num):
        raise HTTPException(status_code=400, detail="Car number is invalid")
    if decode_token(token=car.token)["rank"] not in ["lil", "main", "user"]:
        raise HTTPException(status_code=403, detail="No access right")
    if await get_info_by_id("users", ["*"], car.id_user, "license") is False:
        raise HTTPException(status_code=404, detail="No such user")
    if await get_info_car(car.car_num) is not False:
        raise HTTPException(status_code=409, detail="Car already registered")
    response = await add_car(car)
    if response is True:
        raise HTTPException(status_code=200, detail="Car successfully added")
    raise HTTPException(status_code=204, detail="No connect")


@app.post("/add/dtp/")
async def add_dtp_main(dtp: DTP, authorization: Annotated[str | None, Header()] = None):
    rank = decode_token(token=authorization)["rank"]
    if rank not in ["lil", "main", "user"]:
        raise HTTPException(status_code=403, detail="No access right")
    if await check_cars(dtp.cars) is False:
        raise HTTPException(status_code=404, detail="No such car")
    dtp_id = await add_dtp(dtp)
    bool_dtp_id = dtp_id["result"]
    add_elementi = await add_elements(dtp.cars, dtp_id["id"])
    if add_elementi["result"] & bool_dtp_id is True:
        raise HTTPException(status_code=200, detail="Successfully added")
    if add_elementi["error"] is True:
        raise HTTPException(status_code=405, detail=add_elementi["message"])
    raise HTTPException(status_code=400, detail="Bad request")


@app.post("/get/dtp/address/")
async def get_dtp_app(dtp: GetDtp):
    if decode_token(token=dtp.token)["rank"] in ["lil", "main", "user"]:
        data = await get_dtp_data(dtp.address)
        if data is False:
            raise HTTPException(status_code=404, detail="No such DTP")
        return data
    raise HTTPException(status_code=400, detail="Bad request")


@app.post("/get/dtp/car/num/")
async def get_dtp_app(dtp: GetDtp):
    if decode_token(token=dtp.token)["rank"] in ["lil", "main", "user"]:
        print(dtp.car_num)
        data = await get_dtp_data_data(dtp.car_num)
        if data is False:
            raise HTTPException(status_code=404, detail="No such DTP")
        return data
    raise HTTPException(status_code=400, detail="Bad request")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
