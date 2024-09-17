import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text, View} from 'react-native';

const VoiceCall = () => {
  const [voiceCall, setVoiceCall] = useState(null);
  
  const connectionData = {
    appId: '4f3e2bbec8e64405a07bdea5e7cd6ee0',  
    channel: 'voiceChannel',
    token: 'YOUR_VOICE_TOKEN_HERE',
  };

  const rtcCallbacks = {
    EndCall: () => setVoiceCall(false),
  };

  const rtcProps = {
    enableVideo: false,  // Disable video for voice-only calls
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text onPress={() => setVoiceCall(true)}>Start Voice Call</Text>
      {/* {voiceCall ? (
        <AgoraUIKit 
          connectionData={connectionData} 
          rtcProps={rtcProps} 
          rtcCallbacks={rtcCallbacks} 
        />
      ) : (
        <Text onPress={() => setVoiceCall(true)}>Start Voice Call</Text>
      )} */}
    </View>
  );
};

export default VoiceCall;
