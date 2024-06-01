import psycopg2
from conn import connection


async def get_user_profile(license: int):
    conn = None
    cur = None
    try:
        conn = psycopg2.connect(**connection)
        cur = conn.cursor()
        cur.execute('''SELECT fio, license, card, email, array_agg(car.car_num), array_agg(car.insurance), array_agg(car.pts)
         FROM car
        JOIN users ON car.id_user = users.license
        WHERE license = %s
        GROUP BY license, email, card, fio''', (license,))
        data = cur.fetchall()
        answer = {"fio": data[0][0],
                  "license": data[0][1],
                  "card": data[0][2],
                  "email": data[0][3],
                  "cars": [{"car_num": data[0][4][i], "insurance": data[0][5][i], "pts": data[0][6][i]}
                           for i in range(len(data[0][4]))]}
        return answer
    except (Exception, psycopg2.DatabaseError) as error:
        return {"error": error}
    finally:
        cur.close()
        conn.close()
