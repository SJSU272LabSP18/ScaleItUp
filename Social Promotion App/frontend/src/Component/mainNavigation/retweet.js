import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Nav from "./mainnav";
import "./mainNav.css";
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
	  
	   <div className="col-md-4 col-sm-4 price-box price-box--blue">
          <div style={{ marginTop: '6%', backgroundColor: '#fff', borderRadius: '6px', boxShadow: '0 4px 8px 0px rgba(0,0,0,0.2)', padding: '35px 35px 40px 35px', display:'block', height : '265px' }}>
		  <div>
		  <img src={tweet.avatar} data-holder-rendered="true" style={{ maxHeight: '140px', maxWidth: '260px' }} className="img-fluid rounded"></img>
		  </div>
		  <div>
		   <a style={{display : 'block'}} href={"http://www.twitter.com/" + tweet.user}>{tweet.author}</a>
            <strong>
             {tweet.text}
            </strong> 
		  </div>
		  <button style={{ borderRadius: '0px', height: '41px', width: '113px',marginTop: '4%'}} id={tweet.id} className="btn btn-info btn-md" onClick={() => this.handleRetweet(tweet.id)}>
                <span className="glyphicon glyphicon-retweet"></span> Retweet
               </button>
		  </div>
		  </div>
        /*<div className="media text-muted pt-3">
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
        </div>*/

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
            <input style={{marginTop : '1%'}} className="btn btn-info" id="search_submit" type="submit" value="Search" />
          </form>
        <div className="row row--margin">
          {it}
        </div>
      </div>
      </div>
    )
  }
}
export default Retweet;