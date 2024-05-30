import psycopg2

from conn import connection
from models.UserModel import UserDtp


async def check_login_ment(email, password):
    curr = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        curr = conn.cursor()
        curr.execute('''SELECT email, rank, dep_id, fio, id FROM lil_ment 
        WHERE email = %s and password = %s''', (email, password))
        row = curr.fetchone()
        if row is None:
            return False
        ret_data = [{"email": row[0], "rank": row[1], "dep_id": row[2], "id": row[4]}, row[3], row[4]]
        return ret_data
    except (Exception, psycopg2.DatabaseError) as error:
        return {"Error": error}
    finally:
        curr.close()
        conn.close()


async def check_login_user(email, password):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''SELECT * FROM users WHERE email = %s and password = %s''',
                    (email, password))
        data = cur.fetchone()
        if data is None:
            return False
        return {"license": data[0], "fio": data[1], "card": [data[3]]}
    except (Exception, psycopg2.DatabaseError) as error:
        return {"Error": error}
    finally:
        cur.close()
        conn.close()


async def check_user(license):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''SELECT * FROM users WHERE license = %s''',
                    (license,))
        data = cur.fetchone()
        if data is None:
            return False
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        return {"Error": error}
    finally:
        cur.close()
        conn.close()
