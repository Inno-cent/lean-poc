import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text, View} from 'react-native';

const VoiceCall = () => {
  const [voiceCall, setVoiceCall] = useState(true);
  
  const connectionData = {
    appId: '4f3e2bbec8e64405a07bdea5e7cd6ee0',  
    channel: 'new-channel',
    token: '007eJxTYGBYyjhhhv9PFbFSPqOTgkZ1rLybfFxlZBm0n3rwsp1xlFFgMEkzTjVKSkpNtkg1MzExME00ME9KSU00TTVPTjFLTTXQm/wyrSGQkSFjSzYDIxSC+NwMeanluskZiXl5qTkMDABkzh04',
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
      {voiceCall ? (
        <AgoraUIKit 
          connectionData={connectionData} 
          rtcProps={rtcProps} 
          rtcCallbacks={rtcCallbacks} 
        />
      ) : (
        <Text onPress={() => setVoiceCall(true)}>Start Voice Call</Text>
      )}
    </View>
  );
};

export default VoiceCall;
