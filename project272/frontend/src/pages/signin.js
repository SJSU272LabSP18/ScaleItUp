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
		<div>
		 <Header />
<div class="container" style={{marginBottom : '8%'}}>
<div class="row row--center">
  <h1 class="row__title">
    Sign In
  </h1>
  <h2 class="row__sub">Please select an account to Sign In</h2>
</div>
<div class="row row--center row--margin">
  <div class="col-md-6 col-sm-6 price-box price-box--purple">
    <div class="price-box__wrap">
      <div class="price-box__img"></div>
      <h1 class="price-box__title">
        Admin Login
      </h1>
       <div class="price-box__btn">
      
	  <button class="btn btn--purple btn--width" onClick={(event)=>{this.props.history.push('/signin_aditya')}}>Login</button>
    </div>
  </div>
  </div>
 
  <div class="col-md-6 col-sm-6 price-box price-box--blue">
  <div class="price-box__wrap">
      <div class="price-box__img "></div>
      <h1 class="price-box__title">
         Log In with Twitter
      </h1>
    <div class="price-box__btn">
	  <a class="btn btn--blue btn--width" href={config.baseURL + '/login'}><span className="fa fa-twitter"></span> Login</a>
    </div>
  </div>
  </div>
  
  

</div>
</div>
<Footer/>
</div>
       
        
      </div>

    );
  }
}
export default Signin;