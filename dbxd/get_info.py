import psycopg2


def get_info(where, hat, idid=None):
    try:
        conn = psycopg2.connect(dbname="dtp_ploti_mentu",
                                user="postgres",
                                password="aza_967.",
                                host="localhost",
                                port="5432")
        cur = conn.cursor()
        which = " ".join(hat)
        addition = ""
        if idid is None:
            addition = f" WHERE id = {idid}"
        cur.execute(f"SELECT {which} FROM {where}{addition}")
        rows = cur.fetchall()
        response = dict()
        for row in rows:
            for i in range(len(hat)):
                response[hat[i]] = row[i]
        return response
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": error}
    finally:
        cur.close()
        conn.close()
