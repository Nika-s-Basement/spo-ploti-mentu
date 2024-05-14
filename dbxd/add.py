import psycopg2

from conn import connection
from models.CarModel import CarModel
from models.UserModel import User
from models.registerModel import lil_form


async def add_ment(form: lil_form):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        data = [form.id, form.fio, form.rank, form.experience, form.age,
                form.dep_id, form.boss, form.email, form.password]
        cur.execute('''INSERT INTO lil_ment (id, fio, rank, experience, age, dep_id, boss, email, password)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)''', data)
        conn.commit()
        return {"message": "Successfully added ment"}
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": {error}}
    finally:
        cur.close()
        conn.close()


async def add_user(form: User):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''INSERT INTO users (license, fio, card, email, password) 
        VALUES  %s, %s, %s, %s, %s''',
                    [form.license, form.fio, form.card, form.email, form.password])
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": {error}}
    finally:
        cur.close()
        conn.close()


async def add_car(car: CarModel):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(connection)
        cur = conn.cursor()
        cur.execute('''INSERT INTO car (id, pts, insurance, id_user)
        VALUES %s, %s, %s, %s''', (car.id, car.pts, car.insurance, car.id_user))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": error}
    finally:
        cur.close()
        conn.close()
