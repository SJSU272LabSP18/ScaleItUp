import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Tweet from "./tweet";

var config = require('./config');

class Nav extends Component {
	constructor() {
		super()
		this.getURLParameter = this.getURLParameter.bind(this)
		this.parse_query_string = this.parse_query_string.bind(this)
		this.logout=this.logout.bind(this)
		this.getUserInfo= this.getUserInfo.bind(this)
	}
	componentDidMount() {
			//this.getURLParameter('name')
			this.getURLParameter('username')	
	}
	getURLParameter(name) {
		var query = window.location.search.substring(1);
		console.log(query)
		var qs = this.parse_query_string(query);
		if (query != '' && name =='name') {
			localStorage.setItem('name', qs.name)
			console.log(qs.name)
			return qs.name
		} 
		if (query != '' && name =='username'){
			localStorage.setItem('username',qs.username)
		}
		
		return localStorage.getItem('name')
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
	getUserInfo() {
		fetch(config.baseURL + '/userinfo', {
			method: 'GET',
			mode: 'cors',
			dataType: 'json',
			headers: ({
			  "Access-Control-Allow-Origin": "*",
			  'Content-Type': "application/json"
			})
		  }).then(r => {
			console.log(r)
			this.setState({
			  
			})
		  })
		  .catch(err => console.log(err))
	  }
	
	logout(){
		var data = localStorage.getItem('username')
		data = JSON.stringify({'username':data});
		console.log(data)
		fetch(config.baseURL + '/logout', {
			method: 'DELETE',
			mode: 'cors',
			body: data,
			dataType: 'json',
			headers: ({
			  "Access-Control-Allow-Origin": "*",
			  'Content-Type': "application/json"
			})
		  })
		localStorage.clear();
	}
	render() {
		return (
			<div className='container'>
				<nav className="navbar navbar-toggleable-md">
					<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<h2 className="navbar-brand">Promos</h2>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/dashboard">Dashboard <span className="sr-only">(current)</span></Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/tweet">Blurbs</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/image">Blurbs & Images</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/retweet">Retweet</Link>
							</li>
						</ul>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link className="nav-link" to="https://twitter.com" target='_blank'>{this.getURLParameter('name')}</Link>
							</li>
						</ul>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/" onClick={this.logout}>Sign Out</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default Nav;
