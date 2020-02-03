// imports
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';

const AuthNavigation = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        header: null
      }
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: 'Login'
  }
)

export default AuthNavigation;
