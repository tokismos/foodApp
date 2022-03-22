// Le screen qui nous montre le tutorial et les informations a propos de l'applicatio,
// Ce screen n'est pas actif pour le moment

import React, { useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";

import Onboarding from "react-native-onboarding-swiper";

import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? "white" : "rgba(0, 0, 0, 0.3)";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Next = ({ isLight, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          marginRight: 15,
          alignSelf: "center",
        }}
      >
        Suivant
      </Text>
    </TouchableOpacity>
  );
};

const Skip = ({ isLight, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text style={{ color: "white", fontSize: 20, marginLeft: 15 }}>
        Passer
      </Text>
    </TouchableOpacity>
  );
};
const Done = ({ isLight, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        height: 45,
        width: 45,
        borderRadius: 25,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
      }}
    >
      <MaterialIcons name="done" size={40} color="#ffc700" />
    </TouchableOpacity>
  );
};
const OnBoardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => {
        navigation.replace("LoginScreen");
      }}
      onDone={() => {
        navigation.replace("IntroScreen");
      }}
      DotComponent={Square}
      NextButtonComponent={Next}
      showSkip={false}
      SkipButtonComponent={Skip}
      DoneButtonComponent={Done}
      bottomBarColor="#ffc700"
      imageContainerStyles={{
        paddingBottom: 0,
        justifyContent: "center",
      }}
      pages={[
        {
          backgroundColor: "white",
          image: (
            <>
              <View style={styles.card}>
                <LottieView
                  autoPlay
                  loop={true}
                  resizeMode="cover"
                  style={{
                    marginTop: 20,
                    height: 200,
                  }}
                  speed={0.8}
                  source={require("../assets/SwipeLeft.json")}
                />
                <FontAwesome
                  name="close"
                  size={80}
                  color="white"
                  style={{ margin: 20 }}
                />
              </View>
            </>
          ),
          title: "Swipes à gauche si tu n'aimes pas la recette",
          titleStyles: {
            fontWeight: "bold",
          },
          subtitle: "",
        },
        {
          backgroundColor: "white",
          image: (
            <>
              <View
                style={{
                  ...styles.card,
                  ...COLORS.shadow,
                  transform: [{ scaleX: -1 }],
                }}
              >
                <LottieView
                  autoPlay
                  loop={true}
                  resizeMode="cover"
                  style={{
                    marginTop: 20,
                    height: 200,
                  }}
                  speed={0.8}
                  source={require("../assets/SwipeLeft.json")}
                />
                <FontAwesome
                  name="heart"
                  size={60}
                  color="white"
                  style={{ margin: 20 }}
                />
              </View>
            </>
          ),
          title: "à droite si tu veux l'ajouter à ton panier",
          titleStyles: {
            fontWeight: "bold",
          },
          subtitle: "",
        },
        {
          backgroundColor: "white",
          image: (
            <View
              style={{
                backgroundColor: COLORS.primary,
                elevation: 10,
                height: "70%",
                width: "80%",
                justifyContent: "flex-end",
                alignItems: "center",
                ...COLORS.shadow,
              }}
            >
              <View style={{}}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Feather name="info" size={60} color="white" />
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={50}
                    color="white"
                  />
                </View>
                <LottieView
                  autoPlay
                  loop={true}
                  resizeMode="cover"
                  style={{
                    height: 160,
                  }}
                  speed={0.8}
                  source={require("../assets/Click.json")}
                />
              </View>
            </View>
          ),
          title: "Cliques sur le bouton i pour avoir plus d'informations",
          titleStyles: {
            color: "#000",
            fontWeight: "bold",
          },
          subtitle: "",
        },
        {
          backgroundColor: "white",
          image: (
            <View
              style={{
                height: "60%",
                width: "80%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                  margin: 20,
                  textAlign: "center",
                }}
              >
                Comment utiliser Yuzu ?
              </Text>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 12.5,
                      height: 25,
                      width: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      1
                    </Text>
                  </View>
                  <Text style={{ fontSize: 16 }}>Choisissez vos recettes</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 12.5,
                      height: 25,
                      width: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      2
                    </Text>
                  </View>
                  <Text style={{ fontSize: 16 }}>
                    Créez automatiquement votre liste de course
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 12.5,
                      height: 25,
                      width: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      3
                    </Text>
                  </View>
                  <Text style={{ fontSize: 16 }}>Faites vos courses</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 12.5,
                      height: 25,
                      width: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      4
                    </Text>
                  </View>
                  <Text style={{ fontSize: 16, flex: 1 }}>
                    Cuisinez et profitez de petits plats fait maison, plein de
                    goût et d'énergie! 😍
                  </Text>
                </View>
              </View>
            </View>
          ),
          title: "",
          titleStyles: {
            color: "#000",
            fontWeight: "bold",
          },
          subtitle: "",
        },
      ]}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    height: "70%",
    justifyContent: "space-between",
    ...COLORS.shadow,
  },
});
