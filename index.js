// imports
import { registerRootComponent } from 'expo';
import { useEffect } from 'react';

// register
import App from './App';
registerRootComponent(App);

const SimpleWeather = () => {
  // set status bar text colour
  StatusBar.setBarStyle('light-content', true);

  const isMountedRef = useRef(null);
  console.log('Index connected...');

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      console.log(isMountedRef.current);
    } else {
      console.log(isMountedRef.current);
    }

    return () => isMountedRef.current = false;
  });

  return <App />;
}

export default SimpleWeather;