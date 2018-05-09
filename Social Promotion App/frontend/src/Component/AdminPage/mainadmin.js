import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';


class Admin extends Component {

	render() {
		return (
		/* Changes by Aditya: starts */
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
        <li className="header__el"><a href="/dashadmin" className="header__link">Dashboard</a></li>
        <li className="header__el"><a href="/upload" className="header__link">Images</a></li>
		<li className="header__el"><a href="/view" className="header__link">Blurbs</a></li>
		<li className="header__el header__el--blue"><Link className="btn btn--white" to="/" onClick={this.logout}>Sign Out</Link></li>
        
      </ul>
    </nav>
  </div>
    </div>
</header>
		/* Changes by Aditya: starts */
		/*
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
								<Link className="nav-link" to="/upload">Images</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/view">Blurbs</Link>
							</li>
						</ul>
						<ul className="navbar-nav ml-auto">
						<li className="nav-item">
								<Link className="nav-link" to="/">Sign Out</Link>
						</li>
						</ul>
					</div>
				</nav>
			</div>*/
		);
	}
}

export default Admin;
