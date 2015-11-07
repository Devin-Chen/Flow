import os
from flask import Flask, render_template, request, redirect
import pymongo
from pymongo import MongoClient

MONGO_URL = os.environ.get('MONGOLAB_URL')
client = MongoClient(MONGO_URL)

#specify database
db = client.heroku_vl24pmq2
collection = db.flows

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    flows = collection.find()
    return render_template('index.html', flows=flows)

@app.route("/post", methods=['POST'])
def post():
    flow = {"name":request.form['name'], "message":request.form['message']}
    flow_id = collection.insert(flow)
    return redirect('/')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port = port)