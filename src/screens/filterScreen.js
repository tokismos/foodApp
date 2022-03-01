import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../consts/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Oven from "../assets/oven.svg";
import Time from "../assets/time.svg";
import Livre from "../assets/livre.svg";
import Slider from "@react-native-community/slider";
import { ScrollView } from "react-native";
import { useRef } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const { width, height } = Dimensions.get("screen");
// const Header = () => {
//   const navigation = useNavigation();
//   return (
//     <View
//       style={{
//         backgroundColor: COLORS.primary,
//         width,
//         height: height * 0.2,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-around",
//       }}
//     >
//       <Pressable
//         onPress={() => navigation.navigate("FilterScreen")}
//         style={{
//           justifyContent: "center",
//           alignItems: "center",
//           height: "110%",
//         }}
//       >
//         <Livre height={40} width={40} fill="white" />
//         <Text style={styles.categorieTitle}>Types de plats {"\n"} (2)</Text>
//       </Pressable>
//       <View
//         style={{
//           justifyContent: "center",
//           alignItems: "center",

//           height: "110%",
//         }}
//       >
//         <Time height={40} width={40} fill="white" />

//         <Text style={styles.categorieTitle}>Temps </Text>
//       </View>
//       <View
//         style={{
//           justifyContent: "center",
//           alignItems: "center",

//           height: "110%",
//         }}
//       >
//         <MaterialCommunityIcons name="fish-off" size={40} color="white" />

//         <Text style={styles.categorieTitle}>Régimes </Text>
//       </View>
//       <View
//         style={{
//           justifyContent: "center",
//           alignItems: "center",

//           height: "110%",
//         }}
//       >
//         <Oven height={40} width={40} fill="white" />
//         <Text style={styles.categorieTitle}>Materiel </Text>
//       </View>
//     </View>
//   );
// };

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

const FilterScreen = forwardRef(({ pressedFilter }, ref) => {
  const [height, setHeight] = useState(0);
  const snapPoints = [height + 50, "85%"];

  useEffect(() => {
    console.log("HEIG", height);
  }, [height]);
  const onLayout = (e) => {
    setHeight(e.nativeEvent.layout.height);
  };

  const TypePlatsComponent = () => {
    const [plats, setPlats] = useState([]);

    useEffect(() => {
      console.log("PLAAAATS", plats);
    }, [plats]);
    return (
      <View
        onLayout={onLayout}
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
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>Types plats </Text>
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
            return (
              <Pressable
                key={i}
                onPress={() => {
                  if (plats.includes(item)) {
                    const filteredArray = plats.filter((elmt) => elmt != item);
                    return setPlats(filteredArray);
                  }

                  setPlats((p) => [...p, item]);
                }}
                style={{
                  backgroundColor: plats.includes(item)
                    ? COLORS.primary
                    : "white",
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
                    color: plats.includes(item) ? "white" : COLORS.primary,
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
  const RegimeComponent = () => {
    const [regimes, setRegimes] = useState([]);

    useEffect(() => {
      console.log("REEEGIIMES", regimes);
    }, [regimes]);
    return (
      <View
        onLayout={onLayout}
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
            return (
              <Pressable
                key={i}
                onPress={() => {
                  if (regimes.includes(item)) {
                    const filteredArray = regimes.filter(
                      (elmt) => elmt != item
                    );
                    return setRegimes(filteredArray);
                  }

                  setRegimes((p) => [...p, item]);
                }}
                style={{
                  backgroundColor: regimes.includes(item)
                    ? COLORS.primary
                    : "white",
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
                    color: regimes.includes(item) ? "white" : COLORS.primary,
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
  const MaterielsComponent = () => {
    const [materiels, setMateriels] = useState([]);

    useEffect(() => {
      console.log("REEEGIIMES", materiels);
    }, [materiels]);
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
            return (
              <Pressable
                key={i}
                onPress={() => {
                  if (materiels.includes(item)) {
                    const filteredArray = materiels.filter(
                      (elmt) => elmt != item
                    );
                    return setMateriels(filteredArray);
                  }

                  setMateriels((p) => [...p, item]);
                }}
                style={{
                  backgroundColor: materiels.includes(item)
                    ? COLORS.primary
                    : "white",
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
                    color: materiels.includes(item) ? "white" : COLORS.primary,
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
    return (
      <View
        onLayout={onLayout}
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
          onSlidingComplete={(i) => setTemps(i)}
          thumbTintColor={COLORS.primary}
          onValueChange={(i) => setTemps(i)}
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
  const [array, setArray] = useState([
    <TypePlatsComponent key={1} />,
    <RegimeComponent key={2} />,
    <TempsComponent key={4} />,
    <MaterielsComponent key={3} />,
  ]);

  useEffect(() => {
    if (pressedFilter === "types") {
      setArray([
        <TypePlatsComponent key={1} />,
        <RegimeComponent key={2} />,
        <TempsComponent key={4} />,
        <MaterielsComponent key={3} />,
      ]);
    } else if (pressedFilter === "temps") {
      setArray([
        <TempsComponent key={4} />,
        <TypePlatsComponent key={1} />,
        <RegimeComponent key={2} />,
        <MaterielsComponent key={3} />,
      ]);
    } else if (pressedFilter === "regimes") {
      setArray([
        <RegimeComponent key={2} />,
        <TempsComponent key={4} />,
        <TypePlatsComponent key={1} />,
        <MaterielsComponent key={3} />,
      ]);
    } else if (pressedFilter === "materiel") {
      setArray([
        <MaterielsComponent key={3} />,
        <RegimeComponent key={2} />,
        <TempsComponent key={4} />,
        <TypePlatsComponent key={1} />,
      ]);
    }
  }, [pressedFilter]);

  return (
    <BottomSheet
      enablePanDownToClose
      enableContentPanningGesture
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      handleStyle={{
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      }}
      handleIndicatorStyle={{
        backgroundColor: "white",
      }}
      backgroundComponent={() => {
        return (
          <View style={{ backgroundColor: "red", height: 300, width }}></View>
        );
      }}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          backgroundColor: COLORS.lightGrey,
          alignItems: "center",
        }}
      >
        {array}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

export default FilterScreen;

const styles = StyleSheet.create({});
