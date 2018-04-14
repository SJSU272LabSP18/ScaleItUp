import React, { Component } from 'react';
import Footer from '../Component/footerComponent/footer';
import Header from '../Component/headerComponent/header';

class Contact extends Component {
  render() {
    return (
      <div className="container">
      <Header />
       	<h1>Contact Us</h1>
	      <p>Manikant Prasad</p>
      <Footer />	
     </div>
    );
  }
}

export default Contact;
