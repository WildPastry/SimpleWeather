// imports
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import SelectLocation from '../screens/SelectLocation';
import { createStackNavigator } from 'react-navigation-stack';

// auth navigation (screens before logging in)
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
		SelectLocation: {
			screen: SelectLocation,
			navigationOptions: {
				header: null
			}
		},
		ForgotPassword: {
			screen: ForgotPassword,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: 'Login'
	}
);

export default AuthNavigation;
