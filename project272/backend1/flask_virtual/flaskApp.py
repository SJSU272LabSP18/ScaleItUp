from flask import Flask, request, json, redirect, url_for
from twython import Twython, TwythonError
from flask.json import jsonify
import sys
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from flask import Response
from flask_pymongo import PyMongo
from pymongo import MongoClient
from datetime import datetime
#from flask_mongoalchemy import MongoAlchemy
from flask_dance.contrib.twitter import make_twitter_blueprint, twitter
from flask_login import UserMixin, current_user, LoginManager, login_required, login_user, logout_user
from flask_dance.consumer import oauth_authorized
#from login import MongoAlchemyBackend
import json
import io
from PIL import Image
try:
    from io import StringIO
except ImportError:
    # Python 2
    from StringIO import StringIO
import requests
from io import BytesIO
from aiohttp import web
import urllib.parse

app = Flask("Backend_API")
app.config['SECRET_KEY'] = 'reyte@$24567788990753222'
cors = CORS(app)
app.config['MONGOALCHEMY_DATABASE'] = 'cmpe272'
app.config['MONGOALCHEMY_SERVER'] = 'ds233769.mlab.com'
app.config['MONGOALCHEMY_PORT'] = '33769'
app.config['MONGOALCHEMY_USER'] = 'cmpe272'
app.config['MONGOALCHEMY_PASSWORD'] = 'cmpe272'
app.config['MONGOALCHEMY_SERVER_AUTH'] = False
#db = MongoAlchemy(app)
client = MongoClient(
    'mongodb://cmpe272:cmpe272@ds233769.mlab.com:33769/cmpe272')
db = client.cmpe272

APP_KEY = 'WnUaOLVCM1jsKqJdMoVbW6VjC'
APP_SECRET = 'jLSrda1SoS9yaS2G8QBTjmA3nERxhxFEYaXWIwrqKAfuE0w6qO'
OAUTH_TOKEN = '956698844267335680-wB3tLAOxJYanZUa5YbsBIo318OaFMRP'
OAUTH_TOKEN_SECRET = 'W6GbC0ABA9OWfjnCjbVJbJyUWWqwgCgn8d2rtaX3k3eP6'
"""class User(db.Document):
    id = db.IntField()
    username = db.StringField()

class OAuth(db.Document):
    user_id = db.IntField()
    provider = db.StringField()
    token= db.StringField()
    created_at = db.StringField()
twitter_blueprint = make_twitter_blueprint(api_key='WnUaOLVCM1jsKqJdMoVbW6VjC', api_secret='jLSrda1SoS9yaS2G8QBTjmA3nERxhxFEYaXWIwrqKAfuE0w6qO')
app.register_blueprint(twitter_blueprint, url_prefix='/twitter_login')
login_manager = LoginManager(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
twitter_blueprint.backend = MongoAlchemyBackend(OAuth, db.session, user=current_user)
@app.route('/twitter')
def twitter_login():
    #if not twitter.authorized:
    return redirect(url_for('twitter.login'))
    account_info = twitter.get('account/settings.json')
    if account_info.ok:
        account_info_json = account_info.json()
            
    return '<h1>Your Twitter name is @{}'.format(account_info_json['screen_name'])

@oauth_authorized.connect_via(twitter_blueprint)
def twitter_logged_in(blueprint, token):
    account_info = blueprint.session.get('account/settings.json')

    if account_info.ok:
        account_info_json = account_info.json()
        username = account_info_json['screen_name']
        #user = db.user_twitter.find({"_id" :"$username"}) 
        user = User.query.filter(username==username).first()
        if not user:
            #db.user_twitter.insert({"_id" :"{$username}",'oauth': '$'})
            user = User(username = username)
            db.session.add(user)
            user.save() 
            db.session.commit()
        login_user(username)

@app.route('/')
@login_required
def index():
    return '<h1>You are logged in as {}</h1>'.format(current_user.username)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))"""


@app.route('/insert')
def insert_data():

    db.tweet.insert({'tweet': 'This is my first tweet', 'done': 'N'})
    db.tweet.insert({'tweet': 'This is my second tweet', 'done': 'N'})
    db.tweet.insert({'tweet': 'This is my third tweet', 'done': 'N'})
    db.tweet.insert({'tweet': 'This is my fourth tweet', 'done': 'N'})
    return 'Added Tweets'


@app.route('/get')
def get_data():

    data = db.tweet.find()
    dList = list()
    #dList = dict([(k.encode('ascii','ignore'), v.encode('ascii','ignore')) for k, v in data])
    for i, d in enumerate(data):
        dList.append({"_id": i+1, "tweet": d["tweet"]})
    #dList =str(dList)
    return json.dumps(dList)


@app.route('/tweet', methods=['POST'])
def tweet():
    twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
    msg = "Tweeted Successfully"
    try:
        twitter.update_status(status=request.json["tweet"])

        #     search_results = twitter.search(q='#python', count=50)
    except TwythonError as e:
        return json.dumps({"msg": "", "err": str(e)})
    return json.dumps({"msg": msg, "err": ""})


@app.route('/search')
def search():
    jList = []
    twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
    param1 = request.args.get('q')
    param2 = urllib.parse.unquote(param1)
    try:
        search_results = twitter.search(q=str(param2), count=10)
    except IOError as e:
        print(e)
    for tweet in search_results['statuses']:
        jList.append({"id": tweet['id'] ,
                      "avatar": tweet['user']["profile_image_url"], 
                      "author": tweet['user']['name'],    
                      "user": tweet['user']['screen_name'],
                      "createdat": tweet['created_at'],
                      "text": tweet['text']})
    #jList=str(jList)
    return json.dumps(jList)

@app.route('/image/upload')
def uploadImage():
    db.image.insert({'tweet': 'This is my first image tweet', 'image': 'https://drive.google.com/uc?id=1Kby3U8Dyypkch3btuOUBmE5KtWcnYqPk','createdat':datetime.now()})
    db.image.insert({'tweet': 'This is my second image tweet', 'image': 'https://drive.google.com/uc?id=11fSFsHlZfcva1tBNU-hAgXTOhFm05MZA','createdat':datetime.now()})
    db.image.insert({'tweet': 'This is my third image tweet', 'image': 'https://drive.google.com/uc?id=1xRoU-q4v48z9GlsrmsHIOkU59kHSkZ7e','createdat':datetime.now()})
    db.image.insert({'tweet': 'This is my fourth image tweet','image': 'https://drive.google.com/uc?id=1QsCLwHjTwhg6hwB2WeKO4-9WYrcuUBAQ','createdat':datetime.now()})
    return json.dumps("sucess")

@app.route('/image/get')
def getImage():
    data = db.image.find()
    dImage = list()
    for i,d in enumerate(data):
        dImage.append({'id':i+1, 'tweet': d['tweet'], 'image': d['image']})
    return json.dumps(dImage)

@app.route('/image/tweet',methods=['POST'])
def tweetImage():
    response = requests.get(request.json['image'])
    photo = Image.open(BytesIO(response.content))
    basewidth = 320
    wpercent = (basewidth / float(photo.size[0]))
    height = int((float(photo.size[1]) * float(wpercent)))
    photo = photo.resize((basewidth, height), Image.ANTIALIAS)
    msg = "Tweeted Successfully"
    twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
    image_io = io.BytesIO()  #StringIO()
    photo.save(image_io, format='JPEG')
    image_io.seek(0)
    try:
        response = twitter.upload_media(media=image_io)
        twitter.update_status(status=request.json["tweet"],media_ids=[response['media_id']])
    except TwythonError as e:
        return json.dumps({"msg": "", "err": str(e)})
    return json.dumps({"msg": msg, "err": ""})

@app.route('/retweet')
def retweet():
    twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
    #ReTweeting by ID of the Tweet
    try:
        twitter.retweet(id = "985108650409775106",status='Python fan')
    except TwythonError as e:
        return json.dumps(e)
    return json.dumps("Retweeted Sucessfully")
if __name__ == "__main__":
    app.run()
