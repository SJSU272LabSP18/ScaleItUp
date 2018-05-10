
# Project Team 19 – Scaleit Up App

## Student Names:
Manikant Prasad,
Megha Nair,
Vidhya VijayaKumar,
Aditya Chouhan

#### Project Name: Social promotion of your business

Build a wrapper service using Twython API https://github.com/ryanmcgrath/twython to automatically handle tweets, search and retweets etc.. This service will read latest marketing images(with some texts) from a repository, could be google image store or box or something. service will also read latest blurbs (text with links) from a NOSQL database (mongoDB)  or something.

Persona/Use cases:

1. Employee:

The app interface provides people in an organization to subscribe. You could give them a twitter oauth button, with write permissions. They would be redirected to twitter an see a message "Allow Social Promotion App to tweet from your account?" that they could accept or deny.

2. Marketing team:

uses app interface to  easily upload the tweet blurbs and images they create on daily basis.


## Technologies Used:
* UI Front-end – React JS ,Material UI
* Storage - MongoDB
* Image Storage - Firebase
* Back-end – Flask/ Python
* Twython API to connect to Twitter

## Design Flow for Use cases:

# Sunil Admin User:

<img src ="https://raw.githubusercontent.com/SJSU272LabSP18/Project-Team-19/master/Project%20Documentation/Design%20Flow-%20Marketing%20Team.jpeg">

Scaleit Up App gives Sunil, Marketing Administrator team full access to Mongo Database with a user experience User Interface to change blurbs and images/blurbs. It also has a dashboard which gives the the idea of the no of data in databases when the user login to the Homepage.

# John Employee:

<img src ="https://raw.githubusercontent.com/SJSU272LabSP18/Project-Team-19/master/Project%20Documentation/Design%20Flow%20-Employee%20.jpg">

John ,an employee in the same company can login via his twitter account and tweet directly in twitter. He can directly use the marketing team blurbs or can tweak it to tweet in his twitter account. He can also search and retweets, images and blurbs. The dashboard gives him the no of tweets, re-tweets and images tweet he has done till date once he lands in the home page.

## Design Architecture:

# Scaleit.up prototype

Scaleit.up is a seamless way to tweet to twitter using just your Twitter Account. The functionalities are as follows:
> It consists of various modules such as Tweets, Filter Tweets, Image Tweets, Search and Re-tweets after an employee sign in with his Twitter Account. 

> It gives power to marketing team to add , update and delete any tweets or image tweets. Think of a scenario where a company wants to do their promotion campaign through their employees. Company can have employee from 1000 to 100000. It gives power to the company to utilize their force to promote their product.

We have used React JS and Material UI to design user interface. We have integrated our server flask/python via Rest API. Flask/Python server interacts with MongoDB database and updates, pull and delete data from the database. Flask/Python also pushes new tweets, image tweets, search tweets and re-tweets using Twython API.

## Challenges Faced:

* Understanding and using Twython API
* Integrating and calling Twitter API
* Image storage with Firebase. ( We started off with Google drive API and then changed our Image storage to Firebase)
* Bringing team understanding together
* Oauth Authentication with Twitter

## Folders Description:

* Project Documentation – All the Design diagrams , Presentation and Test documents are available here.
* Social Promotion App – All the codes are present in this folder. More details can be found out in README section of this folder.
* Social Promotion of your Business_T19.pdf – This file was submitted as part of initial design documents.

### Demo Link on Youtube
* <a href="https://youtu.be/Z7XPn7tGI18" target="_blank">Click Here to Watch</a>
