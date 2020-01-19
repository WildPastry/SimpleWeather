import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from './TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';

// import Colors from '../constants/Colors';

// configuration
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// home navigator
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);
// home navigator options
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  // icon style from icon component
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};
HomeStack.path = '';

// page 2 navigator
const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);
// page 2 navigator options
LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  // icon style from icon component
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
LinksStack.path = '';

// page 3 navigator
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);
// page 3 navigator options
SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  // icon style from icon component
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};
SettingsStack.path = '';

// create tab navigator function
const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
}, {
  // navigator options
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: Colors.greyGreen
    }
  }
});
tabNavigator.path = '';

// export
export default tabNavigator;
