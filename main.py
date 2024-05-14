from fastapi import FastAPI
from create_jwt import create_access_token, decode_token
from dbxd.add import add_ment, add_user
from dbxd.checkLogin import check_login_ment, check_login_user
from dbxd.get_info import get_info_by_id
from models.UserModel import User
from models.loginModel import Login
from models.registerModel import lil_form
from models.useddataModel import userData

app = FastAPI()


# login для всех ментов
@app.post("/login/ment/")
async def login(ment: Login):
    answer = await check_login_ment(ment.email, ment.password)
    if answer is False:
        return {"login": answer}
    response = {"fio": answer[1], "token": create_access_token(answer[0])}
    return response


# регистрация lil ментов (может только main мент)
@app.post("/register/lil/")
async def register(ment: lil_form):
    answer = await check_login_ment(ment.email, ment.password)
    if answer is False:
        rank = decode_token(token=ment.token)["rank"]
        if rank == "полковник":
            response = await add_ment(ment)
            return response
    return {"login": "Already registered"}


# получение ГАИ по id
@app.get("/get/gai/{id}")
async def get_gai(id: int):
    response = await get_info_by_id("menti_departments", ["address"], id)
    return response


# Получение данных мента по id
@app.get("/get/ment/{id}")
async def det_ment(id: int):
    response = await get_info_by_id("lil_ment", ["fio", "rank", "dep_id", "email", "experience"], id)
    return {"data": response}


# Регистрация user
@app.post("/register/user/")
async def register(user: User):
    if check_login_user(user.email, user.password)["message"] is False:
        response = add_user(user)
        return response
    return {"message": "User already registered"}


# Логин user
@app.post("/login/user/")
async def login(user: Login):
    response = check_login_user(user.email, user.password)
    if response["message"] is False:
        return {"message": "No such user"}
    else:
        return response


# Получить данные user по лицензии (только мент)
@app.post("/get/user/data")
async def userdata(user: userData):
    if decode_token(token=user.token)["rank"] == "lil" or "main":
        return get_info_by_id("users", ["license", "fio", "card", "email"], user.license)
    return {"message": "No access right"}
