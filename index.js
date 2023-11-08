import { registerRootComponent } from 'expo';

import routes from './src/routes';
import Home from './src/screens/Home';
import addRoom from './src/screens/addRoom';
import loginPage from './src/screens/loginPage';
import RegisterPage from './src/screens/RegisterPage';
import EventPage from './src/screens/EventPage'
import RoomList from './src/screens/RoomList';
import UserList from './src/screens/UserList';
import Room from './src/screens/Room';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(routes);
//registerRootComponent(home);
