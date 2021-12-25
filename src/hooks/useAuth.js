import { Alert, StyleSheet } from "react-native";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import AsyncStorage from "@react-native-community/async-storage";
import database from "@react-native-firebase/database";
import { firebase } from "@react-native-firebase/database";

import { api } from "../axios";
import { useDispatch, useSelector } from "react-redux";

const signIn = async (email, password) => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    console.log("signed with email", res);
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

const signInWithGoogle = async () => {
  // Get the users ID token
  const userInfo = await GoogleSignin.signIn();
  const { idToken, accessToken } = await GoogleSignin.getTokens();

  console.log("info", userInfo.email);
  console.log("google email", userInfo.user.email);
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(
    idToken,
    accessToken
  );
  await auth().signInWithCredential(googleCredential);
  console.log("cred", auth().currentUser);

  //if its the first time email in google is null this is why we update it
  if (!auth().currentUser.email) {
    auth()
      .currentUser.updateEmail(userInfo.user.email)
      .then(async () => {
        console.log("email updated");
        console.log("update", auth().currentUser);
      });
  }
  // ACHEEEEEEEEEEEECKER CAAAAAAA IMPOOORTAAAAAAAAAAAAAANT !!!!!!!!!!!

  console.log("proo", auth().currentUser.providerData);
};

// Sign In with Facebook

const signOut = async () => {
  if (auth().currentUser.providerData[0].providerId == "google.com") {
    console.log("deonected google");
    await GoogleSignin.signOut();
  }
  if (auth().currentUser.providerData[0].providerId == "facebook.com") {
    console.log("deonected facebook");
    try {
      await AsyncStorage.removeItem("accessTokenFb");
    } catch (exception) {
      console.log("Error async storage");
    }
  }
  console.log("heu");
  auth().signOut();
};
//Sign In with Facebook
const signInWithFb = async () => {
  //Get info of the fb profile from the token
  //   const getInfoFromToken = (token) => {
  //     const PROFILE_REQUEST_PARAMS = {
  //       fields: {
  //         string: "id, name,  first_name, last_name,email,picture",
  //       },
  //     };
  //     const profileRequest = new GraphRequest(
  //       "/me",
  //       { token, parameters: PROFILE_REQUEST_PARAMS },
  //       (error, result) => {
  //         if (error) {
  //           console.log("login info has error: " + error);
  //         } else {
  //           //   this.setState({userInfo: result});
  //           console.log("result:", result);
  //         }
  //       }
  //     );
  //     new GraphRequestManager().addRequest(profileRequest).start();
  //   };
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);
  if (result.isCancelled) {
    throw "User cancelled the login process";
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  try {
    await AsyncStorage.setItem("accessTokenFb", data.accessToken);
    console.log("acces token seeeted", data);
  } catch (e) {
    // saving error
  }
  if (!data) {
    throw "Something went wrong obtaining access token";
  }
  //Get the info

  // Create a Firebase credential with the AccessToken
  const facebookCredential = await auth.FacebookAuthProvider.credential(
    data.accessToken
  );
  // Sign-in the user with the credential
  await auth().signInWithCredential(facebookCredential);
  return data.accessToken;
};
//SEnd the verification code to the phone number
const sendPhoneVerification = async (phoneNumber) => {
  try {
    const res = await api.get(`/phoneNumber/send`, { params: { phoneNumber } });
    console.log("SMS SENT", res);
    return res?.status;
  } catch (e) {
    Alert.alert("SMS NOT SENT");
  }
};
//Verify the code
const verifyCode = async (phoneNumber, verificationCode) => {
  try {
    const res = await api.get(`/phoneNumber/verify`, {
      params: { phoneNumber, verificationCode },
    });
    console.log("code done", res);
    return res?.status;
  } catch (e) {
    if (e.response.status == 429) {
      return Alert.alert(`429,Max attempts reached,please try later !`);
    }
    console.log("SMS NOT SENTg ", e.response);
    Alert.alert(`${e.response.status}, ${e.response.data.error}`);
  }
};
const signUp = async (email, password) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password);
    console.log("User Created !", res);
  } catch (e) {
    console.log("user NOT created");
  }
};

const reference = firebase
  .app()
  .database(
    "https://yuzu-a0d71-default-rtdb.europe-west1.firebasedatabase.app/"
  )
  .ref(`/users/${auth().currentUser?.uid}`);

const setAdditionalInfo = async (info) => {
  try {
    reference.set(info).then((i) => console.log("Additional info added", i));
  } catch (e) {
    console.log("Additional informations not added !");
  }
};

//get num from realtime DB
const getAdditionalInfo = async () => {
  let res = "d";
  reference.once("value", (snapshot) => {
    console.log("User data: ", snapshot.val());
    res = snapshot.val();
  });
  return new Promise((resolve, reject) => {
    if (res == "") {
      reject("NOOOO");
    }
    resolve("YEEEEEEEEES");
  });
};
export default useAuth = () => {
  return {
    signIn,
    signOut,
    signInWithGoogle,
    signInWithFb,
    sendPhoneVerification,
    verifyCode,
    signUp,
    setAdditionalInfo,
    getAdditionalInfo,
  };
};

const styles = StyleSheet.create({});
