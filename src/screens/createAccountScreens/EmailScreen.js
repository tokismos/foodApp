import React, {
  createRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  BackHandler,
} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import LoginHeaderScreen from "../../components/LoginHeaderScreen";
import TextInputColored from "../../components/TextInputColored";
import { COLORS } from "../../consts/colors";

const { height, width } = Dimensions.get("screen");

//Email component we forward the ref to scroll to index for flatlist,setIndex is to set index of header to know when scroll or goBack
const EmailComponent = forwardRef(({ index, title, setIndex }, ref) => {
  return (
    <View style={{ backgroundColor: COLORS.secondary, width }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{title}</Text>
        <TextInputColored label="Adresse e-mail" />
        <Text
          style={{
            marginTop: "5%",
            width: "90%",
            alignSelf: "center",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Vous devez confirmer cette adresse e-mail par la suite.
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIndex(index);
            ref.current.scrollToIndex({
              index,
              animation: true,
            });
          }}
          style={{
            backgroundColor: COLORS.primary,
            width: 120,
            justifyContent: "center",
            height: 50,
            alignItems: "center",
            borderRadius: 10,
            alignSelf: "center",
            marginTop: "7%",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
const EmailScreen = ({}) => {
  const ref = createRef();
  const [ind, setIndex] = useState(0);

  return (
    <View style={{}}>
      {/* innerRef to pass the ref of flatList to the component */}
      <LoginHeaderScreen innerRef={ref} index={ind} setIndex={setIndex} />
      <FlatList
        horizontal
        scrollEnabled={true}
        ref={ref}
        data={["email", "password", "tel"]}
        renderItem={({ index, item }) => (
          <EmailComponent
            ref={ref}
            index={index + 1}
            setIndex={setIndex}
            title={item}
          />
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({});
