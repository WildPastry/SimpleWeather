import React from 'react';
import { StyleSheet, AppRegistry, Text, View, Button, Alert } from 'react-native';
// import { AppRegistry, Image } from 'react-native';
// import SvgUri from 'react-native-svg-uri';

// <SvgUri source={require('./assets/sleet.svg')} />

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.heading}>BASIC WEATHER</Text>
				<MyButton />
			</View>
		);
	}
}

class MyButton extends React.Component {
	_onPressButton() {
    Alert.alert('You will receive the weather')
  }
	render() {
		return (
			<View style={styles.button}>
				<Button 
					onPress={this._onPressButton}
					title='Get the weather'
				/>
			</View>
		);
	}
}

AppRegistry.registerComponent('basic-weather', () => ButtonBasics);

// export default class Bananas extends React.Component {
//   render() {
//     let pic = {
//       uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
//     };
//     return (
//       <Image source={pic} style={{width: 193, height: 110}}/>
//     );
//   }
// }

// AppRegistry.registerComponent('AwesomeProject', () => Bananas);

// class WeatherIcon extends React.Component {
// 	render() {
// 		let pic = {
// 			uri: '/assets/sleet.svg',
// 		};
// 		return <Image source={pic} style={{ width: 193, height: 110 }} />;
// 	}
// }

// AppRegistry.registerComponent('basic-weather', () => WeatherIcon);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#114180',
		alignItems: 'center',
		justifyContent: 'center',
	},
	heading: {
		color: '#fff',
		fontSize: 50,
		fontWeight: '900',
		textAlign: 'center',
	},
	button: {
		color: '#114180',
		backgroundColor: '#fff',
		borderRadius: 15,
		padding: 5,
		marginTop: 20,
		borderWidth: 10,
    borderColor: '#114180',
	},
	buttonBorder: {
		borderWidth: 1,
    borderColor: '#114180',
	}
});
