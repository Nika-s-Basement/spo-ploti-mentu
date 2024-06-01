import psycopg2
from conn import connection


async def get_gai_id(id):
    conn = None
    cur = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''SELECT address, map, fio, age FROM menti_departments
        JOIN lil_ment ON menti_departments.main_ment = lil_ment.id
        WHERE menti_departments.id = %s''', (id,))
        data = cur.fetchone()
        if data is None:
            return False
        return {"address": data[0], "map": data[1], "fio": data[2], "age": data[3]}
    except (Exception, psycopg2.DatabaseError) as error:
        return {"error": error}
    finally:
        cur.close()
        conn.close()


async def get_gai_all():
    conn = None
    cur = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''SELECT address, map, fio, age FROM menti_departments
            JOIN lil_ment ON menti_departments.main_ment = lil_ment.id''')
        rows = cur.fetchall()
        response = []
        for row in rows:
            response.append({"address": row[0], "map": row[1], "fio": row[2], "age": row[3]})
        return response
    except (Exception, psycopg2.DatabaseError) as error:
        return {"error": error}
    finally:
        cur.close()
        conn.close()
