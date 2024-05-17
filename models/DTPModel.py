from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel
from models.CarModel import CarDtp


class DTP(BaseModel):
    describe: str
    cars: List[CarDtp]
    address: str
    date: datetime
    photo: Optional[bytes] = None
