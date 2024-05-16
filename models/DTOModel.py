from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel
from models.CarModel import CarDtp
from models.UserModel import UserDtp


class DTP(BaseModel):
    cars: List[CarDtp]
    users: List[UserDtp]
    address: str
    date: datetime
    photo: Optional[bytes] = None
