/* file: firebase-messaging-sw.js */
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBvGooxizDQzONT9RIx-nmsDAaipDLWxlU",
  authDomain: "new-ece-38328.firebaseapp.com",
  projectId: "new-ece-38328",
  storageBucket: "new-ece-38328.firebasestorage.app",
  messagingSenderId: "837567633494",
  appId: "1:837567633494:web:6d199303090fc0320b43f7"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    
    // --- CRITICAL FOR ANDROID ---
    // You MUST provide a valid icon URL (hosted on your site), 
    // otherwise the notification might be hidden or look like a generic browser alert.
    icon: '../../img/logo.jpg', 
    badge: '../../img/logo.jpg' // Small icon in the status bar
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});