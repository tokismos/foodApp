import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../consts/colors";

const IntroScreen = ({ navigation }) => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Image
        source={require("../assets/intro.jpg")}
        style={{ height: "100%", width: "100%", resizeMode: "cover" }}
      />
      <View
        style={{
          height: "50%",
          position: "absolute",
          top: 0,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{
            height: "40%",
            width: "80%",
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            fontSize: 25,
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            textShadowColor: "black",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 10,
          }}
        >
          Faire ses courses en 5 min depuis son canap
        </Text>
      </View>
      <View
        style={{
          height: "50%",
          position: "absolute",
          width: "100%",
          bottom: 0,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "80%",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 25,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Se connecter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              ...styles.button,
              backgroundColor: "white",
              marginTop: 5,
            }}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 25,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Je suis nouveau
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EmailScreen")}>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              M'inscrire plus tard
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    width: "80%",
    height: "25%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginVertical: 20,
  },
});
