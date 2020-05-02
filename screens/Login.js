// imports
import React, { Component, Fragment } from 'react';
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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
})

// START Login
class Login extends Component {
  state = {
    passwordVisibility: true,
    rightIcon: 'ios-eye'
  }

  goToSignup = () => this.props.navigation.navigate('Signup');
  goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword');
  goToApp = () => this.props.navigation.navigate('App');

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }));
  }

  handleOnLogin = async (values, actions) => {
    const { email, password } = values
    try {
      const response = await this.props.firebase.loginWithEmail(email, password);

      if (response.user) {
        this.props.navigation.navigate('App');
      }
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  }

  // START render Login
  render() {
    console.log('Inside render from Login.js...');
    const { passwordVisibility, rightIcon } = this.state
    return (
      <SafeAreaView style={loginStyles.container}>
        {/* <AppLogo /> */}
        <Text
          style={loginStyles.simpleWeather}>
          SIMPLE WEATHER
        </Text>
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
              <Fragment>
                <FormInput
                  name='email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder='Enter email'
                  autoCapitalize='none'
                  iconName='ios-mail'
                  iconColor={colours.white}
                  onBlur={handleBlur('email')} />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <FormInput
                  name='password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder='Enter password'
                  secureTextEntry={passwordVisibility}
                  iconName='ios-lock'
                  iconColor={colours.white}
                  onBlur={handleBlur('password')}
                  rightIcon={
                    <TouchableOpacity onPress={this.handlePasswordVisibility}>
                      <Ionicons name={rightIcon} size={28} color='grey' />
                    </TouchableOpacity>} />
                <ErrorMessage errorValue={touched.password && errors.password} />
                <View style={loginStyles.buttonContainer}>
                  <FormButton
                    onPress={handleSubmit}
                    title='LOGIN'
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting} />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </Fragment>
            )}
        </Formik>
        <TouchableOpacity
          style={loginStyles.link}
          onPress={this.goToApp}>
          <Text
            style={{
              color: colours.white,
              fontFamily: 'allerLt',
              fontSize: 18
            }}>
            Skip this step
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={loginStyles.link}
          onPress={this.goToSignup}>
          <Text
            style={{
              color: colours.spotBlue,
              fontFamily: 'allerLt',
              fontSize: 18
            }}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={loginStyles.link}
          onPress={this.goToForgotPassword}>
          <Text
            style={{
              color: colours.spotYellow,
              fontFamily: 'allerLt',
              fontSize: 18
            }}>
            Forgotton password?
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
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
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25,
    marginBottom: 10,
    marginTop: 10
  },
  simpleWeather: {
    color: colours.white,
    fontSize: 22,
    fontFamily: 'allerDisplay',
    textAlign: 'center',
    paddingTop: 4,
    paddingBottom: 30
  }
})

export default withFirebaseHOC(Login);
