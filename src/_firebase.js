import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getStorage,
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
  listAll as ls,
} from "firebase/storage";
import { firebaseConfig } from "./_config";

const app = initializeApp(firebaseConfig);

// Auth API
const auth = getAuth(app);

const getCurrentUser = (callback) => {
  return onAuthStateChanged(auth, callback);
};

const signIn = (username, password) => {
  return signInWithEmailAndPassword(auth, username, password);
};

const signOut = () => {
  return firebaseSignOut(auth);
};

const fbAuth = {
  _: auth,
  getCurrentUser,
  signIn,
  signOut,
};

// Storage API
const storage = getStorage(app);

const ref = (path) => {
  return path ? firebaseRef(storage, path) : firebaseRef(storage);
};
const uploadFile = (uploadPath, file) => {
  return uploadBytes(ref(uploadPath), file).catch((error) => {
    console.log("Could not upload file(s).");
  });
};
const getFileURL = (filePath) => {
  return getDownloadURL(ref(filePath))
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log("Image could not be accessed.");
    });
};
const listAll = (filePath) => {
  return ls(ref(filePath)).catch((error) => {
    console.log("Invalid path provided.");
  });
};

const fbStorage = {
  _: storage,
  ref,
  uploadFile,
  getFileURL,
  listAll,
};

const firebase = {
  app,
  auth: fbAuth,
  storage: fbStorage,
};

export default firebase;
