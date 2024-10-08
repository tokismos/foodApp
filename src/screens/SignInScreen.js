//La possibilite de se connecter avec email ou avec google,ici on fait appel aux fonctions crees dans useAuth , pour gerer la connexion
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import CustomButton from "../components/CustomButton";
import TextInputColored from "../components/TextInputColored";
import { COLORS } from "../consts/colors";
import useAuth from "../hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import GoogleIcon from "../assets/GoogleIcon.svg";

const { height, width } = Dimensions.get("screen");

const SignInScreen = ({ route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const {
    signIn,
    signInWithGoogle,
    signInWithFb,
    onAppleButtonPress,
    resetPassword,
  } = useAuth();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2].name;
  console.log("ROUTE", prevRoute);
  return (
    <>
      {/* <View
        style={{
          height: "10%",
          width: "10%",
          justifyContent: "flex-end",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={40} color="black" />
        </TouchableOpacity>
      </View> */}
      <View style={{ height }}>
        <View
          style={{
            margin: 10,
            padding: 10,
            borderColor: COLORS.primary,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {prevRoute === "IngredientsCartScreen"
              ? "Il vous faut un compte pour qu'on puisse enregistrer les recettes quelque part ❤️"
              : "Connectez vous à votre compte :"}
          </Text>
          <TextInputColored label="E-mail" setChangeText={setEmail} />
          <TextInputColored
            label="Mot de passe"
            setChangeText={setPassword}
            secured
          />
          <CustomButton
            onPress={() => signIn(email, password)}
            title="Se connecter"
            style={{ alignSelf: "center", marginTop: 20 }}
            disabled={password.length == 0}
          />

          <Pressable
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
            <Text
              style={{
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              Mot de passe oublié ?{"\n"}Cliquez ici !
            </Text>
          </Pressable>
        </View>
        <View style={{ width: "100%", flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexGrow: 1,
                height: 0.4,
                backgroundColor: "gray",
                alignItems: "flex-end",
              }}
            />

            <Text
              style={{
                textAlign: "center",
                marginHorizontal: 20,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Ou bien
            </Text>
            <View
              style={{ flexGrow: 1, height: 0.4, backgroundColor: "gray" }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.95}
            style={{
              ...styles.button,
              backgroundColor: "white",
              alignSelf: "center",
              elevation: 1,
            }}
            onPress={async () => {
              await signInWithGoogle();
            }}
          >
            <View style={styles.buttonContainer}>
              <GoogleIcon width={"40"} height={"40"} />
              <View style={{ width: "85%" }}>
                <Text style={{ ...styles.socialText, color: "#757575" }}>
                  Se connecter avec Google
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <Pressable
            style={{ marginTop: 50 }}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            {prevRoute === "IngredientsCartScreen" && (
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Toujours pas de compte ? {"\n"}
                Inscrivez-vous !
              </Text>
            )}
          </Pressable>

          {/* <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
              width: 160,
              height: 60,
              alignSelf: "center",
            }}
            onPress={() =>
              onAppleButtonPress().then(() =>
                console.log("Apple sign-in complete!")
              )
            }
          /> */}
        </View>
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  button: {
    width: "80%",
    height: 60,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
