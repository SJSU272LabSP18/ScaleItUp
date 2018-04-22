import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Nav from "./mainnav";
import Notifications, {notify} from 'react-notify-toast';

const baseURL = 'http://localhost:5000'
class Image extends Component {
  constructor() {
    super()
    this.state = {
      pyImage: [],
      message : []
    }
    //this.postTweet = this.postTweet.bind(this)
  }
  componentWillMount() {
    fetch(baseURL + '/image/get', {
      method: 'GET',
      mode: 'cors',
      dataType: 'json',
      headers: ({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': "application/json"
      })
    })
      .then(r => r.json())
      .then(r => Array.from(Object.keys(r), k => r[k])
      )
      .then(r => {
        console.log(r)
        this.setState({
          pyImage: r,
        })
      })
      .catch(err => console.log(err))
  }

  postTweet(el) {
    //console.log(this.document.getElementById("id"));
    console.log(el)
    var fImage = this.state.pyImage[el-1]["image"];
    var fBlurb = this.state.pyImage[el-1]["tweet"];
    var data = { "name": "manikantbit", "tweet": fBlurb, "image": fImage};
    data = JSON.stringify(data);
    console.log(data);
    fetch(baseURL+'/image/tweet', {
      method: 'POST',
      mode: 'cors',
      body: data,
      dataType: 'json',
      headers: ({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': "application/json"
      })
    })
      .then(r => r.json())
      .then(r => Array.from(Object.keys(r), k => r[k])
      )
      .then(r => {
         this.setState({
          message: r
        })
      })
      .catch(err => console.log(err))
      .then( r => {if(this.state.message[0] != "") {
        notify.show(this.state.message[0], "error", 5000,"#008000")
      } else if(this.state.message[1]!="") {
        notify.show(this.state.message[1], "success", 5000,"#FF0000")
      }}) 
  }
  
 
  render() {
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: this.state.message.length
      }], // you can change the dropdown list for size per page
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First',
      lastPage: 'Last',
      paginationShowsTotal: this.renderShowsTotal,
      paginationPosition: 'top'
    };
    function myFunction(button) {
      var x = document.getElementById("p");
      if (x.contenteditable == "true") {
        x.contentEditable = "false";
        button.innerHTML = "Edit";
      } else {
        x.contentEditable = "true";
        button.innerHTML = "Disable";
      }
    }
    let it = this.state.pyImage.map((product) => {
      return (
       <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
       <div class="jumbotron">
       <div className="card">
        <div className="thumbnail">
          <img src={product.image} alt="Responsive image" className = "img-fluid rounded"></img>
          <div className="caption">
            <p id='p' contenteditable="true">{product.tweet}</p>
            <div className="text-center">
            <button id ={product.id} className='btn btn-info' onClick={() => this.postTweet(product.id)} >Tweet</button>
            </div>
         </div>
         </div>
       
      </div>
      </div>    
          </div>
       
      )
    })
    return (
      <div className='container'>
        <Nav />
        <div className="text-center">
          <h1 text-align='center'>Images & Blurbs</h1>
          <Notifications />
          <div className="row mb-3">
            {it}
          </div>
        </div>
      </div>

    )
  }
}

export default Image;
