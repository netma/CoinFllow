import * as firebase from 'firebase';
import { CONFIG } from './config';

export class FirebaseProvider {
  constructor() {
    firebase.initializeApp(CONFIG);
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.dataNode = null;
  }

  // Firebase signin with email + pwd
  createEmailAccount(email, password) {
    this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(response => console.log(response))
        .catch((error)=> {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          alert(errorMessage)
        });
  }

  // Firebase login with email + pwd
  loginEmailAccount(email, password) {
    this.auth
        .signInWithEmailAndPassword(email, password)
        .then(response => console.log(response))
        .catch((error)=> {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          alert(errorMessage)
        });
  }

  signWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider)
      .catch(error=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  // Add an item to firebase collection
  firebasePush(uid, data) {
    this.db
      .ref(this.dataNode)
      .child(uid)
      .push(data);
  }

  // Update FB element by ID with .update()
  firebaseUpdate(uid, id, data) {
    this.db
      .ref(this.dataNode)
      .child(uid)
      .child(id)
      .update(data);
  }

  // Delete an item from firebase collection
  firebaseRemove(uid, id) {
    this.db
      .ref(this.dataNode)
      .child(uid)
      .child(id)
      .remove();
  }

  // Get a reference on a data node
  getFirebaseRef() {
    return this.db.ref(this.dataNode);
  }
}
