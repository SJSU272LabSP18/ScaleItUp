import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Nav from "./mainnav";
//import Request from 'superagent';
//var $ = require('jquery');
//var Client = require('node-rest-client').Client;
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


const lists = [
  "tweet1",
  "tweet2",
  "tweet3"
];
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
class Tweet extends Component {
  constructor() {
    super()
    this.onRowSelect = this.onRowSelect.bind(this)
    this.state = {
      pyResp: [],
      searchPy: [],
      selected: [],
      message: []
    }
    this.getSearch = this.getSearch.bind(this)
    //this.test=this.test.bind(this)
    this.getSelectedRowKeys = this.getSelectedRowKeys.bind(this)
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
  getSearch(e) {
    e.preventDefault();
    fetch('http://localhost:5000/search', {
      method: 'GET',
      mode: 'cors',
      dataType: 'json',
      headers: ({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': "application/json"
      })
    })
      .then(r => r.json())
      //.then(r=> r.toArray())
      .then(r => {
        console.log(r)
        this.setState({
          searchPy: r
        })
      })
      .catch(err => console.log(err))
  }

  onRowSelect(row, isSelected, e) {
    // maybe some validation here
    let rowStr = '';
    for (const prop in row) {
      rowStr += prop + ': "' + row[prop] + '"';
    }
    console.log(e);
    alert(`is selected: ${isSelected}, ${rowStr}`);
  }
  selectRowProp = {
    mode: 'radio',
    //onSelect: this.onRowSelect
  }

  cellEditProp = {
    mode: 'click',
    bgColor: 'blue'
  };
  afterSearch(searchText, result) {
    console.log('Your search text is ' + searchText);
    console.log('Result is:');
    for (let i = 0; i < result.length; i++) {
      console.log('Fruit: ' + result[i].id + ', ' + result[i].name + ', ' + result[i].price);
    }
  }

  options = {
    afterSearch: this.afterSearch  // define a after search hook
  };
  getSelectedRowKeys(row, isSelected, e) {
    // I think this answers your questions
    var blurb = this.refs.table.state.selectedRowKeys;
    console.log(this.state.pyResp[blurb - 1]["tweet"]);
    var fBlurb = this.state.pyResp[blurb - 1]["tweet"];
    var data = { "name": "manikantbit", "tweet": fBlurb };
    data = JSON.stringify(data);
    console.log(data);
    fetch('http://localhost:5000/tweet', {
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
        alert(this.state.message[0])
      } else if(this.state.message[1]!="") {
        alert(this.state.message[1])
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
          <h1 text-align='center'>Blurbs</h1>
        </div>
        <div id = {(this.state.message[0]!="")?
        <div className='alert alert-success'>{this.state.message[0]}</div> :
        <div className='alert alert-danger'>error {this.state.message[1]}</div>}>
       </div>
        <BootstrapTable ref='table' data={this.state.pyResp} selectRow={this.selectRowProp} search={true} pagination={true} options={options} version='4' cellEdit={this.cellEditProp}>
          <TableHeaderColumn dataField="_id" isKey={true} dataAlign="left" width="70px" dataSort={true}>ID</TableHeaderColumn>
          <TableHeaderColumn dataField="tweet" dataSort={true} width="300px">Blurbs</TableHeaderColumn>
        </BootstrapTable>

        <div className="text-center">
          <button id ='butTweet' className='btn btn-info' onClick={this.getSelectedRowKeys} >Tweet</button>
        </div>
      </div>
      
    )
  }
}
export default Tweet;
