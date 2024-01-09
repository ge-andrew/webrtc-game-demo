
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, child, get, set, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { firebaseConfig } from "./firebaseConfig.js";
import { generateRandomString } from "./lib/generateRandomString.js";
import { iceServerList } from "./lib/iceServerList.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();

var dataChannel;

var currentHostID = "";

function textareaPrint(s){
    document.getElementById("output").value += s + "\n";
}

const myConnection = new RTCPeerConnection(iceServerList, {
    optional: [
        {
            RtpDataChannels: true
        }
    ]
});

function openDataChannel() { 
     
    dataChannel = myConnection.createDataChannel("myDataChannel");
     
    dataChannel.addEventListener("error", (error) => { 
       console.log("Error:", error); 
    });
     

    myConnection.ondatachannel = (event) => {
        const channel = event.channel;

        channel.onmessage = (event) => {
            console.log("Got message:", event.data);
            textareaPrint(`New message: ${event.data}`);
        }
    }

    dataChannel.addEventListener("open", (event) => {
        console.log("Data channel opened");
        dataChannel.send("hello world");
    });

    dataChannel.addEventListener("close", (event) => {
        console.log("Data channel closed");
    });
}
openDataChannel();

function sendHello() {
    dataChannel.send("hello @" + Date());
}
document.getElementById("message").addEventListener("click", function(){
    console.log("sending message");
    sendHello();
}, false);



async function hostRoom() {
    const id = generateRandomString(10);
    currentHostID = id;
    console.log(id);
    textareaPrint(`Hosted session with ID: ${id}`)

    myConnection.onicecandidate = function (event) {
        console.log("found ice candidate",event.candidate);
        event.candidate && push(ref(db, 'webrtc/' + id + '/offerCandidates/'), event.candidate.toJSON());
    };
    // openDataChannel();
    

    console.log("creating offer");
    const offerDescription = await myConnection.createOffer();
    await myConnection.setLocalDescription(offerDescription);
    const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
    };
    console.log(offer);
    await set(ref(db, 'webrtc/' + id + '/'), {offer});

    onChildAdded(ref(db, 'webrtc/' + id), (snapshot) =>{
        const data = snapshot.val();
        if (!myConnection.currentRemoteDescription && data?.type == "answer"){
            console.log("observed answer update");
            console.log("creating remote session description");
            myConnection.setRemoteDescription(new RTCSessionDescription(data));
        }
    })

    onChildAdded(ref(db, 'webrtc/' + id + '/answerCandidates'), (snapshot) => {
        console.log("observed answerCandidate update:", snapshot.val());
        myConnection.addIceCandidate(new RTCIceCandidate(snapshot.val()));
    });
}
document.getElementById("host").onclick = hostRoom;


async function joinRoom(id) {
    if (id == ""){
        console.log('you must enter a string');
        return;
    }
    console.log("querying:", id)
    textareaPrint(`Joining session with ID: ${id}`)

    myConnection.onicecandidate = (event) => {
        event.candidate && push(ref(db, 'webrtc/' + id + '/answerCandidates'), event.candidate.toJSON());
    };
    // openDataChannel();

    await get(ref(db, 'webrtc/' + id)).then( async (snapshot) => {
        myConnection.setRemoteDescription(new RTCSessionDescription(snapshot.val().offer));
        
        const answerDescription = await myConnection.createAnswer();
        myConnection.setLocalDescription(answerDescription);
        const answer = {
            sdp: answerDescription.sdp,
            type: answerDescription.type
        }
        set(ref(db, 'webrtc/' + id + '/answer'), answer);
    }).catch(e => {
        console.log("Error:", e);
    });

    onChildAdded(ref(db, 'webrtc/' + id + '/offerCandidates'), (snapshot) => {
        console.log("observed offerCandidate update:", snapshot.val());
        myConnection.addIceCandidate(new RTCIceCandidate(snapshot.val()));
    });

}
document.getElementById("join").addEventListener("click", function(){
    const id = document.getElementById("input-id").value;
    joinRoom(id);
}, false);

