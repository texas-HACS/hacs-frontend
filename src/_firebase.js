import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = require("./_config").firebase;

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
