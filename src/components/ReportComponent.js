import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { api } from "../axios";

import CustomButton from "./CustomButton";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import TextInputColored from "./TextInputColored";
import auth from "@react-native-firebase/auth";

const { height, width } = Dimensions.get("screen");

const ReportItemComponent = ({
  title,
  isSelected,
  setIsSelected,
  setReport,
  report,
}) => {
  return (
    <>
      <Pressable
        onPress={() => {
          if (report == title) {
            return setReport("");
          }

          setReport(title);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            color: report == title ? COLORS.primary : "black",
            fontWeight: report == title ? "bold" : "600",
            fontSize: report == title ? 16 : 14,
          }}
        >
          {title}
        </Text>

        {report != title ? (
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        ) : (
          <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
        )}
      </Pressable>
      {title != "Autres :" && (
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            height: 0.2,
            backgroundColor: "gray",
          }}
        />
      )}
    </>
  );
};
const ReportComponent = ({ setShowReport, recipeName }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const reportsTab = [
    "Champs manquants ou vides",
    "Fautes d'orthographes",
    "Autres :",
  ];

  const sendEmail = async (fullName, reportTitle, message) => {
    setIsLoading(true);
    try {
      await api.post("/email", {
        fullName,
        title: reportTitle,
        message: ` ${fullName} a reporter la recette " ${recipeName} " - ${reportTitle} - ${message}`,
      });
      ToastAndroid.show(
        "Merci pour votre contribution! Ca nous fait plaisir de vous avoir parmis nous .",
        ToastAndroid.LONG
      );

      setShowReport(false);
    } catch (e) {
      Alert.alert("Erreur, message non envoyé !", e.message);
    }
    setIsLoading(false);
  };
  return (
    <View style={{ width: width * 0.8, padding: 5, marginTop: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons
          name="report"
          size={30}
          color="red"
          style={{ padding: 5 }}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Que voulez vous report{" "}
        </Text>
      </View>

      {reportsTab.map((item, index) => (
        <ReportItemComponent
          setIsSelected={setIsSelected}
          setReport={setReport}
          report={report}
          title={item}
          isSelected={isSelected}
        />
      ))}

      {report == "Autres :" && (
        <TextInputColored
          multiline
          setChangeText={setReportDescription}
          value={reportDescription}
          placeholder="N'hesitez pas a tout nous raconter "
        />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 20,
        }}
      >
        <CustomButton title="Annuler" onPress={() => setShowReport(false)} />
        <CustomButton
          isLoading={isLoading}
          disabled={report == ""}
          title="Envoyer"
          style={{ backgroundColor: "red", marginLeft: 10 }}
          onPress={async () => {
            await sendEmail(
              auth().currentUser?.displayName || "ANONYME",
              report,
              reportDescription
            );
          }}
        />
      </View>
    </View>
  );
};
export default ReportComponent;

const styles = StyleSheet.create({});
