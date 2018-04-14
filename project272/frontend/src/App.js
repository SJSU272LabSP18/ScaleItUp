import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Header from "./Component/headerComponent/header";
import Footer from "./Component/footerComponent/footer";
import Homepage from "./pages/homepage";
import Contact from "./pages/contact";
import Nav from "./Component/mainNavigation/mainnav";
import Tweet from "./Component/mainNavigation/tweet";
import Signin from "./pages/signin";
import Image from "./Component/mainNavigation/image";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/home" component={Nav}/>
          <Route exact path="/tweet" component={Tweet}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/image" component={Image}/>
        </div>
      </Router>
    );
  }
}

export default App;
