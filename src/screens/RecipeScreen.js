import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import GradientImage from "../components/GradientImage";
import { COLORS } from "../consts/colors";
import axios from "axios";
const { width, height } = Dimensions.get("screen");

const RecipeScreen = () => {
  const fetch = async () => {
    const res = await axios.get(
      "https://api.spoonacular.com/recipes/random?apiKey=c932458074ed4e59bc6d57ff4e4315bc"
    );
    console.log("EEEEEEEEEEEEEEERf", res.data.recipes[0].title);
    setData(res.data.recipes[0]);
  };
  useEffect(() => {
    // fetch();
  }, []);

  const [data, setData] = useState();

  const RecipeComponent = () => {
    return (
      data && (
        <GradientImage
          source={{
            uri: data.image,
          }}
          style={{ borderRadius: 25, alignSelf: "center", marginVertical: 10 }}
          height={height * 0.3}
          width={width - 40}
          text={data.title}
        />
      )
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <View
        style={{ backgroundColor: COLORS.primary, height: height * 0.1 }}
      ></View> */}
      {/* <FlatList
        data={["DATA"]}
        renderItem={RecipeComponent}
        keyExtractor={(item) => item.title}
      /> */}
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({});
