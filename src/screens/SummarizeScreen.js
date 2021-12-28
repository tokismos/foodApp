import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../consts/colors";
import { setCommandes } from "../helpers/db";

const SummarizeScreen = ({ route }) => {
  const [cartArray, setCartArray] = useState([]);
  const { finalCart } = route.params;

  useEffect(() => {
    console.log("ffffffffffff", Object.entries(finalCart));
    let arr = [];
    Object.entries(finalCart).forEach(([key, value]) => {
      console.log("key", key); // 'one'
      console.log("value", value); // 1
      arr.push({ _id: key, ...value });
    });
    setCartArray(arr);
  }, []);
  const CartComponent = ({ imgURL, name, ingredients }) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        >
          {console.log("imnage", imgURL)}
          <View
            style={{
              height: 60,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: imgURL }}
              style={{
                height: "90%",
                width: "90%",
                borderRadius: 10,
                resizeMode: "contain",
              }}
            />
          </View>
          <View style={{ width: "90%" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
              {name}
            </Text>
            {ingredients?.map((item, index) => (
              <Text key={index} style={{ marginLeft: 10 }}>
                {item.quantity} {item.name}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.separator} />
      </>
    );
  };

  return (
    <>
      <View style={{ height: "80%", backgroundColor: "white" }}>
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
            <Text style={{ fontSize: 22, marginLeft: 10 }}>Manor Food</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16 }}>Addresse de Livraison:</Text>
            <View>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Tim ITTEN </Text>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                {" "}
                Avenue Jomini 5
              </Text>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                1004 Lausanne
              </Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.separator, width: "100%" }} />
        <View style={{ height: "75%" }}>
          <ScrollView>
            {cartArray.map((item, index) => {
              console.log("THJIS IS ITEM", cartArray);
              if (item.ingredients?.length == 0) {
                return;
              }
              return (
                <CartComponent
                  key={index}
                  name={item.name}
                  imgURL={item.imgURL}
                  ingredients={item.ingredients}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
      <View style={{ ...styles.separator, width: "100%" }} />

      <View
        style={{
          width: "100%",
          height: "20%",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            height: "90%",
            alignSelf: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "gray",
              width: "100%",
            }}
          >
            Pour continuer la commande, tu vas être redirigé vers le site de ton
            supermarché.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCommandes(finalCart);
            }}
            style={{
              width: "90%",
              height: "50%",
              backgroundColor: COLORS.primary,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Enregistrer les recettes & continuer la commande
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SummarizeScreen;

const styles = StyleSheet.create({
  separator: {
    height: 0.4,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "gray",
  },
});
