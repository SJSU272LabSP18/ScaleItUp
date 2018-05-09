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
import signin_aditya from "./pages/signin_aditya";
import Image from "./Component/mainNavigation/image";
import Admin from "./Component/AdminPage/mainadmin";
import Retweet from "./Component/mainNavigation/retweet";
import Dashboard from "./Component/mainNavigation/dashboard";

import Dashadmin from "./Component/AdminPage/dashadmin";
import Viewedit from "./Component/AdminPage/viewedit";
import Upload from "./Component/AdminPage/upload";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/about" component={Contact}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/tweet" component={Tweet}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/image" component={Image}/>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/retweet" component={Retweet}/>

		      <Route exact path="/signin_aditya" component={signin_aditya}/>
          <Route exact path="/view" component={Viewedit}/>
          <Route exact path="/dashadmin" component={Dashadmin}/>
          <Route exact path="/upload" component={Upload}/>

        </div>
      </Router>
    );
  }
}

export default App;
