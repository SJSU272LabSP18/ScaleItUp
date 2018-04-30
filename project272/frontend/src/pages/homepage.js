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
            <h1> Welcome to Promos - A Social Promotion App for Twitter </h1>
            <p>This is a page for businesses who want to promote their product in social media app.</p>
            </div>
          <div className="row mb-2">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="card" style ={{backgroundColor:'#e9ecef'}}>
              <div className='card-title'>
                <h3> Promote Your Business</h3>
                <p> This app helps you promote your business on twitter with power to your marketing team. It has very simple features to upload blurbs, texts and images which will help your team to brand the product in the market through Twitter. A secure place to keep your marketing strategies at one place with powerful tools to manage it.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="card" style ={{backgroundColor:'#e9ecef'}}>
              <div className='card-title'>
                < h3> Increase your Social Brand Value </h3>
                <p>A unique way to promote your business through your employees which increases the brand value of the company. It encourages your employee to promote and follow the latest marketing trends happening in social sites. A secure place where ownership is given to each employee for promoting the brand value of the product.</p>
              </div>
            </div>
          </div>
          </div>
          <div className="row mb-5"></div> 
          <Footer />
        </div>
        
        </div>
     
    );
  }
}

export default Homepage;
