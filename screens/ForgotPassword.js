// imports
import React, { Component } from 'react';
import { Text, TouchableOpacity, SafeAreaView, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import { withFirebaseHOC } from '../config/Firebase';
import colours from '../assets/colours.json';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.label('Email')
		.email('Enter a valid email')
		.required('Please enter a registered email')
});

// START ForgotPassword
class ForgotPassword extends Component {
	// password reset function
	handlePasswordReset = async (values, actions) => {
		const { email } = values;
		try {
			await this.props.firebase.passwordReset(email);
			this.props.navigation.navigate('Login');
		} catch (error) {
			actions.setFieldError('general', error.message);
		}
	};

	// navigation function
	goToSignup = () => this.props.navigation.navigate('Login');

	// START render ForgotPassword
	render() {
		return (
			<SafeAreaView style={forgotPasswordStyles.container}>
				<Formik
					initialValues={{ email: '' }}
					onSubmit={(values, actions) => {
						this.handlePasswordReset(values, actions);
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
							<View style={forgotPasswordStyles.buttonContainer}>
								<FormButton
									onPress={handleSubmit}
									title='SEND EMAIL'
									disabled={!isValid || isSubmitting}
								/>
							</View>
							<ErrorMessage errorValue={errors.general} />
						</>
					)}
				</Formik>
				<TouchableOpacity style={forgotPasswordStyles.link} onPress={this.goToSignup}>
					<Text
						style={{
							color: colours.spotYellow,
							fontFamily: 'allerLt',
							fontSize: 18
						}}>
						Back to login
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
	// END render ForgotPassword
}
// END ForgotPassword

// style
const forgotPasswordStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colours.spotGreyMed,
		justifyContent: 'center'
	},
	link: {
		alignItems: 'center',
		margin: 8
	},
	buttonContainer: {
		margin: 25,
		marginBottom: 10,
		marginTop: 20
	}
});

export default withFirebaseHOC(ForgotPassword);
