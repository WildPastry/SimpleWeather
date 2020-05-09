import React from 'react';
import { Image } from 'react-native-elements';

const AppLogo = () => (
  <Image
    source={require('../assets/brand.png')}
    style={{ width: 80, height: 80 }}
  />
)

export default AppLogo
