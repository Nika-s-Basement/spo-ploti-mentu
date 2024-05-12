from pydantic import BaseModel


class Ment(BaseModel):
    email: str
    password: str
