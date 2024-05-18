from typing import List, Optional
import psycopg2
from conn import connection
from models.CarModel import CarDtp
from models.DTPModel import DTP


async def add_dtp(dtp: DTP):
    conn = None
    cur = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''INSERT INTO dtp (address, date, photo, describe)
        VALUES (%s, %s, %s, %s) RETURNING id''',
        (dtp.address, dtp.date, dtp.photo, dtp.describe))
        id = cur.fetchone()[0]
        conn.commit()
        return {"result": True, "id": id}
    except (Exception, psycopg2.Error) as error:
        return {"error": error}
    finally:
        cur.close()
        conn.close()


async def add_elements(cars: List[CarDtp], id):
    conn = None
    cur = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        for car in cars:
            cur.execute('''INSERT INTO elements (car_num, dtp_id) VALUES (%s, %s)''', (car.car_num, id))
            conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": error}
    finally:
        cur.close()
        conn.close()

