import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Nav from "./mainnav";
import Notifications, { notify } from 'react-notify-toast';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
//const bootstrap = require('bootstrap');

var config = require('./config');
class Image extends Component {
  constructor() {
    super()
    this.state = {
      pyImage: [],
      message: [],
      value: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  componentWillMount() {
    fetch(config.baseURL + '/image/get', {
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
    var username = localStorage.getItem('username')
    if (username != '') {
      var fImage = this.state.pyImage[el - 1]["image"];
      var fBlurb = $('#p' + el).text();//this.state.pyImage[el - 1]["tweet"];
      var data = { "username": username, "tweet": fBlurb, "image": fImage };
      data = JSON.stringify(data);
      console.log(data);
      fetch(config.baseURL + '/image/tweet', {
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
            notify.show(this.state.message[0], "success", 5000, "#008000")
          } else if (this.state.message[1] != "") {
            notify.show(this.state.message[1], "error", 5000, "#FF0000")
          }
        })
    } else {
      notify.show('Invalid Session! Please reauthenticate your Twitter Account', 'error', 5000, "#008000")
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
    $(function (e) {
      $('button').click(function () {
        console.log((this.id).substring(0, 3))
        if ((this.id).substring(0, 3) == 'but') {
          var no = (this.id).substring(3);
          //$('#myModal').modal('show');
          var data = $('#p' + no).text();
          $('#prodId').val(no);
          $('#txtInput').text(data);
        }
      });
    });
    $(function (e) {
      $('#btnSave').click(function () {
        //var value = document.getElementById("p").innerText;
        var value = $('#txtInput').html()
        //console.log(value)
        var index = $('input').val();
        $('#p' + index).html(value);
        //$('#myModal').modal('hide');
      });
    });


    let it = this.state.pyImage.map((product) => {
      return (
        <div className="col-md-4 col-sm-4 price-box price-box--blue">
          <div style={{ marginTop: '6%', backgroundColor: '#fff', borderRadius: '6px', boxShadow: '0 4px 8px 0px rgba(0,0,0,0.2)', padding: '35px 35px 40px 35px' }}>


            <img src={product.image} alt="Responsive image" style={{ maxHeight: '140px', maxWidth: '260px' }} className="img-fluid rounded"></img>

            <p id={'p' + product.id}>{product.tweet}</p>


            <button id={'but' + product.id} className="btn btn--blue btn--width" style={{ width: '90px', borderRadius: '0px', padding: '5px 18px' }} data-toggle="modal" data-target="#myModal"><span className="glyphicon glyphicon-edit"></span> Edit</button>
            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title text -center">Make changes to Blurbs</h4>
                    <button id='close' type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body" contenteditable="true" ref='modalBody'>
                    <p id="txtInput"></p>
                    <input id="prodId" name="prodId" type="hidden"></input>
                  </div>
                  <div className="modal-footer">
                    <button id="btnSave" type="button" class="btn btn-default" data-dismiss="modal">Save changes</button>
                  </div>
                </div>

              </div>
            </div>



            <button id={product.id} className='btn btn--blue btn--width' style={{ width: '90px', borderRadius: '0px', padding: '5px 18px', marginLeft: '7%' }} onClick={() => this.postTweet(product.id)} ><span className="fa fa-twitter"></span>Tweet</button>





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
          <div className="row row--margin">
            {it}
          </div>
        </div>
      </div>

    )
  }
}

export default Image;
