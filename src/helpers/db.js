import { Alert } from "react-native";

import database from "@react-native-firebase/database";
// import auth from "@react-native-firebase/auth";
// import { LoginManager, AccessToken } from "react-native-fbsdk-next";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
// import { AccessToken, LoginManager } from "react-native-fbsdk-next";

const firebaseDbURL =
  "https://yuzu-a0d71-default-rtdb.europe-west1.firebasedatabase.app/";
const firebaseConfig = {
  apiKey: "AIzaSyC_Khzc-fgbnfetYLwwdkSiNYPuRVjbdN8",
  authDomain: "yuzu-a0d71.firebaseapp.com",
  databaseURL:
    "https://yuzu-a0d71-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "yuzu-a0d71",
  storageBucket: "yuzu-a0d71.appspot.com",
  messagingSenderId: "768418404122",
  appId: "1:768418404122:web:07f4cd1177316436107ea3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const setAdditionalInfo = async (info) => {
  try {
    firebase
      .app()
      .database(firebaseDbURL)
      .ref(`/users/${auth().currentUser?.uid}`)
      .update(info)
      .then((i) => console.log("Additional info added", i));
  } catch (e) {
    console.log("Additional informations not added !");
  }
};

//get num from realtime DB
const getAdditionalInfo = async () => {
  const snapshot = await firebase
    .app()
    .database(firebaseDbURL)
    .ref(`/users/${auth().currentUser?.uid}`)
    .once("value");
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return false;
};

const setCommandes = (cart) => {
  let obj = [];

  cart.forEach((item) => {
    obj.push({
      _id: item._id,
      name: item.name,
      imgURL: item.imgURL,
      ingredients: item.ingredients,
      nbrPersonne: item.nbrPersonne,
    });
  });
  try {
    firebase
      .app()
      .database(firebaseDbURL)
      .ref(`/users/${auth().currentUser?.uid}/commandes`)
      .push({
        recipes: { ...obj },
        dateTime: firebase.database.ServerValue.TIMESTAMP,
      })
      .then((i) => console.log("cartadded", i));
  } catch (e) {
    console.log("Additional informations not added !");
  }
};

const getCommandes = async (setCommandes) => {
  let arr = [];
  firebase
    .app()
    .database(firebaseDbURL)
    .ref(`/users/${auth().currentUser?.uid}/commandes`)
    .orderByChild("dateTime")
    .on("value", (snapshot) => {
      if (snapshot.exists()) {
        console.log("it exists");
        arr = Object?.values(snapshot.val());
      }
      setCommandes(arr);
    });
};

// const LoginWithFb = async () => {
//   // Attempt login with permissions
//   const result = await LoginManager.logInWithPermissions([
//     "public_profile",
//     "email",
//   ]);
//   if (result.isCancelled) {
//     throw "User cancelled the login process";
//   }
//   // Once signed in, get the users AccesToken
//   const data = await AccessToken.getCurrentAccessToken();

//   if (!data) {
//     throw "Something went wrong obtaining access token";
//   }
//   // Create a Firebase credential with the AccessToken
//   const facebookCredential = auth.FacebookAuthProvider.credential(
//     data.accessToken
//   );
//   // Sign-in the user with the credential
//   return auth().signInWithCredential(facebookCredential);
// };

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

export { setAdditionalInfo, getAdditionalInfo, setCommandes, getCommandes };
