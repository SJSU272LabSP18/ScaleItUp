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
import "./Login.css";

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
    <div className="login"><style>{'body { background-color: #3498DB; }'}</style>
		<div className="login-screen">
			<div className="app-title">
				<h1>Login</h1>
			</div>

			<div className="login-form">
				<div className="control-group">
				<input type="text" className="login-field" value={this.state.username} onChange={(event)=> this.setState({username:event.target.value})} placeholder="username" id="login-name"/>
				<label className="login-field-icon fui-user"></label>
				</div>

				<div className="control-group">
				<input type="password" className="login-field" value={this.state.password} onChange={(event)=> this.setState({password:event.target.value})} placeholder="password" id="login-pass"/>
				<label className="login-field-icon fui-lock" ></label>
				</div>

				<button className="btn btn-primary btn-large btn-block" onClick={(event)=>{this.handleSubmit(event)}}>login</button>
				
			</div>
		</div>
	</div>
  );
}
}
export default signin_aditya;