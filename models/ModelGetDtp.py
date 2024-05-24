from pydantic import BaseModel


class GetDtp(BaseModel):
    token: str
    car_num: str
