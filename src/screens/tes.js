import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { COLORS } from "../consts/colors";
import { signUp } from "../helpers/db";
const { width, height } = Dimensions.get("screen");
import { FontAwesome } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import TextInputColored from "../components/TextInputColored";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          height: 80,
          backgroundColor: COLORS.secondary,
          width,
          borderBottomLeftRadius: 40,
        }}
      />
      <View
        style={{
          backgroundColor: COLORS.secondary,
          flex: 1,
        }}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: COLORS.secondary,
            bottom: 0,
            width,
            height: 50,
          }}
        />
        <TouchableOpacity
          disabled
          style={{
            backgroundColor: COLORS.primary,
            height: 70,
            borderRadius: 15,
            position: "absolute",
            bottom: 20,
            left: 20,

            right: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Continue</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("PhoneVerificationScreen")}
          activeOpacity={0.8}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: COLORS.primary,
            position: "absolute",
            right: 10,
            bottom: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome name="arrow-right" size={24} color="white" />
        </TouchableOpacity> */}
        <View
          style={{
            backgroundColor: "white",
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
            alignItems: "center",
          }}
        >
          <View style={{ margin: 30 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 40,
              }}
            >
              Create Account
            </Text>
            <Text style={{ color: "grey", fontSize: 20, marginLeft: 20 }}>
              Sign Up to get started !
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.secondary,
              borderWidth: 1,
              width: width - 30,
            }}
          >
            <TextInputColored
              label="email"
              value={email}
              setChangeText={setEmail}
              leftIcon="email"
            />

            <TextInputColored
              label="Full Name"
              value={fullName}
              setChangeText={setFullName}
              leftIcon="card-account-details"
            />
            <TextInputColored
              label="Password"
              value={password}
              setChangeText={setPassword}
              leftIcon="lock"
              secured
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <Text>Already have an account ? </Text>
              <TouchableOpacity
                onPress={() => navigation.replace("HomeScreen")}
              >
                <Text style={{ fontWeight: "bold" }}>Sign In !</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 15, textAlign: "center" }}>
              By signing up, you agree to our{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Privacy Policy
              </Text>{" "}
              and{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Terms {"&"} Conditions.
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
