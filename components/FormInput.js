import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from '../assets/colours.json';

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
    <View style={styles.inputContainer}>
      <Input
        {...rest}
        inputStyle={{color: colours.white}}
        leftIcon={<Ionicons name={iconName} size={28} color={colours.white} />}
        leftIconContainerStyle={styles.iconStyle}
        placeholderTextColor={colours.spotLightGrey}
        name={name}
        placeholder={placeholder}
      />
    </View>
  );

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15
  },
  iconStyle: {
    marginRight: 10
  }
});

export default FormInput;
