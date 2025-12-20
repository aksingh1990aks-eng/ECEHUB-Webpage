/* file: firebase-messaging-sw.js */
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// --- PASTE YOUR CONFIG FROM STEP 2 HERE ---
const firebaseConfig = {
 apiKey: "AIzaSyBvGooxizDQzONT9RIx-nmsDAaipDLWxlU",
  authDomain: "new-ece-38328.firebaseapp.com",
  projectId: "new-ece-38328",
  storageBucket: "new-ece-38328.firebasestorage.app",
  messagingSenderId: "837567633494",
  appId: "1:837567633494:web:6d199303090fc0320b43f7"                    // Replace with your actual appId
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// This runs when the browser receives a notification in the background
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: '/images/logo.png' // Optional: Change this to a path to your logo if you have one
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});