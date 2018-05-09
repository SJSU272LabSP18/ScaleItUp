import React, { Component } from 'react';
import Admin from './mainadmin';
import { BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';
import Notifications, { notify } from 'react-notify-toast';
import $ from 'jquery';
import { isNull } from 'util';
window.jQuery = $;
window.$ = $;
global.jQuery = $;


var config = require('../mainNavigation/config');

class Viewedit extends Component {
    constructor() {
        super()
        //this.onRowSelect = this.onRowSelect.bind(this)
        this.state = {
          pyResp: [],
          searchPy: [],
          selected: [],
          message: []
        }
        this.onAfterSaveCell = this.onAfterSaveCell.bind(this)
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
      selectRowProp = {
        mode: 'radio',
        //onSelect: this.onRowSelect
      }
      handleDeleteButtonClick = (onClick) => {
        var row = this.refs.table.state.selectedRowKeys;
        console.log(row)
        if (row<1){
            notify.show("Please select a blurb to delete","error",5000,"#FF0000")
        } else {
        var data= {'data':this.state.pyResp[row-1]['_id']};
        data =JSON.stringify(data)
        fetch(config.baseURL + '/delete/tweet', {
            method: 'DELETE',
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
              console.log(r)
              this.setState({
                message: r
              })
            })
            .catch(err => console.log(err))
            .then(r=> {
                notify.show("Deleted Successfully", "success", 5000, "#FF0000")
            })
            .then(r=>this.refs.table.handleDropRow(row))
          }
        }
      createCustomDeleteButton = (onClick) => {
        return (
            <DeleteButton 
            btnText='Delete'
            btnContextual='btn-danger'
            //className='my-custom-class'
			style={{backgroundColor :'#d9534f'}}
            onClick={ e => this.handleDeleteButtonClick(onClick) }/>
        );
    }    
    customKeyField = (column, attr, editorClass, ignoreEditable) => {
      const seqId = this.refs.table.state.data.length+1;
      return (
        <input type='text' { ...attr } disabled value={ seqId } className={ `${editorClass}` }/>
      );
    }
    onAfterSaveCell(row, cellName, cellValue) {
      var data= {'_id':row['_id'],'tweet': cellValue}
      data = JSON.stringify(data)
      fetch(config.baseURL + '/update', {
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
          console.log(r)
          this.setState({
            message: r
          })
        })
        .catch(err => console.log(err))
        .then(r=> {
            notify.show("Updated Successfully", "success", 5000, "#FF0000")
        })
    }
      cellEditProp = {
        mode: 'click',
        blurToSave: true,
        afterSaveCell: this.onAfterSaveCell
      };
      
      options = {
        afterSearch: this.afterSearch  // define a after search hook
      };
    saveAfter(row){
      var data = {tweet:row['tweet']}
      data = JSON.stringify(data)
      fetch(config.baseURL + '/insert', {
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
          console.log(r)
          this.setState({
            message: r
          })
        })
        .catch(err => console.log(err))
        .then(r=> {
            notify.show("Added Successfully", "success", 5000, "#FF0000")
        })
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
            paginationPosition: 'bottom',
            deleteBtn: this.createCustomDeleteButton,
            afterInsertRow: this.saveAfter
          };
      return (
	  <div>
	   <Admin />
        <div className="container">
        
        <div className="text-center">
       
          
          <h1> Blurbs </h1>
          </div>
          <div>
          <Notifications />
          <BootstrapTable ref='table' data={this.state.pyResp} selectRow={this.selectRowProp} search={true} pagination={true} options={options} version='4' cellEdit={this.cellEditProp} striped={true} hover={true}
           options ={options} insertRow deleteRow exportCSV>
            <TableHeaderColumn dataField="id" isKey={true} dataAlign="left" width="70px" dataSort={true}  customInsertEditor={ { getElement: this.customKeyField } }>ID</TableHeaderColumn>
            <TableHeaderColumn dataField="tweet" dataSort={true} width="300px">Blurbs</TableHeaderColumn>
          </BootstrapTable>
        </div>
        </div>
        </div>
      );
    }
  }
  
  export default Viewedit;