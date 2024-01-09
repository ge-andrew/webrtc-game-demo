
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, child, get, set, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { firebaseConfig } from "./firebaseConfig.js";

export async function initialization(){
    initializeApp(firebaseConfig);
}

const db = getDatabase();

export async function writeOfferCandidatesObj(candidate){
    const id = generateRandomString(10);
    push(ref(db, 'webrtc/' + id + '/offerCandidates/'), candidate.toJSON()).catch(e=>{
        console.log(e);
    });
    return id;
}

export async function writeOfferObj(id = null, offerDescription){
    const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
    };
    set(ref(db, 'webrtc/' + id + '/'), {offer}).catch(e => {
        console.log(e);
    });
}

export async function writeAnswerCandidatesObj(id = null, candidate){
    push(ref(db, 'webrtc/' + id + '/answerCandidates'), candidate.toJSON()).catch((e) => {

    });
}

export async function writeAnswerObj(id = null, answerDescription){
    get(ref(db, 'webrtc/' + id)).then( async (snapshot) => {
        const answer = {
            sdp: answerDescription.sdp,
            type: answerDescription.type
        }
        set(ref(db, 'webrtc/' + id + '/answer'), answer);
    }).catch(e => {
        console.log("Error:", e);
    });
}

function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * charactersLength);
      var randomChar = characters.charAt(randomIndex);
      result += Math.random() < 0.5 ? randomChar.toUpperCase() : randomChar.toLowerCase();
    }
    return result;
}