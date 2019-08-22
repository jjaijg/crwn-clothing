import firebase from 'firebase/app';
import 'firebase/firestore'; // automatically attach to the above import
import 'firebase/auth'; // automatically attach to the above import

const config = {
    apiKey: "AIzaSyCq9sqj9rkVt8gOuy8pdW7ttbFrrdgf2QU",
    authDomain: "crwn-db-d28eb.firebaseapp.com",
    databaseURL: "https://crwn-db-d28eb.firebaseio.com",
    projectId: "crwn-db-d28eb",
    storageBucket: "",
    messagingSenderId: "224915752678",
    appId: "1:224915752678:web:f08d615bf962c4a9"
  };
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters( {
      prompt: 'select_account'
  });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;