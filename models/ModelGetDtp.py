from pydantic import BaseModel


class GetDtp(BaseModel):
    token: str
    address: str = None
    car_num: str = None
