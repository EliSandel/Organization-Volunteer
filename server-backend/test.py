import mysql.connector
import datetime
import os
from dotenv import load_dotenv

load_dotenv()


#all this was for creating a new database
# db = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     passwd=os.getenv('PASSWD'),
#     auth_plugin='mysql_native_password'
# )

# mycursor = db.cursor()
# mycursor.execute("CREATE DATABASE fullstack1")


#configuration for my db
db_config = {
    "host": "localhost",
    "user": "root",
    "passwd": os.getenv('PASSWD'),
    "auth_plugin": 'mysql_native_password',
    "database": 'fullstack1'
}



db = mysql.connector.connect(**db_config)
mycursor = db.cursor()

# mycursor.execute("CREATE TABLE Articles (id int PRIMARY KEY AUTO_INCREMENT, title VARCHAR(50) NOT NULL, body TEXT NOT NULL, date datetime not null)")

mycursor.execute("SELECT * FROM Articles")
for x in mycursor:
    print(x)

# mycursor.execute("DELETE FROM Articles")

# db.commit()
db.close()




##go