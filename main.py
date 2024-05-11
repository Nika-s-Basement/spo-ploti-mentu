from fastapi import FastAPI

from dbxd.checkLogin import checkLogin
from models.mentModel import Ment

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.get("/login/{email}/{password}")
async def login(email: str, password: str):
    answer = await checkLogin(email, password)
    if answer is not None:
        return answer
    return {"message": "No such user"}


