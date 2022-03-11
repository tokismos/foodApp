//C'est un modale qui affiche tous les differents components des filtres, et cela il s'active
// apres clique sur chaqun des filtres

import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import { COLORS } from "../consts/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Oven from "../assets/oven.svg";
import Time from "../assets/time.svg";
import Livre from "../assets/livre.svg";
import Slider from "@react-native-community/slider";
import { ScrollView } from "react-native";
import Modal from "react-native-modalbox";
import {
  addFilter,
  changeTime,
  removeFilter,
} from "../redux/slicer/recipeSlicer";
import { useDispatch, useSelector } from "react-redux";

const { width, height } = Dimensions.get("screen");

const typesPlatArray = [
  "Entrée",
  "Plat",
  "Sauce",
  "Dessert",
  "Petit dejeuner",
  "Sucré",
  "Salé",
];
const regimesArray = ["Viande", "Vegan", "Poisson", "Végétarien"];
const materielsArray = [
  "Four",
  "Four à micro-ondes",
  "Mixeur",
  "Robot Cuiseur",
  "Poisson",
  "Batteur ou fouet",
];

const TypePlatsComponent = ({ activeFilters }) => {
  const [plats, setPlats] = useState([]);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "90%",

        borderRadius: 10,
        alignItems: "center",

        paddingBottom: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
          margin: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24 }}> Types plats </Text>
        <Livre height={40} width={40} fill="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {typesPlatArray.map((item, i) => {
          const [selected, setSelected] = useState(
            activeFilters.some((i) => Object.values(i) == item)
          );

          return (
            <Pressable
              key={i}
              onPress={() => {
                if (selected) {
                  dispatch(removeFilter(item));
                  setSelected(false);
                } else {
                  dispatch(addFilter({ type: "typePlat", name: item }));
                  setSelected(true);
                }
              }}
              style={{
                backgroundColor: selected ? COLORS.primary : "white",
                borderWidth: 3,
                borderColor: COLORS.primary,
                borderRadius: 5,
                width: "45%",
                marginHorizontal: 5,
                marginVertical: 2,
                padding: 5,
              }}
            >
              <Text
                style={{
                  color: selected ? "white" : COLORS.primary,
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const RegimeComponent = ({ activeFilters }) => {
  const [regimes, setRegimes] = useState([]);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: "white",
        width: "90%",
        borderRadius: 10,
        alignItems: "center",
        paddingBottom: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
          margin: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Régime particulier{" "}
        </Text>
        <MaterialCommunityIcons name="fish-off" size={40} color="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {regimesArray.map((item, i) => {
          const [selected, setSelected] = useState(
            activeFilters.some((i) => Object.values(i) == item)
          );

          return (
            <Pressable
              key={i}
              onPress={() => {
                if (selected) {
                  dispatch(removeFilter(item));
                  setSelected(false);
                } else {
                  dispatch(addFilter({ type: "regimes", name: item }));
                  setSelected(true);
                }
              }}
              style={{
                backgroundColor: selected ? COLORS.primary : "white",
                borderWidth: 3,
                borderColor: COLORS.primary,
                borderRadius: 5,
                width: "45%",
                marginHorizontal: 5,
                marginVertical: 2,
                padding: 5,
              }}
            >
              <Text
                style={{
                  color: selected ? "white" : COLORS.primary,
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const MaterielsComponent = ({ activeFilters }) => {
  const [materiels, setMateriels] = useState([]);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: "white",
        width: "90%",
        borderRadius: 10,
        alignItems: "center",
        paddingBottom: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
          margin: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Materiels</Text>
        <Oven height={40} width={40} fill="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {materielsArray.map((item, i) => {
          const [selected, setSelected] = useState(
            activeFilters.some((i) => Object.values(i) == item)
          );

          return (
            <Pressable
              key={i}
              onPress={() => {
                if (selected) {
                  dispatch(removeFilter(item));
                  setSelected(false);
                } else {
                  dispatch(addFilter({ type: "material", name: item }));
                  setSelected(true);
                }
              }}
              style={{
                backgroundColor: selected ? COLORS.primary : "white",
                borderWidth: 3,
                borderColor: COLORS.primary,
                borderRadius: 5,
                width: "45%",
                marginHorizontal: 5,
                marginVertical: 2,
                padding: 5,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: selected ? "white" : COLORS.primary,
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const TempsComponent = () => {
  const [temps, setTemps] = useState(0);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "90%",
        borderRadius: 10,
        alignItems: "center",
        paddingBottom: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Temps max </Text>
        {temps !== 0 && (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              color: COLORS.primary,
            }}
          >
            {parseInt(temps)} min
          </Text>
        )}
        <Time height={40} width={40} fill="black" />
      </View>
      <Slider
        step={10}
        size={2}
        onSlidingComplete={(i) => {
          setTemps(i);

          dispatch(changeTime(i));
        }}
        thumbTintColor={COLORS.primary}
        onValueChange={(i) => {
          setTemps(i);
        }}
        style={{
          width: "90%",
          height: 40,
        }}
        minimumValue={0}
        maximumValue={120}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor="#000000"
        thumbStyle={{ width: 50, height: 50 }}
        thumbSize={60}
      />
    </View>
  );
};
const FilterScreen = forwardRef(({ pressedFilter }, ref) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("HOLA");
  }, [activeFilters]);
  const { activeFilters } = useSelector((state) => state.recipeStore);

  return (
    <Modal
      swipeThreshold={1}
      style={{
        width: "100%",
        height: Platform.OS === "ios" ? height * 0.74 : height * 0.78,
        justifyContent: "center",

        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      }}
      position="bottom"
      backdrop={true}
      ref={ref}
      isOpen={false}
      backdropOpacity={0}
    >
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 40,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 5,
            width: 50,
            borderRadius: 10,
          }}
        ></View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.lightGrey,
        }}
      >
        <TypePlatsComponent activeFilters={activeFilters} />
        <RegimeComponent activeFilters={activeFilters} />
        <TempsComponent />
        <MaterielsComponent activeFilters={activeFilters} />
      </ScrollView>
    </Modal>
  );
});

export default FilterScreen;

const styles = StyleSheet.create({});
