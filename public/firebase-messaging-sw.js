importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyC8Zcyc2vlZom5L2TofriLXE_JBZhYIAGE",
    authDomain: "localniipushnotification.firebaseapp.com",
    projectId: "localniipushnotification",
    storageBucket: "localniipushnotification.appspot.com",
    messagingSenderId: "288263560406",
    appId: "1:288263560406:web:3c4be62bd26ae7ccfa3d77",
    measurementId: "G-4FZ0WQ8BLS"
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
    event.notification.close(); // Close the notification
    // Add logic to open a specific URL when the notification is clicked
    //const clickAction = event.data.click_action; // Adjust this based on your notification data
    const clickAction = 'https://localnii.com'
    if (clickAction) {
        // Use clients.openWindow to open a new window or focus an existing one
        event.waitUntil(clients.openWindow(clickAction));
    }
    
});
