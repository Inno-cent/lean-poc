/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import {SocketProvider} from './src/context/socketContext'; // Import the SocketProvider

// // Wrap the App component with the SocketProvider
// const AppWithProvider = () => (
//   <SocketProvider>
//     <App />
//   </SocketProvider>
// );

// AppRegistry.registerComponent(appName, () => AppWithProvider);
