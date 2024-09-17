// import React, {useState} from 'react';
// import {View, Text} from 'react-native';
// import AgoraUIKit from 'agora-rn-uikit';
import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text, View} from 'react-native';

// import {AGORA_APP_ID} from '@env'; // Import Agora App ID from .env file
const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(null);
  const connectionData = {
    appId: '4f3e2bbec8e64405a07bdea5e7cd6ee0',
    channel: 'new-channel',
    token: '007eJxTYGBYyjhhhv9PFbFSPqOTgkZ1rLybfFxlZBm0n3rwsp1xlFFgMEkzTjVKSkpNtkg1MzExME00ME9KSU00TTVPTjFLTTXQm/wyrSGQkSFjSzYDIxSC+NwMeanluskZiXl5qTkMDABkzh04',
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };



  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text onPress={() => setVideoCall(true)}>Start Call</Text>
      {videoCall ? (
        <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
      ) : (
        <Text onPress={() => setVideoCall(true)}>Start Call</Text>
      )}
    </View>
  );
};

export default VideoCall;
