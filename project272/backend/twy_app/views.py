# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from twython import Twython,TwythonError

from django.shortcuts import render

# Create your views here.
from rest_framework import generics



class ListTodo(generics.ListCreateAPIView):
    jList= []
    APP_KEY = 'WnUaOLVCM1jsKqJdMoVbW6VjC'
    APP_SECRET = 'jLSrda1SoS9yaS2G8QBTjmA3nERxhxFEYaXWIwrqKAfuE0w6qO'
    OAUTH_TOKEN = '956698844267335680-wB3tLAOxJYanZUa5YbsBIo318OaFMRP'
    OAUTH_TOKEN_SECRET = 'W6GbC0ABA9OWfjnCjbVJbJyUWWqwgCgn8d2rtaX3k3eP6'
    twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
    try:
        search_results = twitter.search(q='#python', count=10)
    except TwythonError as e:
        print(e)
    for tweet in search_results['statuses']:
        jList.append({"user":tweet['user']['screen_name'].encode('utf-8'),
            "createdat": tweet['created_at'],
            "text": tweet['text'].encode('utf-8')})
    jList = str(jList)
