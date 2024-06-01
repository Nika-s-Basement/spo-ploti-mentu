from pydantic import BaseModel


class userData(BaseModel):
    token: str
    license: int
