import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
  ImageBackground,
  requireNativeComponent,
  ToastAndroid,
  StatusBar,
} from "react-native";
import TinderCard from "../components/TinderCard";
import users from "../helpers/data/";
import { AntDesign, Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Oven from "../assets/oven.svg";
import Time from "../assets/time.svg";
import Livre from "../assets/livre.svg";
import AnimatedStack from "../components/AnimatedStack";
import { useDispatch, useSelector } from "react-redux";
import {
  addMatch,
  changeNumberOfRecipes,
  resetMatches,
} from "../redux/slicer/MatchSlicer";
import { COLORS } from "../consts/colors";

import { getAllRecipes, incrementLeft, incrementRight } from "../axios";
// import { setRecipes } from "../redux/slicer/recipeSlicer";
import { Avatar } from "react-native-paper";

import LoadingComponent from "../components/LoadingComponent";
// import { LoginWithFb, signOut } from "../helpers/db";
import HeaderComponent from "../components/HeaderComponent";
import auth from "@react-native-firebase/auth";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
const { height, width } = Dimensions.get("screen");
import { setUser } from "../redux/slicer/userSlicer";
import { getAdditionalInfo, getFavoris } from "../helpers/db";
import CustomButton from "../components/CustomButton";
import { Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  setCuisineNotification,
  setListNotification,
} from "../redux/slicer/notificationSlicer";
import { setFavorites } from "../redux/slicer/favoritesSlicer";

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        width,
        height: height * 0.12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Livre height={40} width={40} fill="white" />
        <Text style={styles.categorieTitle}>Types de plats </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Time height={40} width={40} fill="white" />

        <Text style={styles.categorieTitle}>Temps </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <MaterialCommunityIcons name="fish-off" size={40} color="white" />

        <Text style={styles.categorieTitle}>Régimes </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Oven height={40} width={40} fill="white" />
        <Text style={styles.categorieTitle}>Materiel </Text>
      </View>
    </View>
  );
};

const TinderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);

  const [recipes, setRecipes] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const { matches } = useSelector((state) => state.matchStore);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: showButton ? "none" : "flex" },
    });
  }, [showButton]);
  const loadData = async (item) => {
    getAllRecipes(item)
      .then((result) => {
        setRecipes(result);
      })
      .catch((e) => console.log("HOOHOHOHOHOHHOHO", e));
  };

  const getAndSetFavorites = async () => {
    await getFavoris((fav) => dispatch(setFavorites(fav)));
  };
  //To add the additional information to the store , we get them from firebase DB
  useEffect(() => {
    if (user != null) {
      getAdditionalInfo().then((e) => {
        console.log("W", e);
        if (!e.phoneNumber) {
          return navigation.navigate("PhoneScreen");
        }
        dispatch(setUser({ ...user, phoneNumber: e.phoneNumber }));
      });
    } else {
    }
  }, []);
  useEffect(() => {
    getAndSetFavorites();
    loadData();
  }, []);
  useEffect(() => {
    if (matches.length > 0) {
      setShowButton(true);
    }
  }, [matches]);
  const onSwipeLeft = async (item) => {
    // console.warn("swipe left", user.name);
    console.log("swiped left", item);
    await incrementLeft(item._id);
  };

  const onSwipeRight = async (item) => {
    item.defaultNbrPersonne = item.nbrPersonne;
    item.isChecked = true;
    dispatch(addMatch(item));
    console.log("hahaaaaawaawa", item._id);
    await incrementRight(item._id);
    console.log("daz INCREMENT");
  };

  return (
    <View style={styles.pageContainer}>
      <StatusBar translucent backgroundColor={COLORS.primary} />

      <Header />

      {recipes.length == 0 ? (
        <LoadingComponent />
      ) : (
        <>
          <View
            style={{
              height: height * 0.85,
              width: "100%",
              backgroundColor: COLORS.primary,
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: "white",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                paddingTop: 20,
              }}
            >
              <AnimatedStack
                data={recipes}
                renderItem={({ item, onSwipeRight, onSwipeLeft }) => (
                  <TinderCard
                    height="100%"
                    width="100%"
                    recipe={item}
                    onSwipeRight={onSwipeRight}
                    onSwipeLeft={onSwipeLeft}
                  />
                )}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
              />
            </View>
          </View>
          {showButton && (
            <View style={styles.button}>
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "Alerte",
                    `Voulez-vous conserver les ${matches.length} recettes que vous venez de swiper?`,
                    [
                      {
                        text: "Supprimer",
                        onPress: () => {
                          setShowButton(false);
                          dispatch(resetMatches());
                        },
                        style: "cancel",
                      },
                      {
                        text: "Conserver",
                        onPress: () => setShowButton(false),
                      },
                    ]
                  );
                }}
                style={{
                  position: "absolute",
                  top: -5,
                  right: 0,
                  padding: 5,
                }}
              >
                <AntDesign
                  name="closecircle"
                  size={24}
                  color={COLORS.red}
                  style={{
                    backgroundColor: "white",
                    overflow: "hidden",
                    borderRadius: 20,
                  }}
                />
              </Pressable>
              <CustomButton
                onPress={() => {
                  navigation.navigate("PanierScreen");
                }}
                title={`Générer ma liste de course (${matches.length})`}
                style={{ width: "90%", height: "90%", zIndex: -2 }}
                textStyle={{ fontSize: 20, textAlign: "center" }}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  nbrContainer: {
    backgroundColor: COLORS.primary,
    height: "15%",
    width: "90%",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  TextInput: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 3,
  },
  button: {
    height: "10%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    height: "10%",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
    marginTop: 40,
  },
  bottomContainer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    transform: [{ scale: 0.8 }],
  },
  categorieTitle: {
    flex: 1 / 4,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default TinderScreen;
