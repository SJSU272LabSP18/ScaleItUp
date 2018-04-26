import React, { Component } from 'react';
import Nav from './mainnav';

class Dashboard extends Component {
    render() {
      return (
        <div className="container">
        
        <div className="text-center">
        <Nav />
          
          <h1> Welcome to your Dashboard </h1>
         
        </div>
        </div>
      );
    }
  }
  
  export default Dashboard;
  