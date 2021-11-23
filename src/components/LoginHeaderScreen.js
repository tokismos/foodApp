import React, { forwardRef, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import { useNavigation } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";

const { height, width } = Dimensions.get("screen");

const LoginHeaderScreen = ({ index, innerRef, setIndex }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "white",
        height: height * 0.1,
        width,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <View
        style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={() => {
            setIndex(index - 1);

            index >= 1
              ? innerRef?.current.scrollToIndex({
                  index: index - 1,
                  animation: true,
                })
              : navigation.goBack();
          }}
          style={{ padding: 10 }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            width: "100%",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Créer un compte
        </Text>
      </View>
    </View>
  );
};

export default LoginHeaderScreen;

const styles = StyleSheet.create({});
