import React from "react";
import { StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>{auth().currentUser.email}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
