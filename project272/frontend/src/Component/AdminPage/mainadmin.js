import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';


class Admin extends Component {

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
								<Link className="nav-link" to="/dashadmin">Dashboard <span className="sr-only">(current)</span></Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/upload">Upload</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/view">View & Edit</Link>
							</li>
						</ul>
						<ul className="navbar-nav ml-auto">
						<li className="nav-item">
								<Link className="nav-link" to="/">Sign Out</Link>
						</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default Admin;
