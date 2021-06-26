// imports
import React from 'react';
import { Button } from 'react-native-elements';
import colours from '../assets/colours.json';

// main form button component
const FormButton = ({ title, buttonType, buttonColor, ...rest }) => (
	<Button
		{...rest}
		type='solid'
		title={title}
		buttonStyle={{ borderRadius: 20, backgroundColor: colours.spotGreen }}
		disabledStyle={{ borderRadius: 20, backgroundColor: colours.spotLightGrey }}
		titleStyle={{
			color: colours.white,
			fontSize: 18,
			fontFamily: 'allerRg',
			textAlign: 'center'
		}}
		loadingProps={{
			color: colours.spotGreyMed
		}}
	/>
);

export default FormButton;
