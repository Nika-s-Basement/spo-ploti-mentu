from typing import List
from dbxd.checkLogin import check_user
from dbxd.get_info import get_car
from models.CarModel import CarDtp
from models.UserModel import UserDtp


async def check_cars(cars: List[CarDtp]):
    res = True
    for car in cars:
        res *= await get_car(car.car_num)
    return res


async def check_users(users: List[UserDtp]):
    res = True
    for user in users:
        res *= await check_user(user.license)
    return res
