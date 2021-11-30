import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../consts/colors";

const CustomButton = ({ disabled, title, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.button,
        ...style,
        backgroundColor: disabled ? COLORS.secondary : COLORS.primary,
      }}
    >
      <Text style={{ fontWeight: "bold", color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: 120,
    justifyContent: "center",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 50,
    alignSelf: "flex-end",
  },
});
