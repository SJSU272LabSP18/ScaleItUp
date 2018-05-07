from flask import Flask, request, json, redirect, url_for,session
from twython import Twython, TwythonError
from flask.json import jsonify
import sys
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from flask import Response
from flask_pymongo import PyMongo
from pymongo import MongoClient
from datetime import datetime
import requests
from requests.auth import HTTPBasicAuth
from requests_oauthlib import OAuth1, OAuth2
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
from bson import ObjectId   
from bson import json_util

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
err_msg = "Invalid Login Session! Please login again"
msg = "Tweeted Successfully"
info = []

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

@app.route('/login')
def login():
    twitter = Twython(APP_KEY, APP_SECRET)
    auth = twitter.get_authentication_tokens(callback_url='http://localhost:5000/callback',screen_name='')
    session['oauth_token'] = auth['oauth_token']
    session['oauth_token_secret'] = auth['oauth_token_secret']
    return redirect(auth['auth_url'])

@app.route('/callback')
def callback():
    is_denied = request.values.get('denied')
    if is_denied:
        return redirect('http://localhost:3000/signin'+'?error=Login Failed')
    oauth_verifier = request.values.get('oauth_verifier')
    if not oauth_verifier:
        return redirect('http://localhost:3000/signin'+'?error=Login Failed')

    twitter = Twython(APP_KEY, APP_SECRET,
                      session['oauth_token'], session['oauth_token_secret'])

    final_step = twitter.get_authorized_tokens(oauth_verifier)

    # store these permanently in database
    OAUTH_TOKEN = final_step['oauth_token']
    OAUTH_TOKEN_SECRET = final_step['oauth_token_secret']

    # get user credential
    twitter = Twython(APP_KEY, APP_SECRET,
                       OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
    userDetail = twitter.verify_credentials()
    userid = userDetail['id_str']
    username= userDetail['screen_name']
    name = userDetail['name']
    result= db.twitter_user.find({userid : userid})
    if result:
        db.twitter_user.update_one({'userid':userid},{'$set':{'username':username,'name':name,'lastlogin':datetime.now(),'oauth_token':OAUTH_TOKEN,'oauth_secret':OAUTH_TOKEN_SECRET}},upsert=True)
    else:
        db.twitter_user.insert({'userid':userid,'username':username,'name':name,'lastlogin':datetime.now(),'oauth_token':OAUTH_TOKEN,'oauth_secret':OAUTH_TOKEN_SECRET})
    return redirect('http://localhost:3000/dashboard?'+'username='+username+'&name='+name)

@app.route('/logout',methods=['DELETE'])
def logout():
    userid = request.json['username']
    db.twitter_user.delete_one({'username':userid})
    return json.dumps({'msg':'success'})

@app.route('/insert',methods=['POST'])
def insert_data():
    tweet_data = request.json['tweet']
    db.tweet.insert({'tweet': tweet_data, 'createdat':datetime.now()})
    return json.dumps({'msg':'success'})

@app.route('/update',methods=['POST'])
def update_data():
    tweet_data = request.json['tweet']
    _id = request.json['_id']
    _id1 = json.loads(_id, object_hook=json_util.object_hook)
    db.tweet.update({'_id':_id1},{'tweet': tweet_data, 'modifiedat':datetime.now()})
    return json.dumps({'msg':'success'})
	
@app.route('/login_aditya', methods=['POST'])
def loginApp():
	data = db.users.find({"username": request.json["username"]})
	#print (data[0]["password"])
	#print(request.json["password"])
	for x in data :
		#print(x["password"])
		if x["password"]==request.json["password"] :
			#print("true")
			return json.dumps({"authenticate": "true"})
	return json.dumps({"authenticate": "false"})

@app.route('/dash', methods=['GET'])
def dash():
	tweet_count = db.tweet.count()
	print (tweet_count)
	blurb_count = db.image.count()
	print (blurb_count)
	#print(request.json["password"])
	arr = list()
	arr.append(["Tweets",tweet_count])
	arr.append(["Blurbs",blurb_count])
	print (arr)
	return json.dumps({"columns": arr,"type": "bar"})

@app.route('/get')
def get_data():

    data = db.tweet.find()
    dList = list()
    #dList = dict([(k.encode('ascii','ignore'), v.encode('ascii','ignore')) for k, v in data])
    for i, d in enumerate(data):
        _id = json.dumps(d['_id'], default=json_util.default)
        dList.append({"_id": _id,"id": i+1, "tweet": d["tweet"]})
    #dList =str(dList)
    return json.dumps(dList)


@app.route('/tweet', methods=['POST'])
def tweet():
    username = request.json['username']
    tweet = request.json['tweet']
    userDB = db.twitter_user.find({'username':username})   
    if userDB.count()>0:
        data = list()
        for i,d in enumerate(userDB):
            data.append(d['oauth_token'])
            data.append(d['oauth_secret'])
        twitter = Twython(APP_KEY, APP_SECRET, data[0],data[1])
        try:
            twitter.update_status(status=tweet)
        except TwythonError as e:
            return json.dumps({"msg": "", "err": str(e)})
        db.user_tweets.insert({'username':username,'tweet':tweet,'createdat':datetime.now()})
        return json.dumps({"msg": msg, "err": ""})
    else:
        return json.dumps({"msg": "", "err": err_msg })


@app.route('/search')
def search():
    jList = []
    param1 = request.args.get('q')
    user = request.args.get('name')
    param2 = urllib.parse.unquote(param1)
    query = str(param2)+' -filter:retweets AND -filter:replies'
    userDB = db.twitter_user.find({'username':user})   
    if userDB.count()>0:
        data = list()
        for i,d in enumerate(userDB):
            data.append(d['oauth_token'])
            data.append(d['oauth_secret'])
        twitter = Twython(APP_KEY, APP_SECRET, data[0],data[1])
        i = 1
        try:
            search_results = twitter.search(q=query, count=10)
        except IOError as e:
            return json.dumps({"msg": "", "err": str(e)})
        for tweet in search_results['statuses']:
            jList.append({"id":i ,
                      "id_tweet": tweet['id'] ,
                      "avatar": tweet['user']["profile_image_url"], 
                      "author": tweet['user']['name'],    
                      "user": tweet['user']['screen_name'],
                      "createdat": tweet['created_at'],
                      "text": tweet['text'],
                      'status':tweet['retweeted']})
            i = i+1
        return json.dumps(jList)
    else:
        return json.dumps({"msg": "", "err": err_msg })

@app.route('/image/upload')
def uploadImage():
    db.image.insert({'tweet': 'This is my first image tweet', 'image': 'https://drive.google.com/uc?id=1Kby3U8Dyypkch3btuOUBmE5KtWcnYqPk','createdat':datetime.now()})
    db.image.insert({'tweet': 'This is my second image tweet', 'image': 'https://drive.google.com/uc?id=11fSFsHlZfcva1tBNU-hAgXTOhFm05MZA','createdat':datetime.now()})
    db.image.insert({'tweet': 'This is my third image tweet', 'image': 'https://drive.google.com/uc?id=1xRoU-q4v48z9GlsrmsHIOkU59kHSkZ7e','createdat':datetime.now()})
    db.image.insert({'tweet': 'This is my fourth image tweet','image': 'https://drive.google.com/uc?id=1QsCLwHjTwhg6hwB2WeKO4-9WYrcuUBAQ','createdat':datetime.now()})
    return json.dumps({'msg':"success"})

@app.route('/delete/tweet',methods=['DELETE'])
def deleteTweet():
    _id = request.json['data']
    _id1 = json.loads(_id, object_hook=json_util.object_hook)
    #return json.dumps(_id1)
    db.tweet.delete_one({'_id':_id1})
    return json.dumps({'msg': 'success'})

@app.route('/image/get')
def getImage():
    data = db.image.find()
    dImage = list()
    for i,d in enumerate(data):
        dImage.append({'id':i+1, 'tweet': d['tweet'], 'image': d['image']})
    return json.dumps(dImage)

@app.route('/image/tweet',methods=['POST'])
def tweetImage():
    username = request.json['username']
    tweet = request.json['tweet']
    image = request.json['image']
    userDB = db.twitter_user.find({'username':username})   
    if userDB.count()>0:
        data = list()
        for i,d in enumerate(userDB):
            data.append(d['oauth_token'])
            data.append(d['oauth_secret'])
        twitter = Twython(APP_KEY, APP_SECRET, data[0],data[1])
        response = requests.get(request.json['image'])
        photo = Image.open(BytesIO(response.content))
        basewidth = 320
        wpercent = (basewidth / float(photo.size[0]))
        height = int((float(photo.size[1]) * float(wpercent)))
        photo = photo.resize((basewidth, height), Image.ANTIALIAS)
        #msg = "Tweeted Successfully"
        #twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
        image_io = io.BytesIO()
        photo.save(image_io, format='JPEG')
        image_io.seek(0)
        try:
            response = twitter.upload_media(media=image_io)
            twitter.update_status(status=tweet,media_ids=[response['media_id']])
        except TwythonError as e:
            return json.dumps({"msg": "", "err": str(e)})
        db.user_images.insert({'username':username,'tweet':tweet,'image':image,'createdat':datetime.now()})
        return json.dumps({"msg": msg, "err": ""})
    else:
        return json.dumps({"msg": "", "err": err_msg })

@app.route('/retweet',methods=['POST'])
def retweet():
    username = request.json['username']
    myuser = request.json['myuser']
    tweet = request.json['text']
    id1 = request.json['id']
    avatar=request.json['avatar']
    name= request.json['name']
    userDB = db.twitter_user.find({'username':myuser})   
    if userDB.count()>0:
        data = list()
        for i,d in enumerate(userDB):
            data.append(d['oauth_token'])
            data.append(d['oauth_secret'])
        twitter = Twython(APP_KEY, APP_SECRET, data[0],data[1])
        #ReTweeting by ID of the Tweet
        try:
            #twitter.update_status(status="CheckOut this cool tweet!!")
            twitter.retweet(id = str(id1))
        except TwythonError as e:
            return json.dumps({"msg": "", "err": str(e)})
        db.user_retweets.insert({"id": id1 ,
                      "myuser": myuser,
                      "avatar": avatar, 
                      "name": name,    
                      "username": username,
                      "text": tweet,
                      'retweetedat': datetime.now()})
        return json.dumps({"msg": "Retweeted Successfully", "err": ""})
    else:
        return json.dumps({"msg": "", "err": err_msg })
if __name__ == "__main__":
    app.run()
