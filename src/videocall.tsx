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
    channel: 'test',
    token: '007eJxTYOD9bNqU/eUO7xmBd7+qegtu3zZbfUkpsi/e2PVKjr6uQ7gCg0macapRUlJqskWqmYmJgWmigXlSSmqiaap5copZaqpB+M6naQ2BjAxXb9YyMTJAIIjPwlCSWlzCwAAAsNQhlw==',
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
