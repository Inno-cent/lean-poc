declare module 'react-native-agora' {
    interface AgoraConfig {
      appId: string;
      channelProfile?: number;
      clientRole?: number;
      videoEncoderConfig?: any;
    }
  
    export class RtcEngine {
      static create(config: AgoraConfig): Promise<RtcEngine>;
      joinChannel(token: string, channelName: string, optionalInfo: any, optionalUid: number): Promise<void>;
      leaveChannel(): Promise<void>;
      destroy(): Promise<void>;
      enableVideo(): Promise<void>;
      disableVideo(): Promise<void>;
      setLocalRenderMode(renderMode: number, mirrorMode?: number): Promise<void>;
      setupLocalVideo(): Promise<void>;
    }
  
    const Agora: {
      RtcEngine: typeof RtcEngine;
    };
  
    export default Agora;
  }
  