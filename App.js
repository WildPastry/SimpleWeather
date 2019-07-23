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
const sky = configData.SKY;

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
      isLoaded: false,
      weather: [],
      temp: "",
      desc: ""
    };
    // log the items in the state
    console.log(this.state.weather);
    console.log(this.state.isLoaded);
  }

  // component mounted
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
          weather: data.currently,
          temp: data.currently.temperature,
          desc: data.currently.summary
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

  // render app display
  render() {
    var { isLoaded, temp } = this.state;
    console.log(this.state);
    console.log(isLoaded);
    console.log(temp);

    // loading function
    if (!isLoaded) {
      return (
        <View style={styles.loader}>
          <Text style={styles.headingLoader}>Loading...</Text>
        </View>
      );

      // finish loading function
    } else {
      return (
        // container
        <View style={styles.container}>
          {/* heading */}
          <Text style={styles.heading}>BASIC WEATHER</Text>
          {/* button */}
          <MyButton />
          {/* info */}
          <MyInfo temp={this.state.temp} desc={this.state.desc} />
        </View>
      );
    }
  }
}

// button
class MyButton extends React.Component {

  getSkyData() {
    Alert.alert("The current temperature is: ");
  }

  // button function
  // _onPressButton() {
  //   this.getSkyData;
  //   // Alert.alert("The current temperature is: ");
  // }
  // render button display
  render() {
    return (
      <View style={styles.button}>
        <Button
          title="Get the weather"
          onPress={() => {
            this.getSkyData();
          }}
        />
      </View>
    );
  }
}

// info
class MyInfo extends React.Component {
  // render info display
  render() {
    return (
      <View style={styles.info}>
        <Text style={styles.text}>{this.props.temp}</Text>
        <Text style={styles.text}>{this.props.desc}</Text>
      </View>
    );
  }
}

// register app
AppRegistry.registerComponent("basic-weather", () => ButtonBasics);

// styles
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
  },
  info: {
    marginTop: 20
  },
  text: {
    color: "#fff",
    padding: 5,
    fontSize: 20,
    textAlign: "center"
  }
});
