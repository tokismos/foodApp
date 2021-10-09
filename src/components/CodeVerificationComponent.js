import React, { createRef, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import LottieView from "lottie-react-native";

import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";

const { width, height } = Dimensions.get("window");

const CodeVerificationComponent = ({
  style,
  returnToInputNumber,
  code,
  setCode,
}) => {
  const [refresh, setRefresh] = useState(false);

  const CodeInput = ({ code }) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          backgroundColor: "white",
          width: 40,
          borderRadius: 10,
          borderWidth: 1,
          marginHorizontal: 5,
        }}
      >
        <Text style={styles.codeInput}>{code}</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        {
          width,
          alignItems: "center",
        },
        { ...style },
      ]}
    >
      <View
        style={{
          height: "60%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <LottieView
            autoPlay
            resizeMode="cover"
            speed={1}
            style={{
              width: 70,
              height: 70,
            }}
            source={require("../assets/smsSent.json")}
          />
          <Text style={{ fontSize: 16 }}>
            SMS sent to <Text style={{ fontWeight: "bold" }}>+21267534697</Text>
          </Text>
        </View>
        {/* <Text style={{ textAlign: "center", fontSize: 20, margin: 20 }}>
        We have sent you the code to{" "}
        <Text style={{ fontWeight: "bold" }}> +212 675234067 </Text>
    </Text> */}
        <View style={{ flexDirection: "row", marginVertical: 20 }}>
          <CodeInput code={[...code][0]} />
          <CodeInput code={[...code][1]} />
          <CodeInput code={[...code][2]} />
          <CodeInput code={[...code][3]} />
          <CodeInput code={[...code][4]} />
          <CodeInput code={[...code][5]} />
        </View>
      </View>
      <View style={{ height: "40%" }}>
        <TouchableOpacity disabled={!refresh} style={styles.resendButton}>
          <Text style={styles.text}>Resend code !</Text>
          {refresh ? (
            <FontAwesome name="refresh" size={29} color={COLORS.primary} />
          ) : (
            <CountdownCircleTimer
              isPlaying
              duration={45}
              initialRemainingTime={3}
              colors={COLORS.primary}
              size={30}
              strokeWidth={2}
              strokeLinecap="square"
              arialabel
              children={({ remainingTime }) => {
                return <Text>{remainingTime}</Text>;
              }}
              onComplete={() => setRefresh(true)}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resendButton}
          onPress={() => returnToInputNumber()}
        >
          <Text style={styles.text}>Change number</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CodeVerificationComponent;

const styles = StyleSheet.create({
  codeInput: {
    textAlign: "center",
    fontSize: 20,
  },
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 100,
    height: 50,
    borderBottomWidth: 0.2,
  },
  text: { fontSize: 16 },
});
