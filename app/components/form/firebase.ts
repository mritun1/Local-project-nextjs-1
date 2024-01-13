import { initializeApp } from 'firebase/app';

const apiKey = process.env.apiKey
const authDomain = process.env.authDomain
const projectId = process.env.projectId
const storageBucket = process.env.storageBucket
const messagingSenderId = process.env.messagingSenderId
const appId = process.env.appId
const measurementId = process.env.measurementId

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

// const firebaseConfig = {
//     apiKey: "AIzaSyC8Zcyc2vlZom5L2TofriLXE_JBZhYIAGE",
//     authDomain: "localniipushnotification.firebaseapp.com",
//     projectId: "localniipushnotification",
//     storageBucket: "localniipushnotification.appspot.com",
//     messagingSenderId: "288263560406",
//     appId: "1:288263560406:web:3c4be62bd26ae7ccfa3d77",
//     measurementId: "G-4FZ0WQ8BLS"
// };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;