import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ errorValue }) => (
  <View style={errorStyles.container}>
    <Text style={errorStyles.errorText}>{errorValue}</Text>
  </View>
)

const errorStyles = StyleSheet.create({
  container: {
    marginLeft: 25
  },
  errorText: {
    color: 'red'
  }
})

export default ErrorMessage
