import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import GradientImage from "../components/GradientImage";
import { COLORS } from "../consts/colors";

const { width } = Dimensions.get("window");
const FirstPage = ({ navigation }) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Food Avenue</Text>
      </View>
      <View style={styles.container}>
        <GradientImage
          source={require("../assets/firstImage.jpg")}
          height={200}
          width={300}
          style={{ marginTop: 30 }}
          text={"Partagez vos meilleurs repas"}
        />

        <View style={{ marginBottom: 50 }}>
          <TouchableOpacity
            style={[styles.button, { activeOpacity: 0.8 }]}
            onPress={() => {
              navigation.replace("OnBoardScreen");
            }}
          >
            <Text style={{ fontSize: 22, color: "white", fontWeight: "600" }}>
              S'inscrire gratuitement
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("OnBoardScreen");
            }}
            style={[
              styles.button,
              { backgroundColor: "white", activeOpacity: 0.8 },
            ]}
          >
            <Text style={{ fontSize: 22, color: "black", fontWeight: "600" }}>
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default FirstPage;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    height: 150,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    width,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    marginBottom: 20,
    backgroundColor: COLORS.primary,
    height: 50,
    width: 250,
    borderRadius: 25,
    alignItems: "center",

    justifyContent: "center",
  },
});
