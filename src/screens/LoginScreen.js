import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../consts/colors";
import FbIcon from "../assets/fbIcon.svg";
import GoogleIcon from "../assets/GoogleIcon.svg";
import PhoneIcon from "../assets/phoneIcon.svg";
import { NavigationContainer } from "@react-navigation/native";
import { FbLogin, signIn, test } from "../helpers/db";
const { width, height } = Dimensions.get("screen");
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("hello@gmail.com");
  const [password, setPassword] = React.useState("testest");
  const [visible, setVisible] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#CDCDCD",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          width: width - 30,
          borderTopRightRadius: 50,
          marginTop: 100,
        }}
      >
        <Text style={{ fontSize: 40, textAlign: "center" }}>Sign In</Text>
        <TextInput
          theme={{ colors: { primary: COLORS.primary } }}
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        />
        <TextInput
          theme={{ colors: { primary: COLORS.primary } }}
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={visible}
          right={
            <TextInput.Icon
              name={visible ? "eye" : "eye-off"}
              onPress={() => setVisible(!visible)}
            />
          }
          style={{
            marginHorizontal: 20,
          }}
        />
        <Button
          mode="contained"
          onPress={() => {
            setLoading(!isLoading);
            signIn(email, password);
          }}
          style={{
            width: 250,
            alignSelf: "center",
            marginTop: 20,
            backgroundColor: COLORS.primary,
          }}
          color="red"
          loading={isLoading}
        >
          Sign In
        </Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: 50, height: 0.5, backgroundColor: "black" }} />
          <Text style={{ margin: 20 }}>Or login with</Text>
          <View style={{ width: 50, height: 0.5, backgroundColor: "black" }} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => FbLogin()}>
            <FbIcon
              width={40}
              height={40}
              fill={"blue"}
              style={{ marginHorizontal: 20 }}
            />
          </TouchableOpacity>
          <GoogleIcon width={40} height={40} fill={COLORS.primary} />
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 20 }}
        >
          <Text>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.replace("SignUpScreen")}>
            <Text style={{ fontWeight: "bold" }}>Sign Up !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
