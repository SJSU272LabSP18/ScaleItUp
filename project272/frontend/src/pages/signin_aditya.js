import React, { Component } from 'react';
import Footer from '../Component/footerComponent/footer';
import Header from '../Component/headerComponent/header';
import TwitterLogin from 'react-twitter-auth';
import md5 from 'md5';
import {
	BrowserRouter as Router,
	Route,
	Link,
} from 'react-router-dom';
import { Redirect } from 'react-router';
//import "./Login.css";

const url = 'http://localhost:5000';
class signin_aditya extends Component {
constructor() {
    super();
    this.state = { username:'', password:'', loggedIn: false, redirectHome: false };
	this.handleSubmit=this.handleSubmit.bind(this);
}

handleSubmit=(event)=>{
	console.log(this.state.username);
	console.log(this.state.password);
	console.log(md5(this.state.password));
	var password = md5(this.state.password)
	var loginJSON = {"username" : this.state.username, "password" : password};
	fetch('http://localhost:5000/login_aditya', {
      method: 'POST',
      mode: 'cors',
      dataType: 'json',
      headers: ({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': "application/json"
      }),
	 body : JSON.stringify(loginJSON)
    })
      .then(r => r.json())
	  .then(r => {
        console.log(r["authenticate"])
		if(r["authenticate"] == "true")
		{
			console.log("LOgged in !!!");
			this.setState({redirectHome : true});
		}
      })
      .catch(err => console.log(err))
	
}

onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };
  
  onFailed = (error) => {
    alert(error);
  }; 
  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };
render(){
	if(this.state.redirectHome == true)
				{
					return <Redirect push to="/dashboard" />;
				}
   
  return (
    <div className="login">
	<Header/>
	 <div className="row">
     <h1 className="row__title">
    Please Sign In </h1>

    </div>
	 <div className="row row--margin" style={{marginBottom : '15%'}}>
      <div className="col-md-4"></div>
	<div className="col-md-4">
        <div id="contact" className="form">
          
           <div className="form-group">
             <div className="form__field--full">
            <input type="text" value={this.state.username} onChange={(event)=> this.setState({username:event.target.value})} placeholder="Login*" className="form__field form__text"></input>
             </div>
			 </div>
			 <div className="form-group">
          <div className="form__field--full">
          <input type="password" value={this.state.password} onChange={(event)=> this.setState({password:event.target.value})} placeholder="Password*" className="form__field form__text"></input>
          </div>
          </div>
      
      
  
          <div className="form-group">
            
            <button className="btn btn--up btn--width" onClick={(event)=>{this.handleSubmit(event)}}>Submit</button>
          </div>
        </div>
		<div className="col-md-4"></div>
		</div>
      </div> 
<Footer/>	  
		
	</div>
  );
}
}
export default signin_aditya;