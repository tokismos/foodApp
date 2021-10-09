import React, { forwardRef, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";

const { width, height } = Dimensions.get("window");

const PhoneInputComponent = forwardRef(
  ({ number, setCountryCode, style, error }, ref) => {
    // useEffect(() => {
    //   if (ref?.isValidNumber(number)) setError(true);
    // }, [number]);

    return (
      <View style={[{ width, alignItems: "center" }, { ...style }]}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            margin: 20,
            textAlign: "center",
          }}
        >
          Enter your phone number :
        </Text>
        <PhoneInput
          ref={ref}
          textInputProps={{
            value: number,
            editable: false,
          }}
          layout="first"
          withShadow
          defaultCode="US"
          onChangeCountry={(text) => setCountryCode(text.callingCode)}
        />
        {error ? (
          <Text style={{ color: "red", marginTop: 10 }}>
            Please enter a valid phone number !{" "}
          </Text>
        ) : null}
        <View style={{ margin: 40 }}>
          <Text>An SMS will be sent to your phone</Text>
          <Text style={{ textAlign: "center" }}>
            with the verification code.
          </Text>
        </View>
      </View>
    );
  }
);

export default PhoneInputComponent;

const styles = StyleSheet.create({});
