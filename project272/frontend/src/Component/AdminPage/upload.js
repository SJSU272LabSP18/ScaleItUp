import Notifications, { notify } from 'react-notify-toast';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Admin from './mainadmin';
import { isNull } from 'util';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
var firebase = require("firebase");
var config = require('../mainNavigation/config');

var config1 = {
  apiKey: "AIzaSyB_KZF-Fx4NN99ZCJwgiI7dHfdDeGgmVcU",
  authDomain: "social-app-promotion.firebaseapp.com",
  databaseURL: "https://social-app-promotion.firebaseio.com",
  projectId: "social-app-promotion",
  storageBucket: "social-app-promotion.appspot.com",
  messagingSenderId: "412124305527"
};
firebase.initializeApp(config1);

class Upload extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      input: '',
      pyImage:[]
    }
    this.fileChangedHandler=this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.getImages = this.getImages.bind(this)
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
    }).then(r => r.json())
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
  
  handleChange = (e) => {
    this.setState({ input: e.target.value });
  }
  fileChangedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }
  uploadHandler = (e) => {
    e.preventDefault();
    
    console.log(this.state.input);
    var tweet = this.state.input
  
    if (this.state.selectedFile != null) {
      var storageRef = firebase.storage().ref('/cmpe272/' + this.state.selectedFile.name);
      var uploadTask = storageRef.put(this.state.selectedFile)

      uploadTask.on('state_changed', function (snapshot) {

      }, function (error) {

      }, function () {
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
        var data = { 'tweet': tweet, 'image': downloadURL }
        data = JSON.stringify(data)
        fetch(config.baseURL + '/image/upload', {
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
          notify.show("Image uploaded successfully", "success", 5000, "#FF0000")
        })
    
    } else {
      notify.show("Please select a image file", "error", 5000, "#FF0000")
    }
  }
  getImages(){
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
  deleteImage(el){
      var imageID = this.state.pyImage[el-1]['_id']
      var data = {"data": imageID};
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
  }
  render() {
    $(function(e) {
      $('button').click(function() {
        console.log((this.id).substring(0,3))
        if((this.id).substring(0,3) == 'but') {
        var no = (this.id).substring(3);
        //$('#myModal').modal('show');
        var data = $('#p'+no).text();
        $('#prodId').val(no);
        $('#txtInput').text(data);
        }
      });
    });
    $(function(e){
      $('#btnSave').click(function() {
        //var value = document.getElementById("p").innerText;
        var value = $('#txtInput').html()
        //console.log(value)
        var index = $('input').val();
        $('#p'+index).html(value);
        //$('#myModal').modal('hide');
      });
    });
  
      
    let it = this.state.pyImage.map((product) => {
      return (
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <div className="jumbotron">
            <div className="card">
              <div className="thumbnail">
                <img src={product.image} alt="Responsive image" className="img-fluid rounded"></img>
                <div className="caption">
                  <p id={'p'+product.id}>{product.tweet}</p>
                  <div className="row text-center"> 
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                      <button id ={'but'+ product.id} className="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"><span className="glyphicon glyphicon-edit"></span> Edit</button>
                      <div id="myModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                            <h4 className="modal-title text -center">Make changes to Blurbs</h4>
                              <button id ='close' type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body" contenteditable ="true" ref='modalBody'>
                            <p id="txtInput"></p>
                            <input id="prodId" name="prodId" type="hidden"></input>
                            </div>
                            <div className="modal-footer">
                            <button id="btnSave" type="button" class="btn btn-default" data-dismiss="modal">Save changes</button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                      <button id={product.id} className='btn btn-info btn-sm' onClick={() => this.deleteImage(product.id)} ><span className="glyphicon glyphicon-trash"></span>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      )
    })
    return (
      <div className="container">
      <Notifications/>
        <div className="text-center">
          <Admin />
          <h1> Images </h1>
          <form>
            <label>Enter Blurbs Here:</label>
            <input type="text" onChange={ this.handleChange } />
            <label>Select Image:</label>
            <input type="file" onChange={this.fileChangedHandler}></input>
            <button className="btn btn-info" type = 'Submit' onClick={this.uploadHandler}>Upload!</button>
          </form>
          <div className="row mb-3">
            {it}
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;