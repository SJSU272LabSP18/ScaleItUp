import React, { Component } from 'react';
import logo from './logo.svg';
import {
	BrowserRouter as Router,
	Route,
	Link,
} from 'react-router-dom';
//import "./NavBar.css";
import "./header.css";

class Header extends Component {
	render() {
		return (
		<header className="header">
  <div className="container header__container">
<div className="header__logo"><img className="header__img" src="https://image.ibb.co/kcVou6/path3000.png"/> <h1 className="header__title">ScaleIt<span className="header__light">.up</span></h1></div> 
     <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
  
  <div className="header__menu">
    <nav id="navbar" className="header__nav collapse">
      <ul className="header__elenco">
        <li className="header__el"><a href="/" className="header__link">Home</a></li>
        <li className="header__el"><a href="/about" className="header__link">Contact us</a></li>
        <li className="header__el header__el--blue"><a href="/signin" className="btn btn--white">Sign In →</a></li>
      </ul>
    </nav>
  </div>
    </div>
</header>
			/*<nav className="navbar navbar-toggleable-md">
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
			</nav>*/
		);
	}
}


export default Header;
