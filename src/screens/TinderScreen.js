import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../components/TinderCard";
import users from "../helpers/data/";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import AnimatedStack from "../components/AnimatedStack";
import { useDispatch, useSelector } from "react-redux";
import { addMatch, changeNumberOfRecipes } from "../redux/slicer/MatchSlicer";
import { COLORS } from "../consts/colors";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

const TinderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [nbrRecipe, setNbrReciepe] = useState(0);
  const { nbrOfRecipes, matches } = useSelector((state) => state.matchStore);

  const NbrMatchComponent = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: "15%",
          width: "90%",
          flexDirection: "row",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ width: "50%" }}>
          Combien de repas voulez vous cuisiner cette semaine
        </Text>
        <View
          style={{
            height: "60%",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              backgroundColor: "white",
              borderRadius: 5,
              padding: 3,
            }}
            placeholder="Number"
            onChangeText={setNbrReciepe}
          />
          <TouchableOpacity
            onPress={() => dispatch(changeNumberOfRecipes(+nbrRecipe))}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EF5454",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
          >
            <Text>Valider</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  useEffect(() => {
    console.log("nbr", nbrRecipe);
    console.log("nbr recipessss", nbrOfRecipes);
  }, [nbrRecipe, nbrOfRecipes]);
  const onSwipeLeft = (user) => {
    // console.warn("swipe left", user.name);
  };

  const onSwipeRight = (user) => {
    dispatch(addMatch(user.name));
    // console.warn("swipe right: ", user.name);
  };
  const bottomSheetModalRef = useRef(null);

  return (
    <View style={styles.pageContainer}>
      {/* <NbrMatchComponent /> */}
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: "10%",
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingRight: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("filterScreen")}>
          <FontAwesome5 name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <AnimatedStack
        data={users}
        renderItem={({ item, swipe }) => (
          <Card height="100%" width="100%" user={item} swipe={swipe} />
        )}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default TinderScreen;
