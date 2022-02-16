import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import { COLORS } from "../consts/colors";

const IngredientComponent = ({
  ingredient: { name, quantity, unite, newQuantity },
  defaultNbrPersonne,
  nbrPersonne,
  isCommandeScreen,
}) => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          alignSelf: "center",
          marginVertical: 3,
        }}
        onPress={() => setToggle((p) => !p)}
      >
        {/* We have new Quantity in the commande screen and we dont have nbrPersonne ,so we dont need to calcul it  */}
        {isCommandeScreen ? (
          <Text
            style={{ fontWeight: "bold", width: "25%", textAlign: "center" }}
          >
            {!newQuantity ? quantity : newQuantity}{" "}
            {unite == "unite" ? "" : unite}{" "}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 16,
              width: "25%",
              textAlign: "center",
              backgroundColor: "red",
            }}
          >{`${+((quantity * nbrPersonne) / defaultNbrPersonne).toFixed(1)} ${
            unite == "unite" ? "" : unite
          }`}</Text>
        )}
        <View
          style={{
            width: "75%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ marginLeft: 20, width: "85%" }}>{name}</Text>
          <CheckBox
            style={[
              {
                transform: [{ scale: Platform.OS === "ios" ? 0.8 : 1 }],
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
        </View>
      </TouchableOpacity>
    </>
  );
};

export default IngredientComponent;

const styles = StyleSheet.create({});
