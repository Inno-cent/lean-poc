// import React, {useState} from 'react';
// import {View, Text} from 'react-native';
// import AgoraUIKit from 'agora-rn-uikit';
import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text, View} from 'react-native';

import {AGORA_APP_ID,TOKEN} from '@env'; 



const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(false);
  const connectionData = {
    appId: AGORA_APP_ID,
    channel: 'new-channel',
    token: TOKEN,
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };



  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {/* <Text onPress={() => setVideoCall(true)}>Start Call</Text> */}
      {videoCall ? (
        <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
      ) : (
        <Text onPress={() => setVideoCall(true)}>Start Call</Text>
      )}
    </View>
  );
};

export default VideoCall;
