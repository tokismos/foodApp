import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../consts/colors";
import { auth, setCommandes } from "../helpers/db";
import { resetMatches } from "../redux/slicer/MatchSlicer";
import {
  setCuisineNotification,
  setListNotification,
} from "../redux/slicer/notificationSlicer";

const IngredientItemComponent = ({ ingredient, title, onPress }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(ingredient, title);
        setToggle((prev) => !prev);
      }}
      style={{
        flexDirection: "row",
        width: "95%",
        justifyContent: "space-between",
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginLeft: 20, width: "80%" }}>
        <Text style={{ fontWeight: "bold" }}>
          {" "}
          {!ingredient.newQuantity
            ? ingredient.quantity
            : ingredient.newQuantity}{" "}
          {ingredient.unite == "unite" ? "" : ingredient.unite}{" "}
        </Text>
        {ingredient.name}
      </Text>
      <CheckBox
        style={[
          {
            transform: [{ scale: 0.8 }],
          },
        ]}
        onTintColor={COLORS.primary}
        onFillColor={COLORS.primary}
        onCheckColor={"white"}
        onAnimationType="fill"
        offAnimationType="fade"
        boxType="square"
        disabled
        value={toggle}
        tintColors={{ true: COLORS.primary, false: "gray" }}
      />
    </TouchableOpacity>
  );
};
const CartItemComponent = ({ item, onPress }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <View style={{ width: "15%", height: "20%", paddingLeft: 5 }}>
          <FastImage
            style={{ aspectRatio: 1, borderRadius: 10 }}
            source={{
              uri: item.imgURL,
              headers: { Authorization: "someAuthToken" },
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          {/* <Image
            source={{ uri: item.imgURL }}
            style={{ aspectRatio: 1, borderRadius: 10 }}
          /> */}
        </View>
        <View style={{ width: "85%" }}>
          <Text
            style={{
              margin: 10,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
          {item.ingredients.map((elmt, index) => (
            <IngredientItemComponent
              ingredient={elmt}
              key={index}
              title={item._id}
              set
              onPress={onPress}
            />
          ))}
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
};
const IngredientCartScreen = ({ route, navigation }) => {
  const { cart } = route.params;
  const dispatch = useDispatch();
  let finalCart = {};

  useEffect(() => {
    cart.map((item) => {
      finalCart[item._id] = {
        ingredients: item.ingredients,
        name: item.name,
        imgURL: item.imgURL,
        nbrPersonne: item.nbrPersonne,
      };
    });
  }, []);

  const onPress = (ingredient, title) => {
    if (finalCart[title].ingredients?.includes(ingredient)) {
      finalCart[title].ingredients = finalCart[title].ingredients.filter(
        (item) => item != ingredient
      );
    } else {
      finalCart[title].ingredients = finalCart[title]
        ? [...finalCart[title].ingredients, ingredient]
        : [ingredient];
    }
  };

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ width: "100%" }}>
          {cart.map((item, index) => (
            <CartItemComponent item={item} key={index} onPress={onPress} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          height: "10%",
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <CustomButton
          onPress={() => {
            if (Object.keys(finalCart).length == 0) {
              return console.log("waloooo");
            }
            if (!auth().currentUser) {
              return navigation.navigate("SignInScreen");
            }
            let arr = [];
            Object.entries(finalCart).forEach(([key, value]) => {
              arr.push({ _id: key, ...value });
            });
            setCommandes(arr);
            dispatch(setCuisineNotification(true));
            dispatch(setListNotification(true));
            dispatch(resetMatches());
            navigation.reset({
              index: 0,
              routes: [{ name: "TinderScreen" }],
            });
          }}
          title="Créer ma liste de courses"
          style={{ ...styles.buttonContainer, backgroundColor: COLORS.primary }}
          textStyle={{ fontWeight: "bold", color: "white", fontSize: 18 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default IngredientCartScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#E3E3E3",

    height: "80%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    width: "90%",
    height: 0.4,
    backgroundColor: "gray",
    alignSelf: "center",
  },
});
