
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyAThirM3igPr7FDi0Y-mt7Fw1L2oITZhm8",
    authDomain: "webrtc-game-test-1.firebaseapp.com",
    databaseURL: "https://webrtc-game-test-1-default-rtdb.firebaseio.com",
    projectId: "webrtc-game-test-1",
    storageBucket: "webrtc-game-test-1.appspot.com",
    messagingSenderId: "870730742692",
    appId: "1:870730742692:web:87efba047ec36e94971f31",
    measurementId: "G-KRX0W3PKYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dbRef = ref(getDatabase())

function hostRoom(){
    get(child(dbRef, `test`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

