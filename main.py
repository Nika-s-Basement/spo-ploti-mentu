from fastapi import FastAPI

from create_jwt import create_access_token, decode_token
from dbxd.add_ment import add_ment
from dbxd.checkLogin import check_login_ment
from dbxd.get_info import get_info_by_id
from models.loginModel import Ment
from models.registerModel import lil_form

app = FastAPI()


# login для всех ментов
@app.post("/login/")
async def login(ment: Ment):
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
@app.get("/get/gai/{idid}")
async def get_gai(idid: int):
    response = await get_info_by_id("menti_departments", ["address"], idid)
    return response
