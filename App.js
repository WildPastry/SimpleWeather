// imports
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

// set up auth keys for data
const key = configData.OAUTH;
const sky = configData.SKY;

// log keys
console.log(key);
console.log(sky);

// set up lat and lng
var myLat = -41.2865;
var myLng = 174.7762;

// log lat and lng
console.log(myLat);
console.log(myLng);

// default class app
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      isLoaded: false
    };
    // log the items in the state
    console.log(this.state.weather);
    console.log(this.state.isLoaded);
  }
  componentDidMount() {
    // fetch data
    fetch(
      "https://api.darksky.net/forecast/" +
        sky +
        "/" +
        myLat +
        "," +
        myLng +
        "?units=si"
    )
      // log response error or success
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed with HTTP code " + res.status);
        } else {
          console.log("Success with HTTP code " + res.status);
        }
        return res;
      })
      // convert data into json
      .then(result => result.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          weather: data.currently
        });
        // console.log(this.state.weather.currently);
      })
      // catch and log any other errors
      .catch(error => {
        if (error.res) {
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("error ", error.message);
        }
        console.log(error.config);
      });
  }

  render() {
    var { isLoaded, weather } = this.state;
    // console.log(this.state);
    console.log(isLoaded);
    console.log(weather.temperature);
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
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: "#114180"
  }
});
