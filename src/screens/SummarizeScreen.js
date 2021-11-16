import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const SummarizeScreen = ({ route }) => {
  const { finalCart } = route.params;
  console.log("f", finalCart);
  const CartComponent = ({ imgURL }) => {
    return (
      <View
        style={{
          width: "100%",
          height: 234,
          backgroundColor: "yellow",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: "purple",
            width: "20%",
            height: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {console.log("imnage", imgURL)}
          <Image source={{ uri: imgURL }} style={{ height: 60, width: 60 }} />
          <Text>hji</Text>
        </View>
        <View style={{ backgroundColor: "pink", width: "80%" }}></View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "blue", height: "100%" }}>
      <View
        style={{
          width: "100%",
          height: "25%",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Résumé de la commande
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16 }}>Supermarché sélectionné :</Text>
          <Text style={{ fontSize: 22 }}>Manor Food</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16 }}>Addresse de Livraison:</Text>
          <View>
            <Text style={{ fontSize: 16 }}>Tim ITTEN </Text>
            <Text style={{ fontSize: 16 }}> Avenue Jomini 5</Text>
            <Text style={{ fontSize: 16 }}>1004 Lausagne</Text>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: "red", height: "55%" }}>
        <CartComponent />
      </View>
      {Object.keys(finalCart).map((key, index) => {
        return (
          <ScrollView>
            <CartComponent name={key} imgURL={finalCart[key].imgURL} />
          </ScrollView>
        );
      })}
    </View>
  );
};

export default SummarizeScreen;

const styles = StyleSheet.create({});
