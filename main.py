from fastapi import FastAPI

from create_jwt import create_access_token
from dbxd.checkLogin import check_login_ment
from models.mentModel import Ment

app = FastAPI()


@app.post("/login/")
async def login(ment: Ment):
    answer = await check_login_ment(ment.email, ment.password)
    if answer is not None:
        response = {"fio": answer[1], "token": create_access_token(answer[0])}
        return response
    return answer


