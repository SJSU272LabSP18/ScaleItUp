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
				<button className="navbar-toggle-collapsed p-0 border-0" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"
				data-target='#bs-example-navbar-collapse-1'>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="container">
					<Link className="navbar-brand" to="/">Promos</Link>
					<div className="navbar-collapse offcanvas-collapse" id="navbarCollapse">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/contact">Contact</Link>
							</li>
							
						</ul>
						<ul className="navbar-nav ml-auto">
						<li className="nav-item">
								<Link className="nav-link" to="/home">Sign In</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}


export default Header;
