import React, { Component } from 'react';
import Admin from './mainadmin';

class Dashadmin extends Component {
    render() {
      return (
        <div className="container">
        
        <div className="text-center">
        <Admin />
          
          <h1> Welcome to your Dashboard </h1>
         
        </div>
        </div>
      );
    }
  }
  
  export default Dashadmin;