import React from "react";
import {
  StyleSheet,
  AppRegistry,
  Text,
  View,
  Button,
  Alert
} from "react-native";
import configData from "./data/config.json";

const key = configData.OAUTH;
// import { AppRegistry, Image } from 'react-native';
// import SvgUri from 'react-native-svg-uri';

// <SvgUri source={require('./assets/sleet.svg')} />
// constructor(props) {
// 	super(props);
// 	this.state = {
// 		loading: true,
// 		dataSource:[]
// 	 };
//  }

console.log("console connected...");

// fetch('https://my.api.mockaroo.com/general_person.json?key=KEY')
// 	.then(res => res.json())
// 	.then(json => {
// 		var items = json;
// 		// this.setState({
// 		// 	isLoaded: true,
// 		// 	items: json,
// 		// });
// 		console.log(items);
// 	});

// fetch('https://KEY://api.darksky.net/forecast/?units=si')
// 	.then(res => res.json())
// 	.then(json => {
// 		var weatherData = json;
// 		// this.setState({
// 		// 	isLoaded: true,
// 		// 	weatherData: json,
// 		// });
// 		console.log(weatherData);
// 	});

// var responseJson;

// function getMoviesFromApiAsync() {
//   return fetch('https://facebook.github.io/react-native/movies.json')
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return responseJson.movies;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
// getMoviesFromApiAsync();
// console.log(responseJson);

// function getskyData() {
//   return fetch('https://cors-anywhere.herokuapp.com/KEYhttps://api.darksky.net/forecast/?units=si')
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return responseJson.skyData;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// getskyData();
// console.log(responseJson.skyData);

// var skyData = fetch(
// 	'https://cors-anywhere.herokuapp.com/KEYhttps://api.darksky.net/forecast/?units=si'
// );
// console.log(skyData);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      isLoaded: false
    };
    console.log(this.state);
  }
  componentDidMount() {
    fetch("https://my.api.mockaroo.com/general_person.json?key=" + key)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  // constructor(props) {
  // 	super(props);
  // 	this.state = {
  // 		item: [],
  // 		isLoaded: false,
  // 	};
  // 	console.log(this.state.item);
  // 	console.log(items);
  // }
  render() {
    var { isLoaded, items } = this.state;
    console.log(items);
    if (!isLoaded) {
      return (
        <View style={styles.loader}>
          <Text style={styles.headingLoader}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>BASIC WEATHER</Text>
          <MyButton />
        </View>
      );
    }
  }
}

class MyButton extends React.Component {
  _onPressButton() {
    Alert.alert("You will receive the weather");
  }
  render() {
    return (
      <View style={styles.button}>
        <Button onPress={this._onPressButton} title="Get the weather" />
      </View>
    );
  }
}

AppRegistry.registerComponent("basic-weather", () => ButtonBasics);

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
  loader: {
    flex: 1,
    backgroundColor: "#303030",
    alignItems: "center",
    justifyContent: "center"
  },
  headingLoader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#114180",
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "900",
    textAlign: "center"
  },
  button: {
    color: "#114180",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    marginTop: 20
    // borderWidth: 10,
    // borderColor: '#114180',
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: "#114180"
  }
});
