from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import cv2
from flask.helpers import make_response
from flask_cors.core import CONFIG_OPTIONS
from matplotlib import image
import matplotlib.pyplot as plt
from os import mkdir, wait
import re
import time
import flask
from flask import request
from flask import abort
from flask_cors import CORS
import requests
import json
import numpy as np
from PIL import Image
import io
import base64
from flask import send_file
import os
import uuid
import urllib.request


import psycopg2
import logging
from configparser import ConfigParser

from werkzeug.datastructures import ImmutableMultiDictMixin
logging.basicConfig(level=logging.DEBUG)
app = flask.Flask(__name__)
CORS(app)

GAN_BACKEND_URL = 'http://URL:port'

def config(filename='database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db

def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
		
        # create a cursor
        cur = conn.cursor()
        
	# execute a statement
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')

        # display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)
       
	# close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

def query(statement):
    """ Connect to the PostgreSQL database server """
    conn = None
    result = {"success" : False, "data" : None}
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
		
        # create a cursor
        cur = conn.cursor()
        
	# execute a statement
        print("executing...\n  >{0}".format(statement))
        cur.execute(statement)

        # display the PostgreSQL database server version
        result["data"] = cur.fetchall()
        result["success"] = True
        print("answer:\n  >{0}".format(result))
       
	# close the communication with the PostgreSQL
        conn.commit() # Needed for inserts -> commits the transaction that automatically has been created
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print("SQL ERROR: %s" % error)
        result = {"success": False, "data": str(error)}
        # abort(500, description="Database Error. Request failed!")
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')
        
        return result

def insert(statement):
    """ Connect to the PostgreSQL database server """
    conn = None
    result = {"success" : False, "data" : None}
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
		
        # create a cursor
        cur = conn.cursor()
        
	# execute a statement
        print("executing...\n  >{0}".format(statement))
        cur.execute(statement)

        # display the PostgreSQL database server version
        
       
	# close the communication with the PostgreSQL
        conn.commit() # Needed for inserts -> commits the transaction that automatically has been created
        cur.close()
        result = {"success" : True}

    except (Exception, psycopg2.DatabaseError) as error:
        print("SQL ERROR: %s" % error)
        result = {"success": False, "data": str(error)}
        # abort(500, description="Database Error. Request failed!")
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')
        
        return result

def toJson(data):
    if data is not None:
        resp = flask.jsonify(data)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    else:
        abort(404, description="Nothing found!")

@app.route("/products", methods=["GET"])
def getAllProducts():
    all = query("SELECT p.id, p.manufacturer, p.name, p.price, p.\"desc\", p.category, p.date, p.season, pi.img_path FROM product p INNER JOIN product_images pi on p.id = pi.product_id")["data"]
    return toJson(all)

@app.route("/users", methods=["GET"])
def getAllUsers():
    all = query("SELECT * from \"user\"").data
    return toJson(all)

@app.route("/register", methods=["POST"])
def register():
    if flask.request.method == "POST":
        if (
            flask.request.args.get("email") and 
            flask.request.args.get("password") and
            flask.request.args.get("first_name") and
            flask.request.args.get("last_name") and
            flask.request.args.get("birthday") and
            flask.request.args.get("commercial")
            ):
            
            valid = query("\
                Insert into \"user\"values("+
                    flask.request.args.get("email") +       "," +
                    flask.request.args.get("password") +    "," +
                    flask.request.args.get("first_name") +  "," +
                    flask.request.args.get("last_name") +   "," +
                    flask.request.args.get("birthday") +    "," +
                    flask.request.args.get("commercial") +  ")"
                )

            token = query("SELECT login('%s', '%s')" % (request.args.get("email"), request.args.get("password")))
            app.logger.info("token: %s" % token)

            data = {"success": token is not None, "token": token}

            return toJson(data)
    else:
        return toJson({"success" : False})

@app.route("/login", methods=["POST"])
def login():
    data = {"success" : False}
    # print(flask.request.headers)
    if flask.request.method == "POST":
        if flask.request.headers.get("email") and flask.request.headers.get("password"):

            mail = flask.request.headers.get("email")
            password = flask.request.headers.get("password")

            result = query("SELECT login('%s', '%s');" % (mail, password))
            app.logger.info("result: %s" % result)

            if (result["success"]):
                data = {"success": result["success"], "token": result["data"]}
            else:
                data = {"success": result["success"], "error": result["data"].split('\n')[0]}

    return toJson(data)

@app.route("/showProduct", methods=["POST"])
def showProduct():
    data = {"success" : False}
    # print(flask.request.headers)
    if flask.request.method == "POST":
        if flask.request.headers.get("productId"):

            productId = flask.request.headers.get("productId")

            product_image = query("SELECT * FROM product_images p WHERE p.product_id = %s" % productId)
            product = query("SELECT * FROM product p WHERE p.id = %d" % int(productId))
            app.logger.info("result: %s" % product_image)

            if (product_image["success"] is None or product["success"] is None):
                abort(404, description="Not found or Database problem...")
            

            data = {"success": product_image["success"], "product_image": product_image["data"], "product": product["data"][0]}

    return toJson(data)

@app.route("/users", methods=["POST"])
def tokenExists():
    all = query("SELECT * from \"user\"")
    return toJson(all)

@app.route("/productImage", methods=["POST"])
def predictID():

    if flask.request.method == "POST":
        if (flask.request.args.get("id")):
            print(flask.request.args.get("id"))
            productImage = query("SELECT * FROM product_images WHERE product_id = %d" % int(flask.request.args.get("id")))
            if productImage["success"]:
                return toJson(productImage["data"])
            else:
                abort(404, description="Not Found!")
    abort(404, description="Not Found!")

@app.route("/deleteUserImages", methods=["POST"])
def deleteUserImages():
    print(request.files)
    print(request.headers)

    if flask.request.method == "POST":
        if (flask.request.headers.get("token")):
            
            userID = getUserIDForToken(request.headers["token"])

            if (userID): 

                imagePathResult = query("SELECT image_path FROM user_images WHERE user_id='%s';" % userID)

                print(imagePathResult)

                if imagePathResult["success"]:
                    for img in imagePathResult["data"]:
                        print(img[0])
                        if os.path.exists("./uploads/%s" % img[0]):
                            os.remove("./uploads/%s" % img[0])
                        else:
                            logging.error("Trying to delte non-existing file.")

                deleteImageResult = insert("DELETE FROM user_images WHERE user_id='%s';" % userID)
                
                if (deleteImageResult["success"]):
                    return toJson({"success": True})

    return toJson({"success": False})

@app.route("/upload", methods=["POST"])
def upload():
    if flask.request.method == "POST":
        if (flask.request.files.get("file")):
            if (flask.request.headers.get("token")):
                

                imagePerson = flask.request.files.get("file").read()
                imgPerson = Image.open(io.BytesIO(imagePerson))
                imgPerson = imgPerson.convert("RGB")
                imgPerson = np.array(imgPerson) # Needed to get the right image format for CV2
                imgPerson = cv2.cvtColor(imgPerson, cv2.COLOR_BGR2RGB)

                userID = getUserIDForToken(request.headers["token"])

                if (userID): 
                # result = query("SELECT user_id FROM logintoken WHERE token='%s'" % request.headers["token"])

                # if (result["success"]):

                    if (not os.path.exists("./uploads")):
                        os.mkdir("uploads")

                    imageID = uuid.uuid4().hex
                    imageID = imageID+".jpg"

                    cv2.imwrite("uploads/%s" % imageID, imgPerson)

                    # userID = result["data"][0][0]
                    # print("userID: " + str(userID))

                    success = insert("INSERT INTO user_images(user_id, image_path) values('%s', '%s')" % (userID, imageID))

                return toJson({"success": True})
    return toJson({"success": False})
    
@app.route("/categories", methods=["POST"])
def getCategoriesForGender():
    if flask.request.method == "POST":
        if (flask.request.headers.get("sexen")):

            sexen = request.headers["sexen"]
            gender = ""

            if sexen == "women":
                gender = "f"
            elif (sexen == "men"):
                gender = "m"

 
            result = query("SELECT * FROM category WHERE sexen='%s' OR sexen='d'" % gender)

            if (result["success"]):

                index = len(result["data"])-1
                print(index)


                try:
                    while index >= 0:
                        categoryImage = query("SELECT img_path FROM product_images INNER JOIN product p on p.id = product_images.product_id WHERE category=%s LIMIT 1" % result["data"][index][0])
                        print(categoryImage["data"][0])
                        print(result["data"][index])
                        result["data"][index] = result["data"][index] + categoryImage["data"][0]
                        index-=1
                except IndexError:
                    print("Index Error")
                
                print(result["data"])
                
                return toJson({"success": True, "categories": result["data"]})
    return toJson({"message": "Failed..."})

@app.route("/getProductsFromCategory", methods=["POST"])
def getProductsFromCategory():
    if flask.request.method == "POST":
        if (flask.request.headers.get("categoryId")):

            categoryId = request.headers["categoryId"]
             
            result = query("SELECT p.id, p.manufacturer, p.name, p.price, p.\"desc\", p.category, p.date, p.season, pi.img_path FROM product p INNER JOIN product_images pi on p.id = pi.product_id WHERE category = %s" % categoryId)

            if (result["success"]):
                
                print(result["data"])
                
                return toJson({"success": True, "products": result["data"]})
    return toJson({"message": "Failed..."})

@app.route("/tryOnProduct", methods=["POST"])
def tryOnProduct():
    print(request.headers)
    if flask.request.method == "POST":
        if (flask.request.headers.get("token") and flask.request.headers.get("image_path")):
                        
            clothingImagePath = flask.request.headers.get("image_path")
            token = flask.request.headers.get("token")

            userID = getUserIDForToken(token)

            if (userID): 

                result = query("SELECT image_path FROM user_images WHERE user_id='%s' LIMIT 1" % userID)

                if (result["success"]): 

                    userImagePath = result["data"][0][0]
                    print(userImagePath)
                    print(clothingImagePath)

                    # Open images

                    parser = ConfigParser()
                    # read config file for image API url
                    parser.read("database.ini")

                    imageAPIUrl = ""
                    if parser.has_section("imageAPI"):
                        params = parser.items("imageAPI")
                        
                        imageAPIUrl = params[0][1]
                    else:
                        raise Exception('Section {0} not found in the {1} file'.format("imageAPI", "database.ini"))

                    urllib.request.urlretrieve(
                        imageAPIUrl+"/"+clothingImagePath,
                        "clothing_image.png"
                    )

                    clothingImage = Image.open("clothing_image.png")
                    personImage = Image.open("uploads/%s" % userImagePath)
                    
                    if (not os.path.exists("./tmp")):
                        mkdir("tmp")
                    
                    imageID = uuid.uuid4().hex

                    clothingImagePath = "tmp/%s_1.jpg" % imageID
                    PersonImagePath = "tmp/%s_0.jpg" % imageID

                    clothingImage.save(clothingImagePath)
                    personImage.save(PersonImagePath)
                    

                    addr = GAN_BACKEND_URL
                    test_url = addr + '/TryOn'

                    content_type = 'application/json'
                    headers = {'content-type': content_type}

                    # files = [("imagePerson", open('000129_0.jpg', 'rb')), ("imageClothing", open('000192_1.jpg', 'rb'))]
                    files = [("imagePerson", open(PersonImagePath, 'rb')), ("imageClothing", open(clothingImagePath, 'rb'))]

                    print("opened images")
                    try: 
                        r = requests.post(test_url, files=files)
                        
                        ganImage = Image.open(io.BytesIO(r.content))
                        ganImage = ganImage.convert("RGB")
                        ganImage = np.array(ganImage) # Needed to get the right image format for CV2
                        ganImage = cv2.cvtColor(ganImage, cv2.COLOR_BGR2RGB)

                        cv2.imwrite("output.jpg", ganImage)

                        # plt.imshow(ganImage)
                        # plt.show()

                        with open("output.jpg", "rb") as img_file:
                            return base64.b64encode(img_file.read()).decode('utf-8')

                        
                    except Exception as ex:
                        print(ex)
                        return toJson({"success" : False})
                    finally:
                        # Deleting temporarily stored files
                        if os.path.exists(clothingImagePath):
                            os.remove(clothingImagePath)
                        if os.path.exists(PersonImagePath):
                            os.remove(PersonImagePath)
                        logging.info("                  <<< SUCCESSFULLY removed personal images >>>")


    return toJson({"success" : False})

@app.route("/getUserImage", methods=["POST"])
def userImage():
    print(request.headers)
    if flask.request.method == "POST":
        if (flask.request.headers.get("token")):
                        
            token = flask.request.headers.get("token")

            userID = getUserIDForToken(token)

            if (userID): 

                result = query("SELECT image_path FROM user_images WHERE user_id='%s' LIMIT 1" % userID)

                if (result["success"] and len(result["data"]) > 0): 

                    userImagePath = result["data"][0][0]
                    print(userImagePath)

                    personImage = Image.open("uploads/%s" % userImagePath)

                    try: 
                        with open("uploads/%s" % userImagePath, "rb") as img_file:
                            return base64.b64encode(img_file.read()).decode('utf-8')
                        
                    except Exception as ex:
                        print(ex)
                        return toJson({"success" : False})
                    finally:
                        logging.info("                  <<< User Image Returned >>>")


    return toJson({"success" : False})

def getUserIDForToken(token):
    
    result = query("SELECT user_id FROM logintoken WHERE token='%s'" % token)

    if (result["success"]):
        userID = result["data"][0][0]

        return userID

    
    return None


if __name__ == "__main__":
    print(("* Flask server starting..."
        "please wait until server has fully started"))
    
    app.run(host="0.0.0.0", debug=True)
