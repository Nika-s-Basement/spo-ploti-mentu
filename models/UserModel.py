from pydantic import BaseModel


class User(BaseModel):
    fio: str
    license: int
    card: int
    email: str
    password: str


class UserDtp(BaseModel):
    fio: str
    license: int
    email: str
