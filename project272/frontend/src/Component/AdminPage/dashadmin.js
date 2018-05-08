import React, { Component } from 'react';
import Nav from './mainadmin';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class Dashadmin extends Component {
	constructor() {
    super();
    this.state = {data: {
  columns: [
    ['Tweets', 0],
    ['Images', 0]
  ],
  type : 'bar'
}};
	}
	
    render() {
		
		/*const data = {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 50, 20, 10, 40, 15, 25]
  ],
  type : 'bar'
};*/

fetch('http://localhost:5000/dash', {
      method: 'GET',
      mode: 'cors',
      dataType: 'json',
      headers: ({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': "application/json"
      })
    }).then(r => r.json())
	  .then(r => {
        console.log(r);
		debugger;
		var temp =r;
		this.setState({data: temp});
		console.log(this.state.data);
      })
      .catch(err => console.log(err))

      return (
	  <div>
	  <Nav />
        <div className="container">
        
        <div className="text-center">
        
          
          <h1> Welcome to your Dashboard </h1>
         
        </div>
		<C3Chart data={this.state.data}/>
		
        </div>
		</div>
      );
    }
  }
  
  export default Dashadmin;
  