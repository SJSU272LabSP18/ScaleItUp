import React, { Component } from 'react';
import Footer from '../Component/footerComponent/footer';
import Header from '../Component/headerComponent/header';
import TwitterLogin from 'react-twitter-auth';

const url = 'http://localhost:5000';
class Signin extends Component {
constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
}

onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };
  
  onFailed = (error) => {
    alert(error);
  }; 
  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };
render(){
    let content = !!this.state.isAuthenticated ?
    (
      <div>
        <p>Authenticated</p>
        <div>
          {this.state.user.email}
        </div>
        <div>
          <button onClick={this.logout} className="button" >
            Log out
          </button>
        </div>
      </div>
    ) :
    (
      <TwitterLogin loginUrl= 'https://api.twitter.com/oauth/authenticate'
                    onFailure={this.onFailed} onSuccess={this.onSuccess}
                    requestTokenUrl="http://localhost:5000/twitter/reverse"/>
    );
  return (
    <div className="Signin">
      <Header />
      {content}
      <Footer />
    </div>
  );
}
}
export default Signin;