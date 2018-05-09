import Notifications, { notify } from 'react-notify-toast';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Admin from './mainadmin';
import { isNull } from 'util';
import $ from 'jquery';
import './upload.css';
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
    this.editTweet = this.editTweet.bind(this)
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
    var tweet = this.state.input
    var data = this.state.pyImage
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
          ).then(r=> {
            console.log(r)
          }) 
          .catch(err => console.log(err))
          notify.show("Image uploaded successfully", "success", 5000, "#FF0000")
      }      
    )
    }
    else {
      notify.show("Please select a image file", "error", 5000, "#FF0000")
    }
  }

  getImages() {
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
        let pyImage = this.state.pyImage.push(post =>{
            return post
        
      })
        this.setState(state => {
          state.pyImage= r;
          return state;
      }).bind(this);
      })
      .catch(err => console.log(err))
  }
  editTweet(index) {
      var dataID = this.state.pyImage[index -1]['_id']
      var tweet = $('#txtInput').html(); //this.state.pyImage[index -1]['tweet']
      var data = {'_id': dataID,'tweet':tweet}
      console.log(data)
      data = JSON.stringify(data)
      fetch(config.baseURL + '/image/update', {
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
        notify.show("Tweet updated successfully", "success", 5000, "#FF0000")
  }
  deleteImage(el){
      var imageID = this.state.pyImage[el-1]['_id']
      var id = this.state.pyImage[el-1]['id']
      var data = {"data": imageID};
      data = JSON.stringify(data);
      console.log(data);
      fetch(config.baseURL + '/image/delete', {
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
          let pyImage = this.state.pyImage.filter((post) => {
            return id !== post.id;
        });
        this.setState(state => {
          state.pyImage= pyImage;
          return state;
      }).bind(this);
        })
        .catch(err => console.log(err))
        notify.show("Image Deleted Successfully", "success", 5000, "#008000")
        
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
        var index = $('#prodId').val();
        $('#p'+index).html(value);          
        //$('#myModal').modal('hide');
      });
    });   
    let it = this.state.pyImage.map((product) => {
      return (
	  <div className="col-md-4 col-sm-4 price-box price-box--blue">
        <div style={{marginTop:'6%',backgroundColor: '#fff',borderRadius: '6px',boxShadow: '0 4px 8px 0px rgba(0,0,0,0.2)',padding: '35px 35px 40px 35px'}}>
          
           
                <img src={product.image} alt="Responsive image" style={{maxHeight:'140px', maxWidth :'260px'}} className="img-fluid rounded"></img>
                
                  <p id={'p'+product.id}>{product.tweet}</p>
                    
                      <button id ={'but'+ product.id} className="btn btn--blue btn--width" style={{width:'90px', borderRadius :'0px', padding: '5px 18px'}} data-toggle="modal" data-target="#myModal"><span className="glyphicon glyphicon-edit"></span> Edit</button>
                      <div id="myModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                            <h4 className="modal-title text -center">Make changes to Blurbs</h4>
                              <button id ="close" type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body" contentEditable ="true" ref='modalBody'>
                            <p id="txtInput"></p>
                            <input id="prodId" name="prodId" type="hidden"></input>
                            </div>
                            <div className="modal-footer">
							<button id="btnSave" type="button" class="btn btn-default" data-dismiss="modal" onClick = {() =>this.editTweet(document.getElementById("prodId").value)}>Save changes</button>
                            </div>
                          </div>

                        </div>
                      </div>
                    <button id={product.id} className='btn btn--blue btn--width' style={{width:'90px', borderRadius :'0px', padding: '5px 18px', marginLeft : '7%'}} onClick={() => this.deleteImage(product.id)} ><span className="glyphicon glyphicon-trash"></span>Delete</button>
             
             
             
       
        </div>
      </div>
        /*<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                            <button id="btnSave" type="button" class="btn btn-default" data-dismiss="modal" onClick = {() =>this.editTweet(document.getElementById("prodId").value)}>Save changes</button>
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
        </div>*/
      
      )
    })
    return (
	<div className='container'>
	 <Notifications />
        <Admin />
        <div className="text-center">
          <h1 text-align='center'>Images</h1>
		  <form class="form">
		  <div class="form-group">
		<div class="col-md-3"></div>
			<div class="col-md-6">
            <input type="text" onChange={ this.handleChange } placeholder="Enter Blurb here" class="form__field form__text" />
			</div>
			<div class="col-md-3"></div>
			</div>
			<div class="form-group">
			<div class="col-md-4"></div>
			<div class="col-md-2">
            <label style={{fontSize:'20px'}}>Select Image:</label>
			</div>
			<div class="col-md-2">
			<div class="custom-file">
			<span class="btn btn-default btn-file"> Browse
            <input type="file" onChange={this.fileChangedHandler}></input>
			</span>
			</div>
			</div>
			<div class="col-md-4"></div>
			</div>
            <button className="btn btn-info" type = 'Submit' onClick={this.uploadHandler} style={{borderRadius:'0px'}}>Upload!</button>
          </form>
         
          <div className="row row--margin">
            {it}
			{this.renderImage}
          </div>
        </div>
      </div>
      /*<div className="container">
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
            {this.renderImage}
          </div>
        </div>
      </div>*/
    );
  }
}
export default Upload;