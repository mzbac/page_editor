import React, { Component, PropTypes } from 'react';
import Firebase from 'firebase';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: '',
      pwd: '',
    }
  }

  onClick() {
    const ref = new Firebase("https://sizzling-torch-9797.firebaseio.com");
    ref.authWithPassword({
      email: this.state.userEmail,
      password: this.state.pwd
    }, function (error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData.uid);
        // this.props.history.pushState(null, `/`, { uid: authData.uid });
      }
    }.bind(this));
  }

  onRememberClick() {
    console.log('on remember clicked' + this.state);
  }

  emailHandleChange(event) {
    this.setState({ userEmail: event.target.value });
  }

  pwdHandleChange(event) {
    this.setState({ pwd: event.target.value });
  }

  render() {
    const {} = this.props;
    return (
      <div style={{ marginTop: 100 }} className="container" >
        <h2 className="form-signin-heading" >Please sign in</h2>
        <label htmlFor="inputEmail" className="sr-only" >Email address</label>
        <input type="email" value={this.state.userEmail} onChange={this.emailHandleChange} className="form-control"
               placeholder="Email address" required
               autofocus />
        <label htmlFor="inputPassword" className="sr-only" >Password</label>
        <input type="password" value={this.state.pwd} onChange={this.pwdHandleChange} className="form-control"
               placeholder="Password" required />
        <div className="checkbox" >
          <label>
            <input type="checkbox" value="remember-me" onClick={this.onRememberClick} /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-default btn-block" type="submit" onClick={this.onClick} >Sign in</button>
      </div>
    );
  }
}
Login.propTypes = {};
export default Login;
