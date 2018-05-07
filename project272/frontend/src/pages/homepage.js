import React, { Component } from 'react';
import Footer from '../Component/footerComponent/footer';
import Header from '../Component/headerComponent/header';


class Homepage extends Component {
	
  render() {
    return (
	<div>
	 <Header></Header>
	 <div className="sect sect--white">
<div className="container">
<div className="row">
  <h1 className="row__title">
    Fast paced way to grow your business
  </h1>
</div>
<div className="row row--margin row--text-center">
  <div className="col-md-8 col-sm-10 col-xs-12 row__carousel">
    <div id="myCarousel" className="carousel slide" data-ride="carousel">

  <ol className="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    
  </ol>

  <div className="carousel-inner">
    <div className="item active">
      <div className="item__content">
		  <img src="https://image.ibb.co/kcVou6/path3000.png"/><h1 className="contacts_title-ag">ScaleIt<span className="contacts--light">.up</span></h1>
		  <p className="item__description">This app helps you promote your business on twitter with power to your marketing team. It has very simple features to upload blurbs, texts and images which will help your team to brand the product in the market through Twitter. A secure place to keep your marketing strategies at one place with powerful tools to manage it.</p>
		  </div>
		  <div className="item__avatar"></div>
		  <p className="item__people">Manikant Prasad</p>
      </div>
    <div className="item">
    <div className="item__content">
      <img src="https://image.ibb.co/kcVou6/path3000.png"/><h1 className="contacts_title-ag">ScaleIt<span className="contacts--light">.up</span></h1>
      <p className="item__description">
         A unique way to promote your business through your employees which increases the brand value of the company. It encourages your employee to promote and follow the latest marketing trends happening in social sites. A secure place where ownership is given to each employee for promoting the brand value of the product.
      </p>
        </div>
      <div className="item__avatar"></div>
     <p className="item__people">Manikant Prasad</p>
    </div>
    

  </div>

  <a className="left carousel-control" href="#myCarousel" data-slide="prev">
<img className="carousel-control__img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5NCAzMS40OTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjQ5NCAzMS40OTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KPHBhdGggZD0iTTEwLjI3Myw1LjAwOWMwLjQ0NC0wLjQ0NCwxLjE0My0wLjQ0NCwxLjU4NywwYzAuNDI5LDAuNDI5LDAuNDI5LDEuMTQzLDAsMS41NzFsLTguMDQ3LDguMDQ3aDI2LjU1NCAgYzAuNjE5LDAsMS4xMjcsMC40OTIsMS4xMjcsMS4xMTFjMCwwLjYxOS0wLjUwOCwxLjEyNy0xLjEyNywxLjEyN0gzLjgxM2w4LjA0Nyw4LjAzMmMwLjQyOSwwLjQ0NCwwLjQyOSwxLjE1OSwwLDEuNTg3ICBjLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiIGZpbGw9IiM2Zjc5ZmYiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />

  </a>
  <a className="right carousel-control" href="#myCarousel" data-slide="next">
    <img className="carousel-control__img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5IDMxLjQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMS40OSAzMS40OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8cGF0aCBkPSJNMjEuMjA1LDUuMDA3Yy0wLjQyOS0wLjQ0NC0xLjE0My0wLjQ0NC0xLjU4NywwYy0wLjQyOSwwLjQyOS0wLjQyOSwxLjE0MywwLDEuNTcxbDguMDQ3LDguMDQ3SDEuMTExICBDMC40OTIsMTQuNjI2LDAsMTUuMTE4LDAsMTUuNzM3YzAsMC42MTksMC40OTIsMS4xMjcsMS4xMTEsMS4xMjdoMjYuNTU0bC04LjA0Nyw4LjAzMmMtMC40MjksMC40NDQtMC40MjksMS4xNTksMCwxLjU4NyAgYzAuNDQ0LDAuNDQ0LDEuMTU5LDAuNDQ0LDEuNTg3LDBsOS45NTItOS45NTJjMC40NDQtMC40MjksMC40NDQtMS4xNDMsMC0xLjU3MUwyMS4yMDUsNS4wMDd6IiBmaWxsPSIjNmY3OWZmIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
 
  </a>
</div>
    
  </div>
  
  

</div>
</div>
</div>
	 <Footer></Footer>
	 </div>
     /*    
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
     
    
        */
        
     
    );
  }
}

export default Homepage;
