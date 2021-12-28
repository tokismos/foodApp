import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Animated, {
  FadeInLeft,
  Layout,
  StretchOutY,
  ZoomOut,
} from "react-native-reanimated";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from "@react-native-community/checkbox";
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog";
import { TextInput } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import ReportComponent from "../components/ReportComponent";

const { height, width } = Dimensions.get("screen");

const IngredientComponent = ({ ingredient: { name, quantity, unite } }) => {
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
        <Text style={{ fontSize: 16 }} style={{ width: "20%" }}>{`${quantity} ${
          unite == "unite" ? "" : unite
        }`}</Text>
        <View
          style={{
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ marginLeft: 20, width: "80%" }}>{name}</Text>
          <CheckBox
            disabled
            value={toggle}
            tintColors={{ true: COLORS.primary, false: "gray" }}
            style={{ transform: [{ scale: 1.2 }], width: "20%" }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const StepComponent = ({ step, index }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <View
      style={{
        width: width * 0.9,
        backgroundColor: "white",
        justifyContent: "space-between",
        padding: 5,
        marginVertical: 10,
        borderRadius: 5,
      }}
    >
      <TouchableOpacity style={{}} onPress={() => setToggle((p) => !p)}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, color: "gray", fontWeight: "bold" }}>
            Etape {index + 1}.
          </Text>
          <CheckBox
            boxType="circle"
            disabled
            value={toggle}
            tintColors={{ true: COLORS.primary, false: "gray" }}
            style={{ transform: [{ scale: 1.2 }] }}
          />
        </View>

        {!toggle && (
          <Animated.View entering={FadeInLeft}>
            <Text style={{ marginLeft: "5%" }}>{step}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const IngredientScreen = ({ route }) => {
  const [nbr, setNbr] = useState(4);
  const [showReport, setShowReport] = useState(false);
  const { recipe } = route.params;
  console.log("RECEIPPE", recipe);
  return (
    <>
      <Dialog
        visible={showReport}
        onTouchOutside={() => {
          setShowReport(false);
        }}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => true}
      >
        <DialogContent>
          <ReportComponent
            setShowReport={setShowReport}
            recipeName={recipe.name}
          />
        </DialogContent>
      </Dialog>
      <ScrollView
        overScrollMode="never"
        style={{ backgroundColor: "#E6E6E6", flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: recipe.imgURL }}
          style={{
            aspectRatio: 1,
          }}
        />
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 0.2 }}
          locations={[0.3, 1]}
          colors={["black", "transparent"]}
          style={{ height: height * 0.3, marginTop: "-28%", paddingTop: "25%" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => setShowReport(true)}>
              <MaterialIcons
                name="report"
                size={30}
                color="red"
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                margin: 10,
                color: "white",
                flex: 1,
              }}
            >
              {recipe.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              alignSelf: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "white", marginRight: 5 }}>
                620
              </Text>
              <AntDesign name="heart" size={14} color={COLORS.primary} />
            </View>
            <Text style={{ fontSize: 18, color: "white" }}>
              {recipe.tempsPreparation + recipe.tempsCuisson} min
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "white", marginRight: 5 }}>
                4.7
              </Text>
              <AntDesign name="star" size={15} color={COLORS.primary} />
            </View>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "black" }}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: "50%",
                height: height * 0.08,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                La recette
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                width: "50%",
                height: height * 0.08,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{ color: "black", fontSize: 20, fontWeight: "bold" }}
              >
                Nutrition
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              justifyContent: "space-evenly",
              backgroundColor: "black",
            }}
          >
            <Text
              style={{
                fontSize: 18,

                color: "white",
                textAlign: "center",
              }}
            >
              Difficulté {"\n"} {recipe.difficulty}
            </Text>
            <Text
              style={{
                fontSize: 18,

                color: "white",
                textAlign: "center",
              }}
            >
              Préparation {"\n"} {recipe.tempsPreparation} min
            </Text>
            <Text
              style={{
                fontSize: 18,

                color: "white",
                textAlign: "center",
              }}
            >
              Cuisson {"\n"} {recipe.tempsCuisson} min
            </Text>
          </View>
        </LinearGradient>
        <View
          style={{
            marginTop: "22%",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              INGREDIENTS
            </Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{}}>{nbr} REPAS</Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (nbr == 1) {
                      return;
                    }
                    setNbr((p) => p - 1);
                  }}
                >
                  <AntDesign
                    name="minussquareo"
                    size={30}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (nbr == 8) {
                      return;
                    }
                    setNbr((p) => p + 1);
                  }}
                >
                  <AntDesign
                    name="plussquareo"
                    size={30}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              borderRadius: 5,
              padding: 10,
            }}
          >
            {recipe.ingredients.map((item, index) => {
              return <IngredientComponent ingredient={item} key={index} />;
            })}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                height: 10,
                flex: 1,
              }}
            />
            <Text style={{ fontSize: 20, margin: 20, fontWeight: "bold" }}>
              Etapes de la recette
            </Text>
            <View
              style={{
                backgroundColor: COLORS.primary,
                height: 10,
                flex: 1,
              }}
            />
          </View>
          {recipe.steps.map((item, index) => {
            return <StepComponent step={item} index={index} key={index} />;
          })}
          <View style={{}}></View>
        </View>
      </ScrollView>
    </>
  );
};

export default IngredientScreen;

const styles = StyleSheet.create({});
