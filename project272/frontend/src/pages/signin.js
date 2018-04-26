import React, { Component } from 'react';
import Footer from '../Component/footerComponent/footer';
import Header from '../Component/headerComponent/header';
//import TwitterLogin from 'react-twitter-auth';
import {Redirect } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';

const baseURL = 'http://localhost:5000';
class Signin extends Component {
  constructor() {
		super()
		this.getURLParameter = this.getURLParameter.bind(this)
		this.parse_query_string = this.parse_query_string.bind(this)
  }
  componentDidMount() {
      this.getURLParameter('error')
  }
  getURLParameter(name) {
		var query = window.location.search.substring(1);
		console.log(query)
    var qs = this.parse_query_string(query);
    var err = qs.error
    console.log(typeof(err))
    if (query != '' && name =='error'){
			notify.show(err, "error", 5000,"#008000")
    }
  }
  parse_query_string(query) {
		var vars = query.split("&");
		var query_string = {};
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			// If first entry with this name
			if (typeof query_string[pair[0]] === "undefined") {
				query_string[pair[0]] = decodeURIComponent(pair[1]);
				// If second entry with this name
			} else if (typeof query_string[pair[0]] === "string") {
				var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
				query_string[pair[0]] = arr;
				// If third or later entry with this name
			} else {
				query_string[pair[0]].push(decodeURIComponent(pair[1]));
			}
		}
		return query_string;
	}
render() {
  return (
    <div className="Signin">
    <Notifications />
     <div className="container">
      <Header />
       <div className="jumbotron text-center">
        <h1><span className="fa fa-lock"></span> Employee Login with Twitter</h1>
        <p>Please Login via Button Below</p>
        <a href= {baseURL+'/login'} className="btn btn-info"><span className="fa fa-twitter"></span> Twitter</a>
    </div>
    </div>
    </div>
  );
}
}
export default Signin;