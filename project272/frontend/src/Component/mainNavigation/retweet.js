import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Nav from "./mainnav";
import "./mainNav.css";
import { Glyphicon, Button } from 'react-bootstrap';
import Notifications, { notify } from 'react-notify-toast';

var config = require('./config');
class Retweet extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      results: [],
      message: [],
      isRetweet: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.getSearch = this.getSearch.bind(this);
    //this.postTweet = this.postTweet.bind(this)
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  getSearch(e) {
    e.preventDefault();
    var data = this.state.value
    if (data == '') {
      notify.show("Please enter some search criteria", "error", 5000, "#FF0000")
    } else {
      data = encodeURIComponent(data)
      //data = JSON.stringify(data);
      console.log(data)
      fetch(config.baseURL + '/search' + '?q=' + data+'&name='+localStorage.getItem('username'), {
        method: 'GET',
        mode: 'cors',
        dataType: 'json',
        headers: ({
          "Access-Control-Allow-Origin": "*",
          'Content-Type': "application/json"
        })
      })
        .then(r => r.json())
        //.then(r=> r.toArray())
        .then(r => {
          console.log(r)
          this.setState({
            results: r
          })
        })
        .catch(err => console.log(err))
    }
  }
  handleRetweet(el) {
    var username = localStorage.getItem('username')
    if (username != '') {
      var id = this.state.results[el-1]['id_tweet']
      var avatar = this.state.results[el-1]['avatar']
      var name = this.state.results[el-1]['author']
      var user= this.state.results[el-1]['user']
      var tweet = this.state.results[el-1]['text']
      var data = {"id": id ,"avatar": avatar, "name": name,"username": user,"text": tweet,'myuser':username}
      console.log(data)
      data = JSON.stringify(data);
      fetch(config.baseURL + '/retweet', {
        method: 'POST',
        mode: 'cors',
        body: data,
        dataType: 'json',
        headers: ({
          "Access-Control-Allow-Origin": "*",
          'Content-Type': "application/json"
        })
      })
        .then(r => r.json())
        .then(r => Array.from(Object.keys(r), k => r[k])
        )
        .then(r => {
          console.log(r)
          this.setState({
            message: r
          })
        })
        .catch(err => console.log(err))
        .then(r => {
          if (this.state.message[0] != "") {
            notify.show(this.state.message[0], "success", 5000, "#008000")
          } else if (this.state.message[1] != "") {
            notify.show(this.state.message[1], "error", 5000, "#FF0000")
          }
        })
    } else {
      notify.show('Invalid Session! Please reauthenticate your Twitter Account', 'error', 5000, "#008000")
    }
  }
  render() {

    let it = this.state.results.map((tweet) => {
      return (
        <div className="media text-muted pt-3">
          <img src={tweet.avatar} data-holder-rendered="true" />
          <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <a href={"http://www.twitter.com/" + tweet.user}>{tweet.author}</a>
            <strong className="d-block text-gray-dark">{tweet.user}
             : {tweet.createdat}
            </strong>
            <strong>
             {tweet.text}
            </strong> 
          </p>
          <div className='item-footer'>
         <button id={tweet.id} className="btn btn-info btn-md" onClick={() => this.handleRetweet(tweet.id)}>
                <span className="glyphicon glyphicon-retweet"></span> Retweet
               </button>
          </div>
        </div>

      )
    })
    return (
      <div className='container'>
      <Notifications />
        <Nav />
        <div className="text-center">
          <form onSubmit={this.getSearch}>
            <h1 text-align='center'>Retweets</h1>
            <input className="form-control" id="search_q" name="q" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search for a topic, full name, or username" />
            <input className="btn btn-info" id="search_submit" type="submit" value="Search" />
          </form>
        <div className="my-3 p-3 bg-red rounded box-shadow">
          <h6 className="border-bottom border-gray pb-2 mb-0">Recent Search</h6>
          {it}
        </div>
      </div>
      </div>




    )
  }
}
export default Retweet;