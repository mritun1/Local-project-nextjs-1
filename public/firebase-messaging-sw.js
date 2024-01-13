importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

const apiKey = process.env.apiKey
const authDomain = process.env.authDomain
const projectId = process.env.projectId
const storageBucket = process.env.storageBucket
const messagingSenderId = process.env.messagingSenderId
const appId = process.env.appId

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
    const jsonData = event.data.json(); // Parse the JSON data

    const options = {
        body: jsonData.notification.body,
        icon: '/icons/logo/logo1.png', // Update with the path to your icon
    };

    event.waitUntil(
        self.registration.showNotification(jsonData.notification.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    const clickedNotification = event.notification;

    // Extract the dynamic URL from the notification payload
    const urlToOpen = clickedNotification.data.url || 'https://localnii.com';

    event.waitUntil(
        clients.openWindow(urlToOpen)
    );

    // Close the notification
    clickedNotification.close();
});