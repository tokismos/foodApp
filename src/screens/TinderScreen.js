import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/TinderCard";
import users from "../helpers/data/";

import AnimatedStack from "../components/AnimatedStack";

const TinderScreen = () => {
  const onSwipeLeft = (user) => {
    console.warn("swipe left", user.name);
  };

  const onSwipeRight = (user) => {
    console.warn("swipe right: ", user.name);
  };

  return (
    <View style={styles.pageContainer}>
      <AnimatedStack
        data={users}
        renderItem={({ item }) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
});

export default TinderScreen;
