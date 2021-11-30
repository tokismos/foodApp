import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import { TextInput } from "react-native-paper";
import TextInputColored from "../components/TextInputColored";
import { COLORS } from "../consts/colors";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
const { height, width } = Dimensions.get("screen");
const FeedBackScreen = () => {
  const [title, setTitle] = useState();
  const [comment, setComment] = useState();
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={-200}
      style={{ flex: 1 }}
    >
      <View style={{ height }}>
        <View
          style={{
            height: "10%",
            width: "10%",
            justifyContent: "flex-end",
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: COLORS.primary,
              marginBottom: 20,
            }}
          >
            Ton FeedBack
          </Text>
          <View
            style={{
              flexShrink: 1,
              backgroundColor: "#FFF1BE",
              width: "90%",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderWidth: 5,
              borderColor: COLORS.primary,
              padding: 10,
            }}
          >
            <TextInputColored
              label="Titre du message"
              setChangeText={setTitle}
            />

            <TextInput
              style={{ height: 200 }}
              placeholder="Un bug, une suggestion d’amélioration, une remarque, un petit message d’encouragement..."
              theme={{ colors: { primary: COLORS.primary } }}
              multiline
              mode="outlined"
              numberOfLines={5}
              value={comment}
              onChangeText={(Description) => {
                setComment(Description);
              }}
            />

            <CustomButton title="Envoyer" />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FeedBackScreen;

const styles = StyleSheet.create({
  button: {
    width: 120,
    justifyContent: "center",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 50,
    alignSelf: "flex-end",
  },
});
