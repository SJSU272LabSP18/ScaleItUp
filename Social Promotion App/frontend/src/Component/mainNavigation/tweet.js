import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Nav from "./mainnav";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Notifications, { notify } from 'react-notify-toast';

var config = require('./config');

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
    this.getSelectedRowKeys = this.getSelectedRowKeys.bind(this)
  }
  componentWillMount() {
    fetch(config.baseURL + '/get', {
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
          pyResp: r
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
  }

  options = {
    afterSearch: this.afterSearch  // define a after search hook
  };
  getSelectedRowKeys(row, isSelected, e) {
    var username = localStorage.getItem('username')
    //console.log(username)
    if (username != '') {
      var blurb = this.refs.table.state.selectedRowKeys;
      var fBlurb = this.state.pyResp[blurb - 1]["tweet"];
      var data = { "username": username, "tweet": fBlurb };
      data = JSON.stringify(data);
      console.log(data);
      fetch(config.baseURL + '/tweet', {
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
        .then(r => {
          if (this.state.message[0] != "") {
            notify.show(this.state.message[0], "error", 5000, "#008000")
          } else if (this.state.message[1] != "") {
            notify.show(this.state.message[1], "success", 5000, "#FF0000")
          }
        })
    }else{
      notify.show('Invalid Session! Please reauthenticate your Twitter Account','error',5000,"#008000")
    }
  }
  render() {
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: this.state.pyResp.length
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
        <div>
          <Notifications />
          <BootstrapTable ref='table' data={this.state.pyResp} selectRow={this.selectRowProp} search={true} pagination={true} options={options} version='4' cellEdit={this.cellEditProp}>
            <TableHeaderColumn dataField="id" isKey={true} dataAlign="left" width="70px" dataSort={true}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField="tweet" dataSort={true} width="300px">Blurbs</TableHeaderColumn>
          </BootstrapTable>

          <div className="text-center">
            <button id='butTweet' className='btn btn-info' onClick={this.getSelectedRowKeys} ><span className="fa fa-twitter"></span>Tweet</button>
          </div>
        </div>
      </div>

    )
  }
}
export default Tweet;
