import psycopg2
from psycopg2 import Error


async def checkLogin(email, password):
    try:
        conn = psycopg2.connect(dbname="dtp_ploti_mentu",
                                user="postgres",
                                password="aza_967.",
                                host="localhost",
                                port="5432")
        curr = conn.cursor()
        curr.execute('''SELECT * FROM main_ments 
        WHERE email = %s and password = %s''', (email, password))
        data = curr.fetchone()
        if data is None:
            curr.execute('''SELECT * FROM lil_ment 
            WHERE email = %s and password = %s''', (email, password))
            data = curr.fetchone()
            return data
        return data
    except (Exception, psycopg2.DatabaseError) as error:
        return f'Error: {error}'
    finally:
        curr.close()
        conn.close()


