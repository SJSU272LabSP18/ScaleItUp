import React, { Component } from 'react';
import Admin from './mainadmin';
import axios from 'axios';
import fs from 'fs';
var firebase = require("firebase");
//import drive from 'drive';
//import {google, drive_v3} from 'googleapis';
//import gapi from 'gapi-client';
/*var googleAuth = require('google-auth-library');
var readline = require('readline');
const google = require('googleapis');
var drive = google.drive("v3");
*/

var config = {
  apiKey: "AIzaSyB_KZF-Fx4NN99ZCJwgiI7dHfdDeGgmVcU",
  authDomain: "social-app-promotion.firebaseapp.com",
  databaseURL: "https://social-app-promotion.firebaseio.com",
  projectId: "social-app-promotion",
  storageBucket: "social-app-promotion.appspot.com",
  messagingSenderId: "412124305527"
};
firebase.initializeApp(config);

var config = require('../mainNavigation/config');
class Upload extends Component {

        state = {
            selectedFile: null
        }
      fileChangedHandler = (event) => {
        this.setState ({
          selectedFile: event.target.files[0]
      })}
      uploadHandler = (e) => {
        e.preventDefault();
        var storageRef = firebase.storage().ref('/cmpe272/' + this.state.selectedFile.name);
        var uploadTask = storageRef.put(this.state.selectedFile)
       /*const formData = new FormData()
       formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
        axios.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', formData), {
            onUploadProgress: progressEvent => {
              console.log(progressEvent.loaded / progressEvent.total)
            }
      } 
      console.log(this.state.selectedFile,this.state.selectedFile.name)
      var data ={ 'metadata':this.state.selectedFile,'name':this.state.selectedFile.name}
      data = JSON.stringify(data)*/
      /*fetch(config.baseURL + '/image/upload', {
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
      */
      /*const drive = google.drive({
        version: 'v3',
        auth: 'AIzaSyBuMt1AGm0V3kzHZVi2p5BnRXgSqczEiRo'
      });
      var fileMetadata = {
        'name': this.state.selectedFile
      };
      var media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(this.state.selectedFile.name)
      };
      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          console.log('File Id: ', file.id);
        }
      }); */
    }    
    render() {
      return (
        <div className="container">
        <div className="text-center">
        <Admin />
          <h1> Images </h1>
          <form>
          <input type="file" onChange={this.fileChangedHandler}></input>
        <button class="btn btn-info" onClick={this.uploadHandler}>Upload!</button>
        </form>
        </div>
        </div>
      );
    }
  }
  
  export default Upload;