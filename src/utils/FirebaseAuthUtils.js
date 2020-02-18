import * as firebase from "firebase";
import 'firebase/database';
import "firebase/auth";

/**
 * This is the place where you should put firebase related code
 */

const firebaseConfig = {
    apiKey: "AIzaSyAg444frFeJexkU2nuI2ZzukW-2WCAYH_I",
    authDomain: "thriftshift-43243.firebaseapp.com",
    databaseURL: "https://thriftshift-43243.firebaseio.com",
    projectId: "thriftshift-43243",
    storageBucket: "thriftshift-43243.appspot.com",
    messagingSenderId: "448439043058",
    appId: "1:448439043058:web:49dc966be4585004c6e16b",
    measurementId: "G-GFTWS7EP1T"
};

// Initialize firebase
if (!firebase.apps.length) {
    console.log("[Message] Initialize firebase app")
    firebase.initializeApp(firebaseConfig);
}

// Get current user, but if you want to change the user state, please pass setUser in App.js to your component
const getUser = () => {
    return firebase.auth().currentUser
}

// Change the user state when user logged in or logged out
const updateUserState = (setUser) => {
    firebase.auth().onAuthStateChanged(setUser);
}

// Sign out the user
const signOut = () => {
    firebase.auth().signOut()
}

// Sign in with google with a popup window
const signInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();
// Create a storage reference from our storage service
const storageRef = storage.ref();

// Get a reference to the database service
const database = firebase.database();
// Create a database reference from our database service
const databaseRef = database.ref();


export { getUser, signOut, signInWithGoogle, updateUserState, storage, storageRef, database, databaseRef }
