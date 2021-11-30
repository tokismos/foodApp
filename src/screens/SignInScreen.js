import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import TextInputColored from "../components/TextInputColored";
import { COLORS } from "../consts/colors";
import useAuth from "../hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const { height, width } = Dimensions.get("screen");

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigation = useNavigation();
  return (
    <>
      <View
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
      </View>
      <View style={{ height }}>
        <View
          style={{
            margin: 20,
            padding: 10,
            borderWidth: 3,
            borderColor: COLORS.primary,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Connectez vous à votre compte :
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
            style={{ alignSelf: "center" }}
            disabled={password.length == 0}
          />
        </View>
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
