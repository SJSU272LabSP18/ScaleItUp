import React, { Component } from 'react';
import Footer from '../Component/footerComponent/footer';
import Header from '../Component/headerComponent/header';

class Homepage extends Component {
  render() {
    return (
      <div className="container">
      
      <div className="text-center">
      <Header />
      <div className='jumbotron'>
        
        <h1> Welcome to Promos - A Social App for Twitter </h1>
        <p>This is a page for businesses who want to promote their product in social media app.</p>
      </div>
      <Footer /> 
      </div>
      </div>
    );
  }
}

export default Homepage;
