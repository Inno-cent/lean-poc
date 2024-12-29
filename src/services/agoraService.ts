import React from 'react';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  ChannelProfile,
  ClientRole,
  ChannelMediaOptions,
} from 'react-native-agora';
import { RtcEngineEvents } from 'react-native-agora/lib/typescript/common/RtcEvents';

class AgoraService {
  private static engine: RtcEngine | null = null;

  static getEngine(): RtcEngine | null {
    return this.engine;
  }

  static async initialize(appId: string, channelProfile: ChannelProfile): Promise<void> {
    if (!this.engine) {
      this.engine = await RtcEngine.create(appId);
    }
    await this.engine.setChannelProfile(channelProfile);
  }

  static async release(): Promise<void> {
    if (this.engine) {
      await this.engine.destroy();
      this.engine = null;
    }
  }

  static addListener<EventType extends keyof RtcEngineEvents>(
    eventType: EventType,
    listener: RtcEngineEvents[EventType],
  ): void {
    this.engine?.addListener(eventType, listener);
  }

  static async setClientRole(role: ClientRole): Promise<void> {
    await this.engine?.setClientRole(role);
  }

  static async enableVideo(): Promise<void> {
    await this.engine?.enableVideo();
  }

  static async joinChannel({
    token,
    channelName,
    optionalUid,
    options,
  }: {
    token?: string;
    channelName: string;
    optionalUid?: number;
    options?: ChannelMediaOptions;
  }): Promise<void> {
    await this.engine?.joinChannel(token || '', channelName, null, optionalUid || 0, options);
  }

  static async leaveChannel(): Promise<void> {
    await this.engine?.leaveChannel();
  }

  static async toggleLocalAudio(isMuted: boolean): Promise<void> {
    await this.engine?.muteLocalAudioStream(isMuted);
  }

  static async toggleLocalVideo(isMuted: boolean): Promise<void> {
    await this.engine?.muteLocalVideoStream(isMuted);
  }

  static async switchCamera(): Promise<void> {
    await this.engine?.switchCamera();
  }
}

export default AgoraService;
