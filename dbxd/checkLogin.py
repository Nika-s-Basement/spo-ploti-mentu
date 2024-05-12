import psycopg2
from psycopg2 import Error


async def check_login_ment(email, password):
    try:
        conn = psycopg2.connect(dbname="dtp_ploti_mentu",
                                user="postgres",
                                password="aza_967.",
                                host="localhost",
                                port="5432")
        curr = conn.cursor()
        curr.execute('''SELECT email, rank, dep_id, fio FROM main_ments 
        WHERE email = %s and password = %s''', (email, password))
        data = curr.fetchone()
        if data is None:
            curr.execute('''SELECT email, rank, dep_idm, fio FROM lil_ment 
            WHERE email = %s and password = %s''', (email, password))
            data = curr.fetchone()
            return data
        ret_data = [{"email": data[0], "rank": data[1], "dep_id": data[2]}, data[3]]
        return ret_data
    except (Exception, psycopg2.DatabaseError) as error:
        return f'Error: {error}'
    finally:
        curr.close()
        conn.close()
