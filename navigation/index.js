// imports
import Initial from '../screens/Initial';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// create navigator
const SwitchNavigator = createSwitchNavigator({
	Initial: Initial,
	Auth: AuthNavigation,
	App: AppNavigation
});

// create appcontainer
const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
