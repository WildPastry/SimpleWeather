import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppRegistry, Image } from 'react-native';
// import SvgUri from 'react-native-svg-uri';

// <SvgUri source={require('./assets/sleet.svg')} />

// export default class App extends React.Component {
// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				<Text style={styles.heading}>BASIC WEATHER</Text>
// 				{/* <SvgUri /> */}
// 			</View>
// 		);
// 	}
// }

export default class Bananas extends React.Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 193, height: 110}}/>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => Bananas);

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
});
