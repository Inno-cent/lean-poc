/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, Text, View} from 'react-native';
import VideoCall from './src/videocall';
import VoiceCall from './src/voicecall';

const App = () => {
  const [activeCall, setActiveCall] = useState("");
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {!activeCall && (
          <>
            <TouchableOpacity onPress={() => setActiveCall('video')}>
              <Text>Start Video Call</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveCall('voice')}>
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
