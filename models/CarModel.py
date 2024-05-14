from pydantic import BaseModel


class CarModel(BaseModel):
    token: str
    car_num: str
    pts: int
    insurance: int
    id_user: int
