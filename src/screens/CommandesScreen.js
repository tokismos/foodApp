import { format } from "date-fns";
import React, { useEffect } from "react";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { getCommandes } from "../helpers/db";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const CommandeItem = ({ item }) => {
  console.log("ssssssssssss", item);
  let time = new Date(item.dateTime);

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        width: width * 0.9,
        alignSelf: "center",
        marginVertical: 10,
        flexDirection: "row",
      }}
    >
      <View style={{ width: "90%" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Liste du {format(time, "dd/MM/yyyy")}
        </Text>
        {item.recipes.map((elmt) => {
          return (
            <Text style={{ marginLeft: 5 }}>
              - {elmt.name} ( {elmt.nbrPersonne} personnes )
            </Text>
          );
        })}
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <MaterialIcons name="keyboard-arrow-right" size={50} color="black" />
      </View>
    </View>
  );
};

const CommandesScreen = () => {
  const [commandes, setCommandes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommandes(setCommandes);
  }, []);

  return (
    <ScrollView>
      {commandes.map((item) => {
        return <CommandeItem item={item} />;
      })}
    </ScrollView>
  );
};

export default CommandesScreen;

const styles = StyleSheet.create({});
