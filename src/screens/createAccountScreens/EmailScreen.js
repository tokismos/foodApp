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
  Button,
} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import LoginHeaderScreen from "../../components/LoginHeaderScreen";
import TextInputColored from "../../components/TextInputColored";
import { COLORS } from "../../consts/colors";
import auth from "@react-native-firebase/auth";
import useAuth from "../../hooks/useAuth";
import PhoneInputComponent from "../../components/PhoneInputComponent";

const { height, width } = Dimensions.get("screen");
const EmailComponent = ({ set, setIndex, index, refe, email }) => {
  return (
    <View style={{ width }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Saisissez votre adresse e-mail
        </Text>
        <TextInputColored label="E-mail" setChangeText={set} />
        <Text style={styles.description}>
          Vous devez confirmer cette adresse e-mail par la suite
        </Text>
      </View>
      <NextButton
        disabled={email == ""}
        onPress={() => {
          setIndex(index);
          refe.current.scrollToIndex({
            index,
            animation: true,
          });
        }}
      />
    </View>
  );
};
const PasswordComponent = ({ set, setIndex, index, refe, password }) => {
  return (
    <View style={{ width }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Créer un mot de passe.
        </Text>
        <TextInputColored label="Mot de passe" setChangeText={set} secured />
        {password.length < 8 && (
          <Text style={styles.description}>
            Votre mot de passe doit contenir au moins 8 caractères.
          </Text>
        )}
      </View>
      <NextButton
        disabled={password.length < 8}
        onPress={() => {
          setIndex(index);
          refe.current.scrollToIndex({
            index,
            animation: true,
          });
        }}
      />
    </View>
  );
};

const PhoneComponent = ({
  refe,
  setIndex,
  index,
  setPhoneNumber,
  setCountryCode,
  fullNumber,
}) => {
  const { sendPhoneVerification } = useAuth();
  return (
    <View style={{ backgroundColor: "red", width }}>
      <PhoneInputComponent
        setPhoneNumber={setPhoneNumber}
        setCountryCode={setCountryCode}
        style={{}}
      />
      <NextButton
        onPress={async () => {
          const status = await sendPhoneVerification(fullNumber);
          if (status == 200) {
            refe.current.scrollToIndex({
              index,
              animation: true,
            });
            setIndex(index);
          }
        }}
      />
    </View>
  );
};
const VerificationPhoneComponent = ({
  set,
  code,
  setCode,
  refe,
  setPhoneNumber,
  setCountryCode,
}) => {
  return (
    <>
      <Text>hi</Text>
    </>
    // <View style={{ backgroundColor: "red", width }}>
    //   <TextInputColored label="Code" setChangeText={set} />
    //   <NextButton
    //     onPress={async () => {
    //       const status = await sendPhoneVerification();
    //     }}
    //   />
    // </View>
  );
};
const NextButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.nextButton,
        backgroundColor: disabled ? COLORS.secondary : COLORS.primary,
      }}
    >
      <Text style={{ fontWeight: "bold", color: "white" }}>Suivant</Text>
    </TouchableOpacity>
  );
};
//Email component we forward the ref to scroll to index for flatlist,setIndex is to set index of header to know when scroll or goBack
const CreateComponent = forwardRef(
  (
    {
      index,
      setIndex,
      email,
      setEmail,
      setPassword,
      password,
      phoneNumber,
      setPhoneNumber,
      setCountryCode,
      fullNumber,
      code,
      setCode,
    },
    ref
  ) => {
    switch (index - 1) {
      case 0:
        return (
          <EmailComponent
            set={setEmail}
            refe={ref}
            setIndex={setIndex}
            index={index}
            email={email}
          />
        );

      case 1:
        return (
          <PasswordComponent
            set={setPassword}
            refe={ref}
            setIndex={setIndex}
            index={index}
            password={password}
          />
        );
      case 2:
        return (
          <PhoneComponent
            setPhoneNumber={setPhoneNumber}
            setCountryCode={setCountryCode}
            fullNumber={fullNumber}
            refe={ref}
            setIndex={setIndex}
            index={index}
          />
        );
      case 3:
        return (
          <VerificationPhoneComponent
            code={code}
            setPhoneNumber={setPhoneNumber}
            setCountryCode={setCountryCode}
            refe={ref}
            setIndex={setIndex}
            index={index}
          />
        );
      default:
        return <Text>hii</Text>;
    }
  }
);
const EmailScreen = ({}) => {
  const ref = createRef();
  const [ind, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [countryCode, setCountryCode] = useState("1");
  const [fullNumber, setFullNumber] = useState("");

  useEffect(() => {
    setFullNumber(`+${countryCode}${phoneNumber}`);
  }, [phoneNumber, countryCode]);
  useEffect(() => {
    console.log("fulkl", fullNumber);
  }, [fullNumber]);

  return (
    <View style={{}}>
      {/* innerRef to pass the ref of flatList to the component */}
      <LoginHeaderScreen innerRef={ref} index={ind} setIndex={setIndex} />
      <FlatList
        horizontal
        scrollEnabled={true}
        ref={ref}
        data={["email", "password", "tel", "verification"]}
        renderItem={({ index, item }) => {
          return (
            <CreateComponent
              setEmail={setEmail}
              email={email}
              password={password}
              setPassword={setPassword}
              fullNumber={fullNumber}
              setPhoneNumber={setPhoneNumber}
              code={code}
              setCode={setCode}
              ref={ref}
              index={index + 1}
              setIndex={setIndex}
              setCountryCode={setCountryCode}
              title={item}
            />
          );
        }}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  nextButton: {
    width: 120,
    justifyContent: "center",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  description: {
    marginTop: "5%",
    width: "90%",
    alignSelf: "center",
    fontSize: 12,
    textAlign: "center",
  },
});
