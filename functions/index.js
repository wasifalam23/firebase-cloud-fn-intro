/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const axios = require('axios');
const functions = require('firebase-functions');

// HTTP functions
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello from firebase function...');
});

exports.api = functions.https.onRequest(async (req, res) => {
  switch (req.method) {
    case 'GET':
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users/1'
      );
      res.send(response.data);
      break;

    case 'POST':
      const body = req.body;
      res.send(body);
      break;

    case 'DELETE':
      res.send('It was a DELETE request');
      break;

    default:
      res.send('It was a default request');
      break;
  }
});

// Authentication
exports.userAdded = functions.auth.user().onCreate((user) => {
  console.log(`${user.email} is created ✅`);
  return Promise.resolve();
});

exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log(`${user.email} is deleted ✅`);
  return Promise.resolve();
});

// Firestore
exports.fruitAdded = functions.firestore
  .document('/fruits/{doucmentId}')
  .onCreate((snapshot, context) => {
    console.log(snapshot.data(), 'created ✅');
    return Promise.resolve();
  });

exports.fruitUpdated = functions.firestore
  .document('/fruits/{doucmentId}')
  .onUpdate((snapshot, context) => {
    console.log('Before ◀️', snapshot.before.data());
    console.log('After ▶️', snapshot.after.data());

    return Promise.resolve();
  });

exports.fruitDeleted = functions.firestore
  .document('/fruits/{doucmentId}')
  .onDelete((snapshot, context) => {
    console.log(snapshot.data(), 'deleted 🗑️');
    return Promise.resolve();
  });

// Scheduled Function
exports.scheduledFunction = functions.pubsub
  .schedule('* * * * *')
  .onRun((context) => {
    console.log('I am running/executing every minute...');
    return null;
  });
