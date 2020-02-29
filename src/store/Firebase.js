import React from "react"
import app from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}


const userCollection = "users"
const eventColection =  "events"
class Firebase {

    constructor() {
        app.initializeApp(config)
        this.auth = app.auth();
        this.storage = app.storage();
        this.db = app.firestore();
    }

    //TODO make this a uname-password tuple type
    doCreateUserWithEmailAndPassword = (email, password) => this
        .auth
        .createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email , password) => {
        return (this.auth.signInWithEmailAndPassword(email, password));
    }

    doSetAuthListener = (callback) => {
        this.auth.onAuthStateChanged(callback)
    }

    doLoadUserProfile = (uid) => {
        return this.db.collection(userCollection).doc(uid).get()
    }

    doSetUserProfile = (uid, profile) => {
        return this.db.collection(userCollection).doc(uid).update(profile)
    }
    doPushEvent = (event) => {
        return this.db.collection(eventColection).add(event)
    }

    doUploadImage = (img, path) => {
        return this
            .storage
            .ref()
            .child(path)
            .putString(img, 'data_url')
    }

    doSetAuthListener = (callback ) => {
        this
            .auth
            .onAuthStateChanged(callback)
    }

    doSignOut = () => this
        .auth
        .signOut();

    doPasswordReset = (email) => this
        .auth
        .sendPasswordResetEmail(email);

    doPasswordUpdate = (password) => this.auth.currentUser
        ?.updatePassword(password);

    doSetPersistanceSession = () => {
        return this
            .auth
            .setPersistence(app.auth.Auth.Persistence.SESSION)
    }

    doSetPersistanceLocal = () => {
        return this
            .auth
            .setPersistence(app.auth.Auth.Persistence.LOCAL)
    }
}

const FirebaseInstance = new Firebase();

const FirebaseContext = React.createContext(FirebaseInstance);
export {FirebaseContext};
export default Firebase;