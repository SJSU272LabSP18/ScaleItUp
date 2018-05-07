import React, { Component } from 'react';
import Footer from '../Component/footerComponent/footer';
import Header from '../Component/headerComponent/header';

class Contact extends Component {
  render() {
    return (
	<div className="">
	<Header />
  <div className="container">
    <div className="row">
     <h1 className="row__title">
    Contact Us </h1>
  <h2 className="row__sub">Feel free to ask any questions</h2>
    </div>
    <div className="row row--margin">
      <div className="col-md-1"></div>
      <div className="col-md-4">
        <div className="contacts">
          <a href="#" className="contacts__link"><img src="https://image.ibb.co/kcVou6/path3000.png"/><h1 className="contacts_title-ag">ScaleIt<span className="contacts--light">.up</span></h1></a>
          <p className="contacts__address">
            754 The Alameda, Apt 4413<br/>
            San Jose CA 95126<br/>
            United States
          </p>
          <p className="contacts__info">
            tel. <a href="#" className="contacts__info-link">+1 669 204 9922</a>
          </p>
          <p className="contacts__info">
            m. <a href="#"className="contacts__info-link">info@scaleit.up</a>
          </p>
        </div>
      </div>
      <div className="col-md-6">
        <form id="contact" className="form">
          <div className="form-group">
            <select className="form__field form__select">
              <option selected value>Choose topic*</option>
              <option value="1">Tweets</option>
              <option value="2">Blurbs Stories</option>
            </select>
            </div>
           <div className="form-group">
             <div className="form__field--half">
            <input type="text" placeholder="Name*" className="form__field form__text"></input>
             </div>
          <div className="form__field--half">
          <input type="text" placeholder="Surname" className="form__field form__text"></input>
          </div>
          </div>
      
        <div className="form-group">
          <div className="form__field--half">
            <input type="text" placeholder="Email address*" className="form__field form__text"></input>
          </div>
         <div className="form__field--half">
          <input type="text" placeholder="Phone number" className="form__field form__text"></input>
    </div>
          </div>
  
          <div className="form-group">
            <textarea type="text" placeholder="Your messsage*" className="form__field form__textarea"></textarea>
            <button className="btn btn--up btn--width" type="submit">Submit</button>
          </div>
        </form>
      </div>   
<div className="col-md-1"></div>
    </div>
  </div>
  <Footer />
</div>
      /*<div>
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
     </div>*/
    );
  }
}

export default Contact;
