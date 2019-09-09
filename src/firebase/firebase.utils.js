import firebase from "firebase/app";
import "firebase/firestore"; // automatically attach to the above import
import "firebase/auth"; // automatically attach to the above import

const config = {
  apiKey: "AIzaSyCq9sqj9rkVt8gOuy8pdW7ttbFrrdgf2QU",
  authDomain: "crwn-db-d28eb.firebaseapp.com",
  databaseURL: "https://crwn-db-d28eb.firebaseio.com",
  projectId: "crwn-db-d28eb",
  storageBucket: "",
  messagingSenderId: "224915752678",
  appId: "1:224915752678:web:f08d615bf962c4a9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user, ", error);
    }
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
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

// get collections from firebase
export const convertCollectiosSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
