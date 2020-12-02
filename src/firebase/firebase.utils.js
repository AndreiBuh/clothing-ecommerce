import firebase from 'firebase/app'
import 'firebase/firestore'  //database
import 'firebase/auth'  

const firebaseConfig = {
  apiKey: "AIzaSyB3I-ZdrpHDpUuI7kZMaatanH7LYbd62PM",
  authDomain: "clothing-ecommerce-642c9.firebaseapp.com",
  databaseURL: "https://clothing-ecommerce-642c9.firebaseio.com",
  projectId: "clothing-ecommerce-642c9",
  storageBucket: "clothing-ecommerce-642c9.appspot.com",
  messagingSenderId: "745787941338",
  appId: "1:745787941338:web:b800f5bbe78950aecc60e3"
};

//function that allows us to take that user auth object that we get back from autentication library and store it in the database firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()
  if (!snapShot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;
}




firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth()
export const firestore = firebase.firestore()

// Google OAuth 
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;