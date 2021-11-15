import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, StatusBar } from "react-native";
import { COLORS } from "../consts/colors";

const { height, width } = Dimensions.get("screen");

const HeaderComponent = ({ page }) => {
  //The bar with color take the whole width
  const Bar = ({ style }) => {
    return (
      <View
        style={{
          backgroundColor: "#C4C4C4",
          height: 12,
          borderRadius: 10,
          width: "100%",
          ...style,
        }}
      ></View>
    );
  };
  //The color bar plus title
  const BarComponent = ({ long, title, style }) => {
    return (
      <View style={{ width: long, marginHorizontal: 3 }}>
        <Bar style={style} />
        <Text style={{ textAlign: "center", fontSize: 12 }}>{title} </Text>
      </View>
    );
  };
  //The row of the whoole container
  const BarContainer = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <BarComponent
          long="23%"
          title="Choisir vos recettes"
          style={{ backgroundColor: COLORS.primary }}
        />
        <BarComponent long="23%" title="Valider les recettes" style={second} />
        <BarComponent long="23%" title="Selection des recettes" style={third} />
        <BarComponent long="5%" title="" style={fourth} />

        <View
          style={{
            width: "20%",
          }}
        >
          <View
            style={{
              marginHorizontal: 3,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "45%" }}>
              <Bar style={last} />
            </View>
            <View style={{ width: "45%" }}>
              <Bar style={last} />
            </View>
          </View>
          <Text style={{ width: "100%", textAlign: "center", fontSize: 12 }}>
            Livraison & paiement
          </Text>
        </View>
      </View>
    );
  };
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  const [last, setLast] = useState("");

  //To change the color for every page with this header
  useEffect(() => {
    //The obj of each style to add it to the setter
    let style2 = {};
    let style3 = {};
    let style4 = {};
    let style5 = {};
    const borderWidth = 4;
    switch (page) {
      case "2":
        style2 = {
          borderWidth,
          borderColor: COLORS.primary,
          backgroundColor: "white",
        };
        break;
      case "3":
        style2 = {
          backgroundColor: COLORS.primary,
        };
        style3 = {
          borderWidth,
          borderColor: COLORS.primary,
          backgroundColor: "white",
        };
        break;
      case "4":
        style2 = {
          backgroundColor: COLORS.primary,
        };
        style3 = {
          backgroundColor: COLORS.primary,
        };
        style4 = {
          borderWidth,
          borderColor: COLORS.primary,
          backgroundColor: "white",
        };
        break;
      case "5":
        style2 = {
          backgroundColor: COLORS.primary,
        };
        style3 = {
          backgroundColor: COLORS.primary,
        };
        style4 = {
          backgroundColor: COLORS.primary,
        };
        style5 = {
          borderWidth,
          borderColor: COLORS.primary,
          backgroundColor: "white",
        };
        break;
    }
    setSecond(style2);
    setThird(style3);
    setFourth(style4);
    setLast(style5);
  }, []);
  return (
    <View
      style={{
        height: height * 0.15,
        // paddingTop: StatusBar.currentHeight,
        backgroundColor: "#E8E8E8",
        width,
        justifyContent: "flex-end",
        paddingTop: 20,
      }}
    >
      <View
        style={{
          padding: 5,
          backgroundColor: "white",
          width: "95%",
          alignSelf: "center",
          height: "70%",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          flexDirection: "row",
          paddingTop: 15,
        }}
      >
        <BarContainer />
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({});
