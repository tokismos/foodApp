import { format } from "date-fns";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  Pressable,
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
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import IngredientComponent from "../components/IngredientComponent";
import CheckBox from "@react-native-community/checkbox";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

// Each recipe which contain ingredients
const CartComponent = ({
  imgURL,
  name,
  ingredients,
  setSelectedIngredients,
  selectedIngredients,
}) => {
  return (
    <>
      <View style={styles.cartComponent}>
        <View style={styles.titleComponent}>
          <FastImage
            style={{
              backgroundColor: COLORS.secondary,
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
              setSelectedIngredients={setSelectedIngredients}
              selectedIngredients={selectedIngredients}
              isSaved={selectedIngredients.indexOf(item.name) > -1}
              ingredient={item}
              key={index}
              isCommandeScreen={true}
            />
          ))}
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
};

// Component where we add a product with button
const AddProductComponent = ({ setProducts, products }) => {
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [productText, setProductText] = useState();
  return (
    <View style={styles.addProductComponent}>
      <TextInputColored
        style={{ width: "50%", height: 40 }}
        label="Ajouter un article"
        setChangeText={setProductText}
        value={productText}
      />
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          setIsRecurrent((p) => !p);
        }}
      >
        <FontAwesome
          name="refresh"
          size={24}
          color={isRecurrent ? COLORS.primary : "gray"}
        />
      </TouchableOpacity>
      <CustomButton
        title="Ajouter"
        style={{ height: 40 }}
        onPress={() => {
          if (!productText) {
            return;
          }
          if (products.map((i) => i.name).indexOf(productText) > -1) {
            return Alert.alert("Vous avez deja ajouté ce produit !");
          }
          setProducts((p) => [...p, { name: productText, isRecurrent }]);
        }}
      />
    </View>
  );
};

//List of all the products we added

const InfoCommandeScreen = ({ navigation, route }) => {
  const { params } = route;

  const [products, setProducts] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const ProductComponent = ({ product, isSaved, isRecurrent }) => {
    const [toggle, setToggle] = useState();
    const [isRecu, setIsRecurrent] = useState(isRecurrent);

    useEffect(() => {
      setToggle(isSaved);
      console.log(" NEW PROD", products);
    }, [products]);

    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              var tmp = [...products];
              const index = tmp.findIndex((i) => i.name == product);
              tmp[index] = { name: product, isRecurrent: !isRecurrent };
              setProducts(tmp);

              setIsRecurrent((p) => !p);
            }}
            style={{
              position: "absolute",
              left: "-20%",
              backgroundColor: "white",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <FontAwesome
              name="refresh"
              size={24}
              color={isRecu ? COLORS.primary : "gray"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!toggle) {
                console.log("slct ing", selectedIngredients);
                setSelectedIngredients((p) => [...p, product]);
              } else {
                setSelectedIngredients((p) =>
                  p.filter((item) => item != product)
                );
              }

              setToggle((p) => !p);
            }}
            style={styles.productItemComponent}
          >
            <Text
              style={{
                ...styles.productItemText,
                textDecorationLine: toggle ? "line-through" : null,
              }}
            >
              {product}
            </Text>
            <CheckBox
              style={[
                {
                  transform: [{ scale: Platform.OS === "ios" ? 0.8 : 1.2 }],
                },
              ]}
              onTintColor={COLORS.primary}
              onFillColor={COLORS.primary}
              onCheckColor={"white"}
              onAnimationType="fill"
              offAnimationType="fade"
              boxType="square"
              disabled
              value={isSaved}
              tintColors={{ true: COLORS.primary, false: "gray" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setProducts(products.filter((i) => i.name != product));
              console.log("lllllll", products);
            }}
            style={{
              position: "absolute",
              right: "-20%",
              backgroundColor: "white",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <AntDesign name="delete" size={24} color={COLORS.red} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const AllProductsComponent = () => {
    return (
      <>
        <Text style={styles.title}>Articles Ajoutés :</Text>
        <View style={{ ...styles.productsComponent, overflow: "visible" }}>
          {products.map((item, i) => {
            return (
              <ProductComponent
                product={item.name}
                isRecurrent={item.isRecurrent}
                key={i}
                isSaved={selectedIngredients.indexOf(item.name) > -1}
              />
            );
          })}
        </View>
      </>
    );
  };

  useLayoutEffect(() => {
    let time = new Date(params.historyDetail.dateTime);

    navigation.setOptions({
      title: `Liste du ${format(time, "dd/MM/yyyy")}`,
    });
  }, []);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      if (!isFocused) {
        await AsyncStorage.setItem(
          "selectedIngredients",
          JSON.stringify(selectedIngredients)
        );
        await AsyncStorage.setItem("products", JSON.stringify(products));
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      const selectedIngredientsResult = await AsyncStorage.getItem(
        "selectedIngredients"
      );
      if (selectedIngredientsResult != null) {
        setSelectedIngredients(JSON.parse(selectedIngredientsResult));
      }
      const productsResult = await AsyncStorage.getItem("products");
      if (productsResult != null) {
        setProducts(JSON.parse(productsResult));
      }
    })();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#cecece" }}>
      <AddProductComponent setProducts={setProducts} products={products} />

      {products.length != 0 && <AllProductsComponent products={products} />}
      <Text style={styles.title}>Recettes :</Text>

      {params.historyDetail.recipes.map((item, i) => {
        return (
          <CartComponent
            setSelectedIngredients={setSelectedIngredients}
            selectedIngredients={selectedIngredients}
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
    backgroundColor: "white",
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
  cartComponent: {
    marginVertical: 5,

    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
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
  productsComponent: {
    backgroundColor: "white",
    width: "70%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 10,
  },
  productsTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "gray",
  },
  titleComponent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  productItemComponent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  addProductComponent: {
    backgroundColor: "white",
    height: height * 0.1,
    flexDirection: "row",
    width,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  productItemText: {
    fontSize: 16,
    width: "80%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 10,
    marginLeft: 5,
  },
});
