import psycopg2

from conn import connection


async def check_login_ment(email, password):
    curr = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        curr = conn.cursor()
        curr.execute('''SELECT email, rank, dep_id, fio FROM lil_ment 
        WHERE email = %s and password = %s''', (email, password))
        rows = curr.fetchone()
        if rows is None:
            return False
        ret_data = [{"email": rows[0], "rank": rows[1], "dep_id": rows[2]}, rows[3]]
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
        return {"id": data[0], "fio": data[1], "license": data[2], "card": [data[3]]}
    except (Exception, psycopg2.DatabaseError) as error:
        return {"Error": error}
    finally:
        cur.close()
        conn.close()

