// imports
import React from 'react';

// default component functions
import { Image, Text, SafeAreaView, ScrollView, View } from 'react-native';

// weather icons
import WindSpeed from './../assets/weather/windSpeed.png';
import Humidity from './../assets/weather/humidity.png';

// accordian
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native';

// colours
import colours from './../assets/colours.json';

// icons
import weatherIcons from './../assets/icons.json';

// moment set up
var moment = require('moment');

// stylesheet
var styles = require('../styles.js');

// var pilots = [
//   {
//     id: 2,
//     name: "Wedge Antilles",
//     faction: "Rebels",
//   },
//   {
//     id: 8,
//     name: "Ciena Ree",
//     faction: "Empire",
//   },
//   {
//     id: 40,
//     name: "Iden Versio",
//     faction: "Empire",
//   },
//   {
//     id: 66,
//     name: "Thane Kyrell",
//     faction: "Rebels",
//   }
// ];

// const rebels = pilots.filter(pilot => pilot.faction === "Rebels");

// console.log(rebels);
// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(arr);

// for( var i = 0; i < arr.length; i++){
//    if ( arr[i] === 5) {
//      arr.splice(i, 1);
//      i--;
//    }
// }
// arr.splice(5, 1);
// console.log(arr);
// arr.splice(4, 1);
// console.log(arr);

// console.log(this.props.weather[2]);
// console.log(this.props.weather[10]);
// console.log(this.props.weather[18]);
// console.log(this.props.weather[26]);
// console.log(this.props.weather[34]);

// const nums = [1, 2, 3, 4, 5, 6];
// const remove = [1, 2, 4, 6];

// function removeFromArray(original, remove) {
//   return original.filter(value => !remove.includes(value));
// }

// console.log(removeFromArray(nums, remove));

// checkTime(age); {
//   return age >= 18;
// }

// myFunction(); {
//   this.props.weather.filter(checkTime);
// }

// START week
class Week extends React.Component {
  // START week render
  render() {
    // console.log(this.props.weather[0].dt_txt);
    console.log(this.props.weather[9].dt_txt);
    console.log(this.props.weather[17].dt_txt);
    console.log(this.props.weather[25].dt_txt);
    console.log(this.props.weather[33].dt_txt);
    console.log(this.props.weather[39].dt_txt);

    // set up colour bg variables
    var colourBg = this.props.weekBg;
    var colourBarBg = this.props.weekBarBg;

    // set current weather icon based on weather
    return (
      <View
        style={{
          alignSelf: 'stretch',
          backgroundColor: colourBg,
          flex: 4,
          justifyContent: 'center',
          marginTop: 8
        }}>
        <ScrollView>
          {/* weekly weather heading and description */}
          <Text style={styles.weekHeading}>5 Day forecast</Text>
          <View>
            {/* START map */}
            {this.props.weather.slice(1).map((dailyWeather) => {
              // set up date VARIABLES
              var today = moment.unix(dailyWeather.dt);
              var day = moment(today).format('ddd');

              return (
                // START week display
                <View key={dailyWeather.dt}>
                  <Collapse
                    style={{
                      backgroundColor: colourBarBg,
                      marginTop: 3,
                      marginBottom: 3,
                      padding: 10
                    }}>
                    {/* collapse header */}
                    <CollapseHeader>
                      <View style={styles.weekIconTempWrap}>
                        {/* day */}
                        <View style={styles.weekColWrap}>
                          <Text style={styles.weekText}>{day}</Text>
                        </View>
                        {/* daily icon */}
                        <View style={styles.weekColWrap}>
                          <Text
                            style={{
                              fontFamily: 'weatherFont',
                              fontSize: 30,
                              textAlign: 'center',
                              color: colours.snow
                            }}>
                            {weatherIcons[dailyWeather.weather[0].id].code}
                          </Text>
                        </View>
                        {/* daily low temp */}
                        <View style={styles.weekColWrap}>
                          <Text style={styles.weekLowTemp}>
                            {Math.round(dailyWeather.main.temp_min)}°
                          </Text>
                        </View>
                        {/* daily high temp */}
                        <View style={styles.weekColWrap}>
                          <Text style={styles.weekHighTemp}>
                            {Math.round(dailyWeather.main.temp_max)}°
                          </Text>
                        </View>
                      </View>
                    </CollapseHeader>

                    {/* collapse body */}
                    <CollapseBody>
                      {/* START description */}
                      <Text style={styles.currentDesc}>
                        {dailyWeather.dt_txt.substring(11, 16)}
                        {'  '}/{'  '}
                        {dailyWeather.weather[0].description}
                      </Text>
                      {/* END description */}

                      {/* START wind and humidity */}
                      <View style={styles.currentWindHumWrap}>
                        {/* START wind speed */}
                        <View style={styles.currentWindWrap}>
                          <Image
                            style={styles.currentIconSmall}
                            source={WindSpeed}
                            resizeMode='contain'
                          />
                          <Text style={styles.currentDetails}>
                            {'  '}
                            {Math.round(dailyWeather.wind.speed)} km/h
                          </Text>
                        </View>
                        {/* END wind speed */}

                        {/* START humidity */}
                        <View style={styles.currentHumWrap}>
                          <Image
                            style={styles.currentIconSmall}
                            source={Humidity}
                            resizeMode='contain'
                          />
                          <Text style={styles.currentDetails}>
                            {'  '}
                            {dailyWeather.main.humidity}%
                          </Text>
                        </View>
                        {/* END humidity */}
                      </View>
                      {/* END wind and humidity */}
                    </CollapseBody>
                  </Collapse>
                </View>
                // END week display
              );
            })}
            {/* END map */}
          </View>
        </ScrollView>
      </View>
    );
  }
  // END week render
}
// END week

export default Week;
