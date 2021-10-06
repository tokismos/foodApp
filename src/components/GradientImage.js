import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const GradientImage = ({ source, height, width, style, text, titleStyle }) => {
  return (
    <ImageBackground
      style={{ height, width, flexGrow: 1, ...style }}
      source={source}
    >
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]}
        style={{
          height: 200,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <Text style={[styles.imgText, { ...titleStyle }]}>{text}</Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default GradientImage;

const styles = StyleSheet.create({
  imgText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
});
