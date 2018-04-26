import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Nav from "./mainnav";
import "./mainNav.css";

const baseURL = 'http://localhost:5000'

class Retweet extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      results: []
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
    data = encodeURIComponent(data)
    //data = JSON.stringify(data);
    console.log(data)
    fetch(baseURL + '/search' + '?q=' + data, {
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
  render() {
    let it = this.state.results.map((tweet) => {
      return (
      
        <div className="media text-muted pt-3">
          <img src={tweet.avatar} data-holder-rendered="true" />
          <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <a href={"http://www.twitter.com/" + tweet.user}>{tweet.author}</a>
            <strong className="d-block text-gray-dark">{tweet.user}
            <normal className="time"> : {tweet.createdat} </normal>
            </strong>
            {tweet.text}
          </p>
          <div className="item-footer">
          <div className="ProfileTweet-action ProfileTweet-action--retweet js-toggleState js-toggleRt">
            <button className="ProfileTweet-actionButton  js-actionButton js-actionRetweet" data-modal="ProfileTweet-retweet" type="button" aria-describedby="profile-tweet-action-retweet">
              <div className="IconContainer js-tooltip" data-original-title="Retweet">
                <span className="Icon Icon--medium Icon--retweet"></span>
                <span className="u-hiddenVisually">Retweet</span>
              </div>
              <span className="ProfileTweet-actionCount ProfileTweet-actionCount--isZero">
                <span className="ProfileTweet-actionCountForPresentation" aria-hidden="true"></span>
              </span>

            </button><button className="ProfileTweet-actionButtonUndo js-actionButton js-actionRetweet" data-modal="ProfileTweet-retweet" type="button">
              <div className="IconContainer js-tooltip" title="Undo retweet">
                <span className="Icon Icon--medium Icon--retweet"></span>
                <span className="u-hiddenVisually">Retweeted</span>
              </div>
              <span className="ProfileTweet-actionCount ProfileTweet-actionCount--isZero">
                <span className="ProfileTweet-actionCountForPresentation" aria-hidden="true"></span>
              </span>

            </button>
          </div>
        </div>
    </div>
      )
    })
    return (
      <div className='container'>
        <Nav />
        <div className="text-center">
          <form onSubmit={this.getSearch}>
            <h1 text-align='center'>Retweets</h1>
            <input className="form-control" id="search_q" name="q" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search for a topic, full name, or username" />
            <input className="btn btn-info" id="search_submit" type="submit" value="Search" />
          </form>
          <div>
          <div className="my-3 p-3 bg-white rounded box-shadow">
            <h6 className="border-bottom border-gray pb-2 mb-0">Recent Search</h6>
            {it}
            </div>
          </div>
        </div>
      </div>


    )
  }
}
export default Retweet;