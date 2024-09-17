/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import VideoCall from './src/videocall'; // Path to the component

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <VideoCall />
    </SafeAreaView>
  );
};

export default App;
