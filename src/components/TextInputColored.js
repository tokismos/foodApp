import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { COLORS } from "../consts/colors";

const TextInputColored = ({
  label,
  value,
  setChangeText,
  leftIcon,
  secured,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  return (
    <TextInput
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      theme={{ colors: { primary: COLORS.primary } }}
      mode="outlined"
      label={label}
      value={value}
      onChangeText={setChangeText}
      secureTextEntry={secured ? visible : null}
      style={{
        marginHorizontal: 20,
        marginVertical: 5,
      }}
      left={
        leftIcon ? (
          <TextInput.Icon
            name={leftIcon}
            color={isFocused ? COLORS.primary : "black"}
          />
        ) : null
      }
      right={
        secured ? (
          <TextInput.Icon
            name={visible ? "eye" : "eye-off"}
            onPress={() => setVisible(!visible)}
            color={isFocused ? COLORS.primary : "black"}
          />
        ) : null
      }
    />
  );
};

export default TextInputColored;

const styles = StyleSheet.create({});
