from pydantic import BaseModel


class CarModel(BaseModel):
    id: int
    pts: int
    insurance: int
    id_user: int
