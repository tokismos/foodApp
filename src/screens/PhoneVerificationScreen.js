import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import auth from "@react-native-firebase/auth";
import { signInWithPhoneNumber } from "../helpers/db";
import PhoneInput from "react-native-phone-number-input";

const PhoneVerificationScreen = () => {
  const phoneInput = useRef(null);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
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
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="DM"
        layout="first"
        onChangeText={(text) => {
          setValue(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
        withShadow
        autoFocus
        containerStyle={{ borderRadius: 20 }}
        textContainerStyle={{ borderRadius: 10 }}
        defaultCode="US"
      />

      <Button
        title="Send verification code"
        onPress={() => signInWithPhoneNumber(formattedValue, setConfirm)}
      />

      <Text>{formattedValue}</Text>
      <TextInput
        style={{ borderWidth: 1, width: 200, padding: 10 }}
        placeholder="Code"
        value={code}
        onChangeText={(text) => setCode(text)}
      />
      <Button title="Validate" onPress={() => confirmCode(code)} />
    </View>
  );
};

export default PhoneVerificationScreen;

const styles = StyleSheet.create({});
