// imports
import React, { Component, Fragment } from 'react'
import { Text, TouchableOpacity, SafeAreaView, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'
import colours from '../assets/colours.json';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
})

// START ForgotPassword
class ForgotPassword extends Component {
  handlePasswordReset = async (values, actions) => {
    const { email } = values

    try {
      await this.props.firebase.passwordReset(email)
      console.log('Password reset email sent successfully')
      this.props.navigation.navigate('Login')
    } catch (error) {
      actions.setFieldError('general', error.message)
    }
  }

  goToSignup = () => this.props.navigation.navigate('Login');

  // START render ForgotPassword
  render() {
    console.log('Inside render from ForgotPassword...');
    return (
      <SafeAreaView style={forgotPasswordStyles.container}>
          <Text style={forgotPasswordStyles.text}>Reset Password</Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions)
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
                <View style={forgotPasswordStyles.buttonContainer}>
                  <FormButton
                    onPress={handleSubmit}
                    title='SEND EMAIL'
                    disabled={!isValid || isSubmitting} />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </Fragment>
            )}
        </Formik>
        <TouchableOpacity
          style={forgotPasswordStyles.link}
          onPress={this.goToSignup}>
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
    )
  }
  // END render ForgotPassword
}
// END ForgotPassword

// style
const forgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.simpleWeather,
    justifyContent: 'center'
  },
  link: {
    alignItems: 'center',
    margin: 8
  },
  text: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 18,
    marginLeft: 25
  },
  buttonContainer: {
    margin: 25,
    marginBottom: 10,
    marginTop: 10
  }
})

export default withFirebaseHOC(ForgotPassword);
