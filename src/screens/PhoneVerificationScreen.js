import React, { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { VirtualKeyboard } from "react-native-screen-keyboard";

import { signInWithPhoneNumber } from "../helpers/db";
import PhoneInput from "react-native-phone-number-input";
import { COLORS } from "../consts/colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import ContinueButton from "../components/ContinueButton";

const { width, height } = Dimensions.get("window");

const PhoneVerificationScreen = ({ navigation }) => {
  const phoneInput = useRef(null);
  const [number, setNumber] = useState("");
  const [countryCode, setCountryCode] = useState("1");
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");

  const confirmCode = async (code) => {
    try {
      await confirm.confirm(code);
      console.log("Suuuceeeed");
    } catch (error) {
      console.log("Invalid code.");
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.topContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.returnButton}>
            <MaterialIcons name="arrow-back" size={40} color="white" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ justifyContent: "space-between", height: height * 0.9 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18, margin: 20 }}>
            Enter your phone number :
          </Text>
          <PhoneInput
            ref={phoneInput}
            textInputProps={{
              value: number,
              editable: false,
            }}
            layout="first"
            withShadow
            defaultCode="US"
            onChangeCountry={(text) => setCountryCode(text.callingCode)}
          />
          <View style={{ margin: 40 }}>
            <Text>An SMS will be sent to your phone</Text>
            <Text style={{ textAlign: "center" }}>
              with the verification code.
            </Text>
          </View>
          <VirtualKeyboard
            onChange={setNumber}
            keyboardStyle="containerStyle"
          />
        </View>
        <View
          style={{
            height: height * 0.15,
            backgroundColor: COLORS.secondary,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ContinueButton
            onPress={() => signInWithPhoneNumber(`+${countryCode}${number}`)}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneVerificationScreen;

const styles = StyleSheet.create({
  topContainer: {
    height: height * 0.1,
    backgroundColor: COLORS.secondary,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
  },
  returnButton: {
    width: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    elevation: 3,
  },
});
