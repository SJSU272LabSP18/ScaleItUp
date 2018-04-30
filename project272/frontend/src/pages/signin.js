import React, { Component } from 'react';
import Footer from '../Component/footerComponent/footer';
import Header from '../Component/headerComponent/header';
//import TwitterLogin from 'react-twitter-auth';
import { Redirect } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';

var config = require('../Component/mainNavigation/config');
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
    console.log(typeof (err))
    if (query != '' && name == 'error') {
      notify.show(err, "error", 5000, "#008000")
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
        </div>
        <div className='container'>
        <div className="row mb-5"></div>
          <div className="row mb-2">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className="jumbotron text-center">
                <h2><span className="fa fa-lock"></span> Administrator Login</h2>
                <p>Please Login via Button Below</p>
                <div className='row'>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <button className="btn btn-info">Login</button>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <button className="btn btn-info">Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className="jumbotron text-center">
                <h2><span className="fa fa-lock"></span> Employee Login with Twitter</h2>
                <p>Please Login via Button Below</p>
                <a href={config.baseURL + '/login'} className="btn btn-info"><span className="fa fa-twitter"></span> Login With Twitter</a>
              </div>
            </div>

          </div>
        </div>
      </div>

    );
  }
}
export default Signin;