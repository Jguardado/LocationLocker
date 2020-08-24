import React, { Component } from 'react';
import logo from './logo.svg';
import AddressForm from './AddressForm'
import SignInBtn from "./SignIn"
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false
    }

    this._handleLogin = this._handleLogin.bind(this)
  }

  _handleLogin(options) {
    const { isLoggedIn, accessToken } = options
    if (isLoggedIn) {
      this.setState({ signedIn: isLoggedIn, accessToken })
    }

    if (accessToken) {
      let last6 = accessToken.substr(-6)
      this.setState({
        userId: last6
      })
    }
  }

  _handleAddressSubmission() {
    // const {} = this.state


  }

  render() {
    console.log(this.state)
    return (
      <div className="App" >
        <header className="App-header">
          <h1>Location Locker</h1>
          <SignInBtn handleLogin={this._handleLogin} />
          {this.state.signedIn ? <AddressForm userId={this.state.userId} /> : null}
        </header>
      </div>
    );
  }

}

export default App;
