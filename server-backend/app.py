from flask import Flask, jsonify, make_response, request
import mysql.connector
import os
from dotenv import load_dotenv
import datetime
from flask_cors import CORS #this is so that i can make request from my react

load_dotenv()


app = Flask(__name__)
CORS(app)


#configuration for my db
db_config = {
    "host": "localhost",
    "user": "root",
    "passwd": os.getenv('PASSWD'),
    "auth_plugin": 'mysql_native_password',
    "database": 'fullstack1'
}

#example code to connect to database
# db = mysql.connector.connect(**db_config)
# mycursor = db.cursor()
# insert code here
# db.commit()
# db.close()

    

#this is for getting all the articles
@app.route('/get', methods=['GET'])
def get_articles():
    db = mysql.connector.connect(**db_config)
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM Articles")
    all_articles = mycursor.fetchall()
    db.close()
    
    # convert the list of lists to json
    articles_list = []
    for article in all_articles:
        articles_list.append({
            "id": article[0],
            "title": article[1],
            "body": article[2],
            "date": article[3]
        })
        
    return jsonify(articles_list)


#this is for getting an article according to id
@app.route('/get/<id>', methods = ['GET'])
def get_specific_article(id):
    
    db = mysql.connector.connect(**db_config)
    mycursor = db.cursor()
    
    #extracting the specific article
    mycursor.execute("SELECT * FROM Articles WHERE id = %s", (id,))
    article = mycursor.fetchone()
    
    db.close()
    
    return jsonify(article)


#this is for posting an article
@app.route('/add', methods = ['POST'])
def add_article():
    title = request.json['title']
    body = request.json['body']
    print(request.cookies)
    
    db = mysql.connector.connect(**db_config)
    mycursor = db.cursor()
    mycursor.execute("INSERT INTO Articles (title, body, date) VALUES (%s,%s,%s)", (title, body, datetime.datetime.now()))
    db.commit()
    
    article_id = mycursor.lastrowid
    mycursor.execute("SELECT * FROM Articles WHERE id = %s", (article_id,))
    inserted_article = mycursor.fetchone()
    
    db.close()
    
    print(f"Inserted Article: {inserted_article}")
    article = {
        "id": inserted_article[0],
        "title": inserted_article[1],
        "body": inserted_article[2],
        "date": inserted_article[3]
    }
    print(article)
    
    return jsonify(article)



@app.route('/register', methods=["POST"])
def register():
    username = request.json["username"]
    password = request.json["password"]
    # Save to DB
    resp = make_response()
    resp.set_cookie("username", username)
    resp.set_cookie("password", password)
    
    

#for updating an article
@app.route('/update/<id>', methods = ['PUT'])
def update(id): 
    request.cookies.get('username')
    request.cookies.get('password')
    title = request.json['title']
    body = request.json['body']
    
    db = mysql.connector.connect(**db_config)
    mycursor = db.cursor()
    
    mycursor.execute("UPDATE Articles SET title = %s, body = %s, date = %s  WHERE id = %s", (title, body, datetime.datetime.now(), id))
    db.commit()
    
    mycursor.execute("SELECT * FROM Articles WHERE id = %s", (id,))
    inserted_article = mycursor.fetchone()
    db.close()
    
    article_dict = {
        "id": inserted_article[0],
        "title": inserted_article[1],
        "body": inserted_article[2],
        "date": inserted_article[3]  # Adjust as needed
    }
    
    return jsonify(article_dict)
    # return jsonify(inserted_article)


#for deleting an article
@app.route('/delete/<id>', methods = ['DELETE'])
def delete(id):
    db = mysql.connector.connect(**db_config)
    mycursor = db.cursor()
    
    #i save the article before i delete it
    mycursor.execute("SELECT * FROM Articles WHERE id = %s", (id, ))
    article = mycursor.fetchone()
    
    #delete the article
    mycursor.execute("DELETE FROM Articles WHERE id = %s", (id,))
    
    db.commit()
    db.close()
    
    article_dict = {
    "id": article[0],
    "title": article[1],
    "body": article[2],
    "date": article[3]  # Adjust as needed
    }
    
    return jsonify(article_dict)



if __name__ == "__main__":
    app.run(debug=True)