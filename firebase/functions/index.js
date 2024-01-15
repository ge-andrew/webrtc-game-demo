/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getDatabase, ref, set} = require("firebase-admin/database")


initializeApp();
const db = getDatabase();
const ref = db.ref('webrtc');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  response.send("Hello from Firebase!");

  // const postData = request.body;
  // logger.info(postData)
	// ref.once('value', data => {
	// 	console.log(data.val());
	// })

	// get(db.ref('webrtc'), e => {
	// 	logger.info(e)
	// })

	set(ref(db, 'webrtc/'))
});
