import React from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { COLORS } from "../consts/colors";
import { signUp } from "../helpers/db";
const { width, height } = Dimensions.get("screen");
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import TextInputColored from "../components/TextInputColored";
import { StackActions } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  return (
    <>
      <StatusBar backgroundColor={COLORS.secondary} />
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={{ flex: 1 }}
          >
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
                  justifyContent: "center",
                }}
              >
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      backgroundColor: COLORS.primary,
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 20,
                      elevation: 3,
                    }}
                  >
                    <MaterialIcons name="arrow-back" size={40} color="white" />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.secondary,
                  flex: 1,
                }}
              >
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
                    <Text
                      style={{ color: "grey", fontSize: 20, marginLeft: 20 }}
                    >
                      Sign Up to get started !
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: COLORS.secondary,
                      width: width - 30,
                      elevation: 1,
                      paddingTop: 15,
                    }}
                  >
                    <TextInputColored
                      label="Email"
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
                        onPress={() => navigation.navigate("HomeScreen")}
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
                  <View
                    style={{
                      backgroundColor: COLORS.secondary,

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
                      right: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      elevation: 3,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
