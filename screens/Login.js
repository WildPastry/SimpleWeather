/** @format */

// imports
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import AppLogo from '../components/AppLogo';
import { withFirebaseHOC } from '../config/Firebase';
import colours from '../assets/colours.json';

// set up validation messages
const validationSchema = Yup.object().shape({
	email: Yup.string()
		.label('Email')
		.email('Enter a valid email')
		.required('Please enter a registered email'),
	password: Yup.string()
		.label('Password')
		.required()
		.min(6, 'Password must have at least 6 characters ')
});

// START Login
class Login extends Component {
	state = {
		passwordVisibility: true,
		rightIcon: 'eye'
	};

	// navigation functions
	goToSignup = () => this.props.navigation.navigate('Signup');
	goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword');

	goToLocation = async () => {
		try {
			await this.props.firebase.signOut();
			this.props.navigation.navigate('SelectLocation');
		} catch (error) {
			console.log(error, 'ERROR');
		}
	};

	goToHome = (options) =>
		this.props.navigation.navigate('Home', {
			type: 'Navigate',
			routeName: 'Home',
			params: { options: options }
		});

	// password visibility function
	handlePasswordVisibility = () => {
		this.setState((prevState) => ({
			rightIcon: prevState.rightIcon === 'eye' ? 'eye-off' : 'eye',
			passwordVisibility: !prevState.passwordVisibility
		}));
	};

	// check if a user is logged in with firebase
	handleOnLogin = async (values, actions) => {
		var options = {
			googleName: 'Wellington, New Zealand',
			googleLat: '-41.2865',
			googleLng: '174.7762'
		};
		const { email, password } = values;
		try {
			const response = await this.props.firebase.loginWithEmail(email, password);
			if (response.user) {
				this.goToHome(options);
			}
		} catch (error) {
			actions.setFieldError('general', error.message);
		} finally {
			actions.setSubmitting(false);
		}
	};

	// START render Login
	render() {
		const { passwordVisibility, rightIcon } = this.state;
		return (
			<SafeAreaView style={loginStyles.container}>
				<HideWithKeyboard>
					<View style={loginStyles.logoContainer}>
						<AppLogo />
					</View>
					<Text style={loginStyles.simpleWeatherWrapper}>
						<Text style={loginStyles.simpleWeather}>SIMPLE </Text>
						<Text style={loginStyles.simpleWeatherBlue}>WEATHER</Text>
					</Text>
				</HideWithKeyboard>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={(values, actions) => {
						this.handleOnLogin(values, actions);
					}}
					validationSchema={validationSchema}>
					{({
						handleChange,
						values,
						handleSubmit,
						errors,
						isValid,
						touched,
						handleBlur,
						isSubmitting
					}) => (
						<>
							{/* email */}
							<View style={{ height: 90 }}>
								<FormInput
									name='email'
									value={values.email}
									onChangeText={handleChange('email')}
									placeholder='Enter email'
									autoCapitalize='none'
									iconName='mail-outline'
									iconColor={colours.white}
									onBlur={handleBlur('email')}
								/>
								<View style={{ position: 'absolute', top: 75 }}>
									<ErrorMessage errorValue={touched.email && errors.email} />
								</View>
							</View>
							{/* password */}
							<View style={{ height: 90 }}>
								<FormInput
									name='password'
									value={values.password}
									onChangeText={handleChange('password')}
									placeholder='Enter password'
									secureTextEntry={passwordVisibility}
									iconName='lock-closed-outline'
									iconColor={colours.white}
									onBlur={handleBlur('password')}
									rightIcon={
										<TouchableOpacity onPress={this.handlePasswordVisibility}>
											<Ionicons name={rightIcon} size={28} color='grey' />
										</TouchableOpacity>
									}
								/>
								<View style={{ position: 'absolute', top: 75 }}>
									<ErrorMessage errorValue={touched.password && errors.password} />
								</View>
							</View>
							{/* login button */}
							<View style={loginStyles.buttonContainer}>
								<FormButton
									onPress={handleSubmit}
									title='LOGIN'
									disabled={!isValid || isSubmitting}
									loading={isSubmitting}
								/>
							</View>
							<ErrorMessage errorValue={errors.general} />
						</>
					)}
				</Formik>
				<HideWithKeyboard>
					{/* skip this step */}
					<TouchableOpacity style={loginStyles.link} onPress={this.goToLocation}>
						<Text
							style={{
								color: colours.white,
								fontFamily: 'allerLt',
								fontSize: 18
							}}>
							Skip this step
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={loginStyles.link} onPress={this.goToSignup}>
						{/* sign up */}
						<Text
							style={{
								color: colours.spotBlue,
								fontFamily: 'allerLt',
								fontSize: 18
							}}>
							Don't have an account? Signup
						</Text>
					</TouchableOpacity>
				</HideWithKeyboard>
				<TouchableOpacity style={loginStyles.link} onPress={this.goToForgotPassword}>
					{/* forgot password */}
					<Text
						style={{
							color: colours.spotYellow,
							fontFamily: 'allerLt',
							fontSize: 18
						}}>
						Forgotten password?
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
	// END render Login
}
// END Login

// style
const loginStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colours.spotGreyMed,
		justifyContent: 'center'
	},
	link: {
		alignItems: 'center',
		margin: 8
	},
	logoContainer: {
		marginBottom: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		marginLeft: 25,
		marginRight: 25,
		marginBottom: 10,
		marginTop: 20
	},
	simpleWeatherWrapper: {
		fontSize: 22,
		textAlign: 'center',
		paddingTop: 4,
		paddingBottom: 30
	},
	simpleWeather: {
		color: colours.white,
		fontFamily: 'merriWeatherLt'
	},
	simpleWeatherBlue: {
		color: colours.spotBlue,
		fontFamily: 'merriWeatherBd'
	}
});

export default withFirebaseHOC(Login);
