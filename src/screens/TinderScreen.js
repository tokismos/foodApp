import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/TinderCard";
import users from "../helpers/data/";

import AnimatedStack from "../components/AnimatedStack";
import { useDispatch } from "react-redux";
import { addMatch } from "../redux/slicer/MatchSlicer";

const TinderScreen = () => {
  const dispatch = useDispatch();

  const onSwipeLeft = (user) => {
    console.warn("swipe left", user.name);
  };

  const onSwipeRight = (user) => {
    dispatch(addMatch(user.name));
    console.warn("swipe right: ", user.name);
  };

  return (
    <View style={styles.pageContainer}>
      <View
        style={{ backgroundColor: "red", height: "20%", width: "100%" }}
      ></View>
      <AnimatedStack
        data={users}
        renderItem={({ item, swipe }) => (
          <Card height="100%" width="100%" user={item} swipe={swipe} />
        )}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
});

export default TinderScreen;
