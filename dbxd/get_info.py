import psycopg2


async def get_info_by_id(where, hat, idid):
    try:
        conn = psycopg2.connect(dbname="dtp_ploti_mentu",
                                user="postgres",
                                password="aza_967.",
                                host="localhost",
                                port="5432")
        cur = conn.cursor()
        which = " ".join(hat)
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
