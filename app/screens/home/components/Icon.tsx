/* eslint-disable max-len */
/* eslint-disable max-statements */
import { Dimensions, StyleSheet, View } from 'react-native';
import LottieView, { AnimationObject } from 'lottie-react-native';
import colours from '../../../assets/colours.json';

interface IIcon {
  id: number;
  night: boolean;
}

// Group 2xx: thunderstorm
const thunderStormRain = require('../../../assets/animations/weather/thunderStormRain.json');
const thunderStormRainNight = require('../../../assets/animations/weather/thunderStormRainNight.json');
const thunderStorm = require('../../../assets/animations/weather/thunderStorm.json');
const thunderStormNight = require('../../../assets/animations/weather/thunderStormNight.json');
// Group 3xx: drizzle
const lightDrizzle = require('../../../assets/animations/weather/lightDrizzle.json');
const lightDrizzleNight = require('../../../assets/animations/weather/lightDrizzleNight.json');
// Group 5xx: rain
const lightRain = require('../../../assets/animations/weather/lightRain.json');
const lightRainNight = require('../../../assets/animations/weather/lightRainNight.json');
const moderateRain = require('../../../assets/animations/weather/moderateRain.json');
const moderateRainNight = require('../../../assets/animations/weather/moderateRainNight.json');
const heavyRain = require('../../../assets/animations/weather/heavyRain.json');
const heavyRainNight = require('../../../assets/animations/weather/heavyRainNight.json');
// Group 6xx: snow
const snow = require('../../../assets/animations/weather/snow.json');
const snowNight = require('../../../assets/animations/weather/snowNight.json');
// Group 7xx: atmosphere
const mist = require('../../../assets/animations/weather/mist.json');
const mistNight = require('../../../assets/animations/weather/mistNight.json');
// Group 800: clear
const dayClear = require('../../../assets/animations/weather/dayClear.json');
const nightClear = require('../../../assets/animations/weather/nightClear.json');
// Group 80x: clouds
const fewClouds = require('../../../assets/animations/weather/fewClouds.json');
const fewCloudsNight = require('../../../assets/animations/weather/fewCloudsNight.json');
const brokenClouds = require('../../../assets/animations/weather/brokenClouds.json');
const brokenCloudsNight = require('../../../assets/animations/weather/brokenCloudsNight.json');
const scatteredClouds = require('../../../assets/animations/weather/scatteredClouds.json');
const scatteredCloudsNight = require('../../../assets/animations/weather/scatteredCloudsNight.json');
const overcastClouds = require('../../../assets/animations/weather/overcastClouds.json');
const overcastCloudsNight = require('../../../assets/animations/weather/overcastCloudsNight.json');

const Icon: React.FC<IIcon> = (props: IIcon): JSX.Element => {
  const { width } = Dimensions.get('window');

  let iconHeight: number, iconWidth: number;

  if (width < 300) {
    iconHeight = 190;
    iconWidth = 190;
  } else {
    iconHeight = 215;
    iconWidth = 215;
  }

  // Set up icon display
  let currentWeatherIcon:
    | string
    | AnimationObject
    | {
        uri: string;
      }
    | undefined;

  /*
   * Weather icon logic
   * Group 2xx: thunderstorm
   */
  if (props.id >= 200 && props.id <= 202 && props.night) {
    currentWeatherIcon = thunderStormRainNight;
  } else if (props.id >= 200 && props.id <= 202 && !props.night) {
    currentWeatherIcon = thunderStormRain;
  } else if (props.id >= 230 && props.id <= 232 && props.night) {
    currentWeatherIcon = thunderStormNight;
  } else if (props.id >= 230 && props.id <= 232 && !props.night) {
    currentWeatherIcon = thunderStorm;
  } else if (props.id >= 210 && props.id <= 221 && props.night) {
    currentWeatherIcon = thunderStormNight;
  } else if (props.id >= 210 && props.id <= 221 && !props.night) {
    currentWeatherIcon = thunderStorm;
  } else if (props.id === 200 && props.night) {
    currentWeatherIcon = lightRainNight;
  } else if (props.id === 201 && !props.night) {
    currentWeatherIcon = lightRain;
  } else if (props.id === 202 && props.night) {
    currentWeatherIcon = moderateRainNight;
  } else if (props.id === 230 && !props.night) {
    currentWeatherIcon = moderateRain;
  } else if (props.id === 230 && !props.night) {
    currentWeatherIcon = moderateRain;
  } else if (props.id === 230 && !props.night) {
    currentWeatherIcon = moderateRain;
  } else if (props.id === 230 && !props.night) {
    currentWeatherIcon = moderateRain;
  } else if (props.id === 230 && !props.night) {
    currentWeatherIcon = moderateRain;
  } else if (props.id === 230 && !props.night) {
    currentWeatherIcon = moderateRain;
  } else if (props.id === 230 && !props.night) {
    currentWeatherIcon = moderateRain;
    // Group 3xx: drizzle
  } else if (props.id >= 300 && props.id <= 321 && props.night) {
    currentWeatherIcon = lightDrizzleNight;
  } else if (props.id >= 300 && props.id <= 321 && !props.night) {
    currentWeatherIcon = lightDrizzle;
    // Group 5xx: rain
  } else if (props.id === 500 && props.night) {
    currentWeatherIcon = lightRainNight;
  } else if (props.id === 500 && !props.night) {
    currentWeatherIcon = lightRain;
  } else if (props.id === 501 && props.night) {
    currentWeatherIcon = moderateRainNight;
  } else if (props.id === 501 && !props.night) {
    currentWeatherIcon = moderateRain;
  } else if (props.id >= 502 && props.id <= 531 && props.night) {
    currentWeatherIcon = heavyRainNight;
  } else if (props.id >= 502 && props.id <= 531 && !props.night) {
    currentWeatherIcon = heavyRain;
    // Group 6xx: snow
  } else if (props.id >= 600 && props.id <= 622 && props.night) {
    currentWeatherIcon = snowNight;
  } else if (props.id >= 600 && props.id <= 622 && !props.night) {
    currentWeatherIcon = snow;
    // Group 7xx: atmosphere
  } else if (props.id >= 701 && props.id <= 781 && props.night) {
    currentWeatherIcon = mistNight;
  } else if (props.id >= 701 && props.id <= 781 && !props.night) {
    currentWeatherIcon = mist;
    // Group 80x: clouds
  } else if (props.id === 801 && props.night) {
    currentWeatherIcon = fewCloudsNight;
  } else if (props.id === 801 && !props.night) {
    currentWeatherIcon = fewClouds;
  } else if (props.id === 802 && props.night) {
    currentWeatherIcon = scatteredCloudsNight;
  } else if (props.id === 802 && !props.night) {
    currentWeatherIcon = scatteredClouds;
  } else if (props.id === 803 && props.night) {
    currentWeatherIcon = brokenCloudsNight;
  } else if (props.id === 803 && !props.night) {
    currentWeatherIcon = brokenClouds;
  } else if (props.id === 804 && props.night) {
    currentWeatherIcon = overcastCloudsNight;
  } else if (props.id === 804 && !props.night) {
    currentWeatherIcon = overcastClouds;
    // Group 800: clear
  } else if (props.id === 800 && props.night) {
    currentWeatherIcon = nightClear;
  } else {
    currentWeatherIcon = dayClear;
  }

  return (
    <View style={styles.container}>
      <LottieView
        style={{
          height: iconHeight,
          width: iconWidth
        }}
        ref={(animation) => {
          animation;
        }}
        source={currentWeatherIcon}
        autoPlay={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colours.thunderStormDark,
    paddingTop: 15
  }
});

export default Icon;
