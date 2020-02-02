import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import App from './../App'

class Home extends Component {
  // handleSignout = async () => {
  //   try {
  //     await this.props.firebase.signOut()
  //     this.props.navigation.navigate('Auth')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  render() {
    return (
      <App />
    )
  }
}

export default withFirebaseHOC(Home)
