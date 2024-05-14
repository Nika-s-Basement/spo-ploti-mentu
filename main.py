import re

from fastapi import FastAPI, HTTPException
from create_jwt import create_access_token, decode_token
from dbxd.add import add_ment, add_user, add_car
from dbxd.checkLogin import check_login_ment, check_login_user
from dbxd.get_info import get_info_by_id, get_info_car
from dbxd.paterns import email_pattern, car_number_pattern
from models.CarModel import CarModel
from models.UserModel import User
from models.loginModel import Login
from models.registerModel import lil_form
from models.useddataModel import userData

app = FastAPI()


# login для всех ментов
@app.post("/login/ment/")
async def login(ment: Login):
    if not re.match(email_pattern, ment.email):
        raise HTTPException(status_code=400, detail="Email is invalid")
    answer = await check_login_ment(ment.email, ment.password)
    if answer is not False:
        response = {"fio": answer[1], "token": create_access_token(answer[0])}
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
        if rank == "полковник":
            response = await add_ment(ment)
            if response is True:
                raise HTTPException(status_code=200, detail="Successfully registered")
        raise HTTPException(status_code=403, detail="No access right")
    raise HTTPException(status_code=409, detail="Ment already registered")


# получение ГАИ по id
@app.get("/get/gai/{id}")
async def get_gai(id: int):
    response = await get_info_by_id("menti_departments", ["address"], id)
    if response is False:
        raise HTTPException(status_code=404, detail="No such gai")
    return response


# Получение данных мента по id
@app.get("/get/ment/{id}")
async def det_ment(id: int):
    response = await get_info_by_id("lil_ment", ["fio", "rank", "dep_id", "email", "experience"], id)
    if response is False:
        raise HTTPException(status_code=404, detail="No such ment")
    return response


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
        return {"data": response, "token": token}
    raise HTTPException(status_code=404, detail="No such user")


# Получить данные user по лицензии (только мент)
@app.post("/get/user/data")
async def userdata(user: userData):
    if decode_token(token=user.token)["rank"] == "lil" or "майор":
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

