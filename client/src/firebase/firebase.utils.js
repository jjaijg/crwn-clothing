import firebase from 'firebase/app';
import 'firebase/firestore'; // automatically attach to the above import
import 'firebase/auth'; // automatically attach to the above import

const config =
  process.env.NODE_ENV === 'development'
    ? {
        apiKey: process.env.APIKEY || 'AIzaSyCq9sqj9rkVt8gOuy8pdW7ttbFrrdgf2QU',
        authDomain: process.env.AUTHDOMAIN || 'crwn-db-d28eb.firebaseapp.com',
        databaseURL:
          process.env.DATABASEURL || 'https://crwn-db-d28eb.firebaseio.com',
        projectId: process.env.PROJECTID || 'crwn-db-d28eb',
        storageBucket: process.env.STORAGEBUCKET || '',
        messagingSenderId: process.env.MESSAGINGSENDERID || '224915752678',
        appId: process.env.APPID || '1:224915752678:web:f08d615bf962c4a9',
      }
    : {
        apiKey: 'YOUR API KEY',
        authDomain: 'YOUR AUTH DOMAIN',
        databaseURL: 'YOUR DB URL',
        projectId: 'YOUR PROJECT ID',
        storageBucket: 'YOUR STORAGE BUCKET',
        messagingSenderId: 'YOUR SENDER ID',
        appId: 'YOUR APP ID',
      };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  // console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    await userRef.set({
      displayName,
      email,
      createdAt,
      ...additionalData,
    });
  }
  return userRef;
};

// to add new collection to firebase
export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

// get collections from firebase
export const convertCollectiosSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
