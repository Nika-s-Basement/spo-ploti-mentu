import psycopg2

from conn import connection


async def get_info_by_id(where, hat, idid, id="id"):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        which = ", ".join(hat)
        cur.execute(f"SELECT {which} FROM {where} WHERE {id} = %s", (idid,))
        rows = cur.fetchall()
        response = dict()
        for row in rows:
            for i in range(len(hat)):
                response[str(hat[i])] = str(row[i])
        if response == {}:
            response = False
        return response
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": error}
    finally:
        cur.close()
        conn.close()


async def get_info_car(id):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''SELECT pts, insurance, id_user
                        FROM car WHERE car_num = %s''', (id, ))
        data = cur.fetchone()
        if data is None:
            return False
        return {"data": {"pts": data[0], "insurance": data[1], "id_user": data[2]}}
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": error}
    finally:
        conn.close()
        cur.close()


async def get_car(id):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''SELECT pts, insurance, id_user
                        FROM car WHERE car_num = %s''', (id, ))
        data = cur.fetchone()
        if data is None:
            return False
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": error}
    finally:
        conn.close()
        cur.close()


async def get_dtp_data(id):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''SELECT address, "date", "describe", photo, cr.car_num, us.license
        FROM elements ae
        JOIN car cr ON ae.car_num = cr.car_num
        JOIN users us ON cr.id_user = us.license
        JOIN dtp ON ae.dtp_id = dtp.id
        WHERE dtp.address = %s''', (id,))
        data = cur.fetchall()
        if len(data) == 0:
            return False
        response = {"date": data[0][1],
                    "describe": data[0][2], "elements": [[row[4], row[5]] for row in data]}
        return response
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": error}
    finally:
        cur.close()
        conn.close()


async def get_dtp_data_data(id):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''SELECT address, "date", "describe", photo, cr.car_num, us.license
        FROM elements ae
        JOIN car cr ON ae.car_num = cr.car_num
        JOIN users us ON cr.id_user = us.license
        JOIN dtp ON ae.dtp_id = dtp.id
        WHERE cr.car_num = %s''', (id,))
        data = cur.fetchall()
        if len(data) == 0:
            return False
        response = {"car_num": data[0][4],
                    "license": data[0][5], "dtps": [[row[0], row[1], row[2], row[3]] for row in data]}
        return response
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": error}
    finally:
        cur.close()
        conn.close()


async def get_vse_dtp():
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''SELECT dtp.address, dtp.date, dtp.describe, array_agg(car.car_num) 
        FROM elements el
        JOIN dtp ON el.dtp_id = dtp.id
        JOIN car ON el.car_num = car.car_num
        GROUP BY dtp.address, dtp.date, dtp.describe''')
        data = cur.fetchall()
        response = [{"address": row[0], "date": row[1], "describe": row[2], "cars": [num for num in row[3]]} for row in data]
        return response
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": error}
    finally:
        cur.close()
        conn.close()
