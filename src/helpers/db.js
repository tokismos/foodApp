import * as firebase from "firebase";
import { Alert } from "react-native";
import * as Facebook from "expo-facebook";

const firebaseConfig = {
  apiKey: "AIzaSyAEDrHAl6QWafSMu9MFVbIj2Z2Fr5cr6Og",
  authDomain: "food-app-5c687.firebaseapp.com",
  projectId: "food-app-5c687",
  storageBucket: "food-app-5c687.appspot.com",
  messagingSenderId: "954088809444",
  appId: "1:954088809444:web:0714e4191f1876959a1df1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const auth = firebase.auth();

const signUp = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    console.log("User Created !");
  } catch (e) {
    alert(e);
  }
};

const signIn = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("signed");
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

const signOut = async () => {
  try {
    await auth.signOut();
    console.log("signed out");
  } catch (e) {
    alert(e);
  }
};

const logInWithFb = async () => {
  try {
    await Facebook.initializeAsync({
      appId: "593620908653647",
    });
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};
// const getData = async (loadMood) => {
//   await db
//     .ref(`users/`)
//     .on("value", (snapshot) => {
//       const data = snapshot.val();
//       loadMood(data);
//     });
// };

export { firebase, auth, db, signUp, signIn, signOut, logInWithFb };
