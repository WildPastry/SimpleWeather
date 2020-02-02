import React, { Component } from 'react'
import { StyleSheet, Fragment } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import App from './../App'

class Home extends Component {
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <App>
        <Button
          title='Signout'
          onPress={this.handleSignout}
          titleStyle={{
            color: '#303030'
          }}
          type='clear'
        />
      </App>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6666',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default withFirebaseHOC(Home)
