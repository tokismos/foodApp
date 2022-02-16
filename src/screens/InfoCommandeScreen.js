import { format } from "date-fns";
import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { COLORS } from "../consts/colors";
import TextInputColored from "../components/TextInputColored";
import CustomButton from "../components/CustomButton";
const { height, width } = Dimensions.get("screen");
import { FontAwesome } from "@expo/vector-icons";
import IngredientComponent from "../components/IngredientComponent";

const CartComponent = ({ imgURL, name, ingredients }) => {
  return (
    <>
      <View
        style={{
          ...styles.itemComponent,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          width: "90%",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <FastImage
            style={{
              backgroundColor: "red",
              height: 70,
              borderRadius: 10,
              aspectRatio: 1,
            }}
            source={{
              uri: imgURL,
              headers: { Authorization: "someAuthToken" },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              width: "70%",
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ width: "80%", alignSelf: "center" }}>
          {ingredients?.map((item, index) => (
            <IngredientComponent
              ingredient={item}
              key={index}
              isCommandeScreen={true}
            />
            // <Text key={index} style={{ marginLeft: 10 }}>
            //   <Text style={{ fontWeight: "bold" }}>
            //     {" "}
            //     {!item.newQuantity ? item.quantity : item.newQuantity}{" "}
            //     {item.unite == "unite" ? "" : item.unite}{" "}
            //   </Text>
            //   {item.name}
            // </Text>
          ))}
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
};
const AddProduitComponent = () => {
  const [isRecurrent, setIsRecurrent] = useState(true);
  const [productText, setProductText] = useState("");
  return (
    <View
      style={{
        backgroundColor: "white",
        height: height * 0.1,
        flexDirection: "row",
        width,
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
      }}
    >
      <TextInputColored
        style={{ width: "50%", height: 50 }}
        label="Ajouter un produit"
        setChangeText={setProductText}
        value={productText}
      />
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => setIsRecurrent((p) => !p)}
      >
        <FontAwesome
          name="refresh"
          size={24}
          color={isRecurrent ? COLORS.primary : "gray"}
        />
      </TouchableOpacity>
      <CustomButton title="Ajouter" />
    </View>
  );
};
const AllProductComponent = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "90%",
        height: height * 0.3,
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          color: "gray",
        }}
      >
        Articles Ajoutés
      </Text>
      <Text>Gel Douche</Text>
    </View>
  );
};

const InfoCommandeScreen = ({ navigation, route }) => {
  const { params } = route;
  useLayoutEffect(() => {
    let time = new Date(params.historyDetail.dateTime);

    navigation.setOptions({
      title: `Liste du ${format(time, "dd/MM/yyyy")}`,
    });
  }, []);

  return (
    <ScrollView style={{}}>
      <AddProduitComponent />
      <AllProductComponent />
      {params.historyDetail.recipes.map((item, i) => {
        return (
          <CartComponent
            key={i}
            imgURL={item.imgURL}
            name={item.name}
            ingredients={item.ingredients}
          />
        );
      })}
    </ScrollView>
  );
};

export default InfoCommandeScreen;

const styles = StyleSheet.create({
  separator: {
    height: 0.4,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "gray",
  },
  headerContainer: {
    width: "100%",
    height: "25%",
    padding: 20,

    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomComponent: {
    width: "100%",
    height: "20%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    width: "100%",
  },
  button: {
    width: "90%",
    height: "50%",
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  itemComponent: {
    marginVertical: 5,
    width,
  },
  imageContainer: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 60,
    aspectRatio: 1.5,
  },
});
