import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Nav from "./mainnav";
//import Request from 'superagent';
//var $ = require('jquery');
//var Client = require('node-rest-client').Client;
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const columns = ["_id", "tweet"];
var products = [{
  "tweet": "Item name 1",
  _id: 1,
  "done": "100"
}, {
  "tweet": "Item name 2",
  _id: 2,
  "done": "100"
}];

//var client = new Client();
class Image extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  componentWillMount() {
    console.log("fetching python tweet localhost");
    fetch('http://localhost:5000/get', {
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
        console.log(products)
        this.setState({
          pyResp: r
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: products.length
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

    return (
      <div className='container'>
        <Nav />
        <div className="text-center">
          <h1 text-align='center'>Images & Blurbs</h1>

          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div className="thumbnail">
                <img src="/logo.svg" alt="..."></img>
                  <div className="caption">
                    <h3>Scenery</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p><a href="#" className="btn btn-primary" role="button">Tweet</a></p>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
        )
      }
  } 
      
    export default Image;
