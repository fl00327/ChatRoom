import mysql.connector
import mysql.connector.errors

dbconn = mysql.connector.connect(
  host="localhost",
  user="root",
  password="chatroom@123",
  database="chatrooms"
)

cursorconn =  dbconn.cursor()

def login(username, password):
    try:
      cursorconn.execute("""SELECT * FROM users WHERE email=%s and password = %s """, (username,password))
      result = cursorconn.fetchall()
      first_name = result[0][3]
      last_name = result[0][4]
      return first_name, last_name
    except IndexError:
      return 400, 'Invalid Login'
    except mysql.connector.Error as err:
      return 400, err.msg


def register(email, firstName, lastName, password):
    try:
      cursorconn.execute("""SELECT MAX(user_id) FROM users """)
      result = cursorconn.fetchall()
      curmax = int(result[0][0])
      query = """INSERT INTO users (user_id, active, email, first_name, last_name, password) VALUES (%s, %s, %s, %s, %s, %s )"""
      record = (curmax+1, 1, email, firstName, lastName, password)
      cursorconn.execute(query, record)
      dbconn.commit()

      if cursorconn.rowcount > 0 :
        return 200, 'Success'
    except mysql.connector.Error as err:
      return 400, err.msg