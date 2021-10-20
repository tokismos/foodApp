import React from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import { NavigationContainer } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const IngredientScreen = ({ route, navigation }) => {
  const { item } = route.params;
  console.log(item.ingredients);

  return (
    <ScrollView style={{}}>
      <View style={styles.topBar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="clockcircleo" size={15} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}> 35 min</Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Crustacés</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>88%</Text>
          <AntDesign name="like2" size={15} color="black" />
        </View>
      </View>
      <Image
        style={{ height: 400, width }}
        source={{
          uri: item.imgURL,
        }}
      />
      <View style={styles.bottomBar}>
        <Text style={styles.textBottomBar}>Dèja cuisiné 560 fois</Text>
      </View>
      <View style={{ borderBottomWidth: 1, height: 150, flexDirection: "row" }}>
        <View style={styles.profileImg}>
          <Image
            style={styles.img}
            source={{
              uri: "https://avatoon.me/wp-content/uploads/2020/07/Cartoon-Pic-Ideas-for-DP-Profile-03.png",
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.descriptionContainer}>
            <Text style={{ fontWeight: "bold" }}>Hélène de Pic</Text>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="star" size={24} color="gold" />
              <AntDesign name="star" size={24} color="gold" />
            </View>
          </View>
          <Text style={{ color: "grey", marginLeft: 12, marginTop: -10 }}>
            @picpic
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, marginHorizontal: 20 }}>
            Recette pour
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              width: 100,
              height: 30,
            }}
          >
            <Text style={{ fontSize: 35 }}>-</Text>
            <Text style={{ marginHorizontal: 10 }}>4</Text>
            <Text style={{ fontSize: 24 }}>+</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 20,
              marginTop: 30,
              fontWeight: "bold",
            }}
          >
            Les ingredients:
          </Text>
          {item.ingredients?.map((text) => {
            return (
              <Text
                key={text}
                style={{
                  marginVertical: 10,
                  marginHorizontal: 30,
                  fontSize: 18,
                }}
              >
                {text}
              </Text>
            );
          })}
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          marginBottom: 50,
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Button
          title="Add to cart"
          color={COLORS.primary}
          width={400}
          onPress={() =>
            navigation.navigate("CartScreen", { ingredients: item.ingredients })
          }
        />
      </View>
    </ScrollView>
  );
};

export default IngredientScreen;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    justifyContent: "space-around",
  },
  bottomBar: {
    backgroundColor: COLORS.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  textBottomBar: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    marginRight: 20,
  },
  profileImg: {
    borderWidth: 1,
    height: 105,
    width: 105,
    marginTop: 15,
    marginLeft: 20,
    borderRadius: 52.5,
  },
  img: {
    height: 100,
    width: 100,
    overflow: "hidden",
    borderRadius: 50,
    borderWidth: 1,
  },
  descriptionContainer: {
    flexDirection: "row",
    height: 30,
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
    alignItems: "center",
  },
});
