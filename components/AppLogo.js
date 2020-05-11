import React from 'react';
import { Image } from 'react-native-elements';

const AppLogo = () => (
  <Image
    source={require('../assets/brand.png')}
    style={{ width: 100, height: 100 }}
  />
);

export default AppLogo;
