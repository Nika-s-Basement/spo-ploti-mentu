import psycopg2

from conn import connection


async def check_login_ment(email, password):
    curr = None
    conn = None
    try:
        conn = psycopg2.connect(**connection)
        curr = conn.cursor()
        curr.execute('''SELECT email, rank, dep_id, fio FROM main_ments 
        WHERE email = %s and password = %s''', (email, password))
        rows = curr.fetchone()
        if rows is None:
            curr.execute('''SELECT email, rank, dep_id, fio FROM lil_ment 
            WHERE email = %s and password = %s''', (email, password))
            rows = curr.fetchone()
            if rows is None:
                return False
            ret_data = [{"email": rows[0], "rank": rows[1], "dep_id": rows[2]}, rows[3]]
            return ret_data
        ret_data = [{"email": rows[0], "rank": rows[1], "dep_id": rows[2]}, rows[3]]
        return ret_data
    except (Exception, psycopg2.DatabaseError) as error:
        return f'Error: {error}'
    finally:
        curr.close()
        conn.close()

