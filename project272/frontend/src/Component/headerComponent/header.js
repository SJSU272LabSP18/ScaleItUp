import React, { Component } from 'react';
import logo from './logo.svg';
import {
	BrowserRouter as Router,
	Route,
	Link,
} from 'react-router-dom';
import "./NavBar.css";

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-toggleable-md">
				<button className="navbar-toggle-collapsed p-0 border-0" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
					
				</button>
				<div className="container">
					<h2 className="navbar-brand">Promos</h2>
					<div className="navbar-collapse offcanvas-collapse" id="navbarCollapse">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/about">About</Link>
							</li>
							
						</ul>
						<ul className="navbar-nav ml-auto">
						<li className="nav-item">
								<Link className="nav-link" to="/signin">Sign In</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}


export default Header;
