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

const { width } = Dimensions.get("window");
const FirstPage = ({ navigation }) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Food Avenue</Text>
      </View>
      <View style={styles.container}>
        <ImageBackground
          style={styles.firstImage}
          source={require("../assets/firstImage.jpg")}
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
              <Text style={styles.imgText}>Partager vos meilleurs repas</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
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
    backgroundColor: "#ffc700",
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
    backgroundColor: "#ffeaa0",
    flex: 1,
    width,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  firstImage: {
    height: 200,
    width: 300,
    flexGrow: 1,
    marginTop: 80,
  },
  imgText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
    backgroundColor: "#ffc700",
    height: 50,
    width: 250,
    borderRadius: 25,
    alignItems: "center",

    justifyContent: "center",
  },
});
