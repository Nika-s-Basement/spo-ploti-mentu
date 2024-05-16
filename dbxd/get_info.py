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
