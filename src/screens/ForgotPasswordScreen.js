import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TextInputColored from "../components/TextInputColored";
import CustomButton from "../components/CustomButton";
import useAuth from "../hooks/useAuth";
import { COLORS } from "../consts/colors";
const { height, width } = Dimensions.get("screen");

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [emailIsCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(
    "Vous receverez un email pour reinitialiser votre mot de passe"
  );
  const { resetPassword } = useAuth();

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      if (email !== "")
        setMsg("Veuillez entrer un email valide s'il vous plait !");
      setIsCorrect(false);
    } else {
      console.log("YEEEEEEEAHHHHHHHH TREU");
      setIsCorrect(true);
      setMsg("");
    }
  };

  useEffect(() => {
    validate(email);
  }, [email]);

  return (
    <View style={{ width, height }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Saisissez votre adresse e-mail
        </Text>
        <TextInputColored
          label="E-mail"
          setChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            color:
              msg ===
              "Il semblerait que cette adresse e-mail n’a jamais été enregistrée !"
                ? "red"
                : "black",
          }}
        >
          {msg}
        </Text>
      </View>
      <CustomButton
        disabled={!emailIsCorrect}
        title="Envoyer"
        isLoading={isLoading}
        onPress={async () => {
          setIsLoading(true);
          try {
            await resetPassword(email, setMsg, setIsLoading);
          } catch (e) {
            console.log("WSEL HNA", e);
          }
          console.log("daazga gaga");
        }}
      />
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
