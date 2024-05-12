import psycopg2
from models.registerModel import lil_form


async def add_ment(form: lil_form):
    try:
        conn = psycopg2.connect(dbname="dtp_ploti_mentu",
                                user="postgres",
                                password="aza_967.",
                                host="localhost",
                                port="5432")
        cur = conn.cursor()
        data = [form.id, form.fio, form.rank, form.experience, form.age,
                form.dep_id, form.boss, form.email, form.password]
        cur.execute('''INSERT INTO lil_ment (id, fio, rank, experience, age, dep_id, boss, email, password)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)''', data)
        conn.commit()
        return {"message": "Successfully added ment"}
    except (Exception, psycopg2.DatabaseError) as error:
        return {"message": {error}}
    finally:
        cur.close()
        conn.close()
