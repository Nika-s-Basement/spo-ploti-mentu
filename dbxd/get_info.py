import psycopg2

from conn import connection


async def get_info_by_id(where, hat, idid):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        which = ", ".join(hat)
        cur.execute(f"SELECT {which} FROM {where} WHERE id = %s", (idid,))
        rows = cur.fetchall()
        response = dict()
        for row in rows:
            for i in range(len(hat)):
                response[str(hat[i])] = str(row[i])
        if response == {}:
            response = {"error": "Not found"}
        return response
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": error}
    finally:
        cur.close()
        conn.close()

