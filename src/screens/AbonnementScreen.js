import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CommunitySVG from "../assets/Community.svg";
import { Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

const { height, width } = Dimensions.get("screen");
const ItemList = ({ title, description, children }) => {
  return (
    <View
      style={{
        width: "90%",
        flexDirection: "row",
        padding: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: "20%",
          alignItems: "center",
        }}
      >
        {children}
      </View>
      <View style={{ width: "80%" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 5 }}>
          {title}
        </Text>
        <Text style={{ marginHorizontal: 5 }}>{description}</Text>
      </View>
    </View>
  );
};
const GREEN = "#3d741c";
const Row = ({ title, first, last }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: "50%",
          justifyContent: "center",
        }}
      >
        <Text style={{}}>{title}</Text>
      </View>
      <View
        style={{
          width: "25%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {first && <FontAwesome name="check" size={35} color="#3d741c" />}
      </View>
      <View
        style={{
          width: "25%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e8f4e1",
          flex: 1,
          borderBottomLeftRadius: last ? 15 : 0,
          borderBottomRightRadius: last ? 15 : 0,
        }}
      >
        <FontAwesome name="check" size={35} color="#3d741c" />
      </View>
    </View>
  );
};

const AvantagesSuperYuzu = () => {
  return (
    <View
      style={{
        width: width * 0.9,
        marginVertical: 20,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          marginVertical: 40,
        }}
      >
        Libère encore plus de temps en devenant un super yuzer
      </Text>
      <View style={{ width: width * 0.9 }}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={{ width: "50%" }}></View>
          <Text
            style={{
              width: "25%",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "#3d741c",
            }}
          >
            Yuzu Super
          </Text>
          <View
            style={{
              width: "25%",
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: "#e8f4e1",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: "#3d741c",
              }}
            >
              Yuzu Gratuit
            </Text>
          </View>
        </View>
        <Row title="Recettes et listes" first />
        <Row title="Accès illimité" />
        <Row title="Avant-premières" />
        <Row title="Pas de publicités" />
        <Row title="Rejoins notre communauté" />
        <Row title="Soutenir notre mission" last />
      </View>
    </View>
  );
};

const AbonnementScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={{ width: "100%", alignItems: "center", marginTop: 40 }}>
        <Image
          style={{ height: 300, width: 200 }}
          source={require("../assets/vegetable.jpeg")}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              color: "#3d741c",
              fontWeight: "bold",
              marginBottom: 30,
              width: width * 0.9,
            }}
          >
            Participe à l'effort de guerre et soutien notre projet en devenant
            un super-yuzer 💪
          </Text>
          <ItemList
            title="Accès illimité"
            description="Swipe et prépare autant de recettes que tu veux."
          >
            <Entypo name="infinity" size={50} color="black" />
          </ItemList>
          <ItemList
            title="Avant-premières"
            description="Découvre avant tout le monde nos nouvelles recettes en exclusivité"
          ></ItemList>
          <ItemList
            title="Pas de publicités"
            description="Fini les publicités ininteressante."
          />
          <ItemList
            title="Rejoint notre communauté"
            description="Rejoins notre groupe de 
        super-yuzers et donne ton avis pour notre avenir."
          >
            <CommunitySVG height="40" width="40" fill="black" />
          </ItemList>
        </View>

        <View style={{}}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 26,
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            Soutiens notre misson
          </Text>
          <View style={{ height: 200 }}>
            <LottieView source={require("../assets/earth.json")} autoPlay />
          </View>
          <Text style={{ textAlign: "center", width: width * 0.9 }}>
            Grâce à toi, des centaines de personnes vont pouvoir améliorer leurs
            santés gratuitement et réduire leurs impacts grâce à leur
            alimentation
          </Text>
        </View>
      </View>
      <AvantagesSuperYuzu />

      <CustomButton
        title="2 semaines offertes !"
        style={{
          width: width * 0.7,
          backgroundColor: GREEN,
          borderRadius: 5,
          marginVertical: 20,
        }}
        textStyle={{ fontSize: 20 }}
      />
      <Pressable>
        <Text style={{ fontSize: 20 }}>Non,merci</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AbonnementScreen;

const styles = StyleSheet.create({});
