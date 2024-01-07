const RTCPEER_SERVER_CONFIG = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
};

const DATA_CHANNEL_NAME = "myDataChannel"

const DEBUG = true;

function debugLog(...a) {
    DEBUG && console.log(...a);
}

export class WebRTCClient{
    constructor(){
        this.connection = new RTCPeerConnection(RTCPEER_SERVER_CONFIG,
            {
                optional:[
                    {RtpDataChannels:true}
                ]
            }
        );

        // open data channel
        this.dataChannel = this.connection.createDataChannel('')

        this.connection.ondatachannel = (event) => {
            const channel = event.channel;
            channel.onmessage = (event) => {
                debugLog("Got message:", event.data);
                textareaPrint(`New message: ${event.data}`);
            }
            
            channel.onopen = (event) => {
                debugLog("Data channel opened");
                dataChannel.send("hello world");
            };

            channel.onclose = (event) => {
                debugLog("Data channel closed");
            };

            channel.onerror = (error) => { 
                debugLog("Error:", error); 
            };
        }
    }
}