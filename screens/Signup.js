// imports
import React, { Component, Fragment } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView
} from 'react-native';
import Conditions from '../screens/Conditions';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import { withFirebaseHOC } from '../config/Firebase';
import colours from '../assets/colours.json';

// firebase
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const validationSchema = Yup.object().shape({
	name: Yup.string().label('Name').required().min(3, 'Must have at least 3 characters'),
	email: Yup.string()
		.label('Email')
		.email('Enter a valid email')
		.required('Please enter a registered email'),
	password: Yup.string()
		.label('Password')
		.required()
		.min(6, 'Password should be at least 6 characters '),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
		.required('Confirm Password is required'),
	check: Yup.boolean().oneOf([true], 'Please check the agreement')
});

// START Signup
class Signup extends Component {
	state = {
		passwordVisibility: true,
		confirmPasswordVisibility: true,
		passwordIcon: 'eye',
		confirmPasswordIcon: 'eye'
	};

	// navigation function
	goToLogin = () => this.props.navigation.navigate('Login');

	// hide password function
	handlePasswordVisibility = () => {
		this.setState((prevState) => ({
			passwordIcon: prevState.passwordIcon === 'eye' ? 'eye-off' : 'eye',
			passwordVisibility: !prevState.passwordVisibility
		}));
	};

	// confirm password function
	handleConfirmPasswordVisibility = () => {
		this.setState((prevState) => ({
			confirmPasswordIcon:
				prevState.confirmPasswordIcon === 'eye' ? 'eye-off' : 'eye',
			confirmPasswordVisibility: !prevState.confirmPasswordVisibility
		}));
	};

	// sign up function
	handleOnSignup = async (values, actions) => {
		const { name, email, password } = values;
		try {
			const response = await this.props.firebase.signupWithEmail(email, password);
			if (response.user.uid) {
				const { uid } = response.user;
				const userData = { email, name, uid };
				await this.props.firebase
					.createNewUser(userData)
					.then(function () {
						var user = firebase.auth().currentUser;
						user
							.sendEmailVerification()
							.then(function () {
								console.log('Success in sending email');
							})
							.catch(function (error) {
								console.log(error);
							});
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		} catch (error) {
			console.log(error);
			actions.setFieldError('general', error.message);
		} finally {
			actions.setSubmitting(false);
		}
	};

	// START render Signup
	render() {
		const {
			passwordVisibility,
			confirmPasswordVisibility,
			passwordIcon,
			confirmPasswordIcon
		} = this.state;
		return (
			<View style={signupStyles.container}>
				<KeyboardAvoidingView
					enabled
					behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
					<ScrollView>
						<Formik
							initialValues={{
								name: '',
								email: '',
								password: '',
								confirmPassword: '',
								check: false
							}}
							onSubmit={(values, actions) => {
								this.handleOnSignup(values, actions);
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
								isSubmitting,
								setFieldValue
							}) => (
								<Fragment>
									{/* enter name */}
									<View style={{ height: 90 }}>
										<FormInput
											name='name'
											value={values.name}
											onChangeText={handleChange('name')}
											placeholder='Enter name'
											iconName='md-person'
											iconColor={colours.white}
											onBlur={handleBlur('name')}
										/>
										<View style={{ position: 'absolute', top: 75 }}>
											<ErrorMessage errorValue={touched.name && errors.name} />
										</View>
									</View>
									{/* enter email */}
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
									{/* enter password */}
									<View style={{ height: 90 }}>
										<FormInput
											name='password'
											value={values.password}
											onChangeText={handleChange('password')}
											placeholder='Enter password'
											iconName='lock-closed-outline'
											iconColor={colours.white}
											onBlur={handleBlur('password')}
											secureTextEntry={passwordVisibility}
											rightIcon={
												<TouchableOpacity onPress={this.handlePasswordVisibility}>
													<Ionicons
														name={passwordIcon}
														size={28}
														color={colours.spotGrey}
													/>
												</TouchableOpacity>
											}
										/>
										<View style={{ position: 'absolute', top: 75 }}>
											<ErrorMessage errorValue={touched.password && errors.password} />
										</View>
									</View>
									{/* confirm password */}
									<View style={{ height: 90 }}>
										<FormInput
											name='password'
											value={values.confirmPassword}
											onChangeText={handleChange('confirmPassword')}
											placeholder='Confirm password'
											iconName='lock-closed-outline'
											iconColor={colours.white}
											onBlur={handleBlur('confirmPassword')}
											secureTextEntry={confirmPasswordVisibility}
											rightIcon={
												<TouchableOpacity onPress={this.handleConfirmPasswordVisibility}>
													<Ionicons
														name={confirmPasswordIcon}
														size={28}
														color={colours.spotGrey}
													/>
												</TouchableOpacity>
											}
										/>
										<View style={{ position: 'absolute', top: 75 }}>
											<ErrorMessage
												errorValue={touched.confirmPassword && errors.confirmPassword}
											/>
										</View>
									</View>
									{/* checkbox */}
									<CheckBox
										center={true}
										containerStyle={signupStyles.checkBoxContainer}
										checkedIcon='check-box'
										iconType='material'
										uncheckedIcon='check-box-outline-blank'
										checkedColor={colours.spotGreen}
										title='Agree to terms and conditions'
										checkedTitle='You agreed to our terms and conditions'
										checked={values.check}
										textStyle={{
											color: colours.spotGrey,
											fontWeight: 'normal',
											fontSize: 16
										}}
										onPress={() => setFieldValue('check', !values.check)}
									/>
									{/* read */}
									<Conditions />
									{/* signup button */}
									<View style={signupStyles.buttonContainer}>
										<FormButton
											onPress={handleSubmit}
											title='SIGNUP'
											disabled={!isValid || isSubmitting}
											loading={isSubmitting}
										/>
									</View>
									<ErrorMessage errorValue={errors.general} />
								</Fragment>
							)}
						</Formik>
						<TouchableOpacity style={signupStyles.link} onPress={this.goToLogin}>
							<Text
								style={{
									color: colours.spotYellow,
									fontFamily: 'allerLt',
									fontSize: 18
								}}>
								Have an account? Login
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		);
	}
	// END render Signup
}
// END Signup

// style
const signupStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colours.simpleWeather,
		justifyContent: 'center'
	},
	link: {
		alignItems: 'center',
		marginBottom: 8
	},
	buttonContainer: {
		margin: 25,
		marginBottom: 10,
		marginTop: 35
	},
	checkBoxContainer: {
		backgroundColor: colours.simpleWeather,
		borderColor: colours.simpleWeather
	}
});

export default withFirebaseHOC(Signup);
