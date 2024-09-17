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
     <View >
      {!activeCall && (
        <>
          <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => setActiveCall('video')}>
            <Text>Start Video Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => setActiveCall('voice')}>
            <Text>Start Voice Call</Text>
          </TouchableOpacity>
        </>
      )}
      
      {activeCall === 'video' && <VideoCall />}
      {activeCall === 'voice' && <VoiceCall />}
    </View>
    </SafeAreaView>
  );
};

export default App;
