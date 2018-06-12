import * as firebase from 'firebase'
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
} from './constants'

// Initialize Firebase
const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config)

export const database = firebase.database()
export const auth = firebase.auth()
export const provider = new firebase.auth.FacebookAuthProvider()
export const provider2 = firebase.auth.FacebookAuthProvider
export const storage = firebase.storage()
