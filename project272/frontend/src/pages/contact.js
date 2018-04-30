import React, { Component } from 'react';
import Footer from '../Component/footerComponent/footer';
import Header from '../Component/headerComponent/header';

class Contact extends Component {
  render() {
    return (
      <div className="container">
      <Header />
      <div className='jumbotron text-center'>
      
      <h2> Contact Us</h2>
        <p>Aditya Chouhan</p>
	      <p>Manikant Prasad</p>
        <p>Megha Nair</p>
        <p>Vidhya</p>   
     </div>
     <div className="row mb-5"></div> 
     <div className ='text-center'>
     <Footer />
     </div>
     </div>
    );
  }
}

export default Contact;
