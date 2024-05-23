from pydantic import BaseModel


class lil_form(BaseModel):
    token: str
    id: int
    fio: str
    rank: str
    experience: int
    age: int
    dep_id: int
    email: str
    password: str

