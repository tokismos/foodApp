import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

const ProfileScreen = () => {
  console.log("cuurent user", auth().currentUser);
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{auth().currentUser.email}</Text>
      <Button title="se deconnecter" onPress={() => signOut()} style={{}} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
