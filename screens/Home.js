import React, { Component } from 'react'
import { withFirebaseHOC } from '../config/Firebase'
import App from './../App'

class Home extends Component {
  render() {
    return (
      <App />
    )
  }
}

export default withFirebaseHOC(Home);
