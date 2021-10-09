import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
const { height } = Dimensions.get("window");

const HeaderComponent = ({ signUpScreen }) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.topContainer,
        {
          borderBottomRightRadius: signUpScreen ? 0 : 25,
          borderBottomLeftRadius: signUpScreen ? 25 : 0,
        },
      ]}
    >
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={styles.returnButton}>
          <MaterialIcons name="arrow-back" size={40} color="white" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  topContainer: {
    height: height * 0.1,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
  },
  returnButton: {
    width: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    elevation: 3,
  },
});
