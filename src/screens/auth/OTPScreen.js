import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { logo, colors, image1 } from "../../../constants/theme";
import { InputField, SecBtn } from "../../components/Forms";
import { MainHeading } from "../../components/Typography";

const OTPScreen = () => {
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();

  const onConfirmOTP = async () => {
    try {
      if (otp === "") {
        // Thorw Error, and Continue other validations
      } else {
        await console.log(otp);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };
  return (
    <View
      style={{
        height: "100%",
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ width: "100%", marginTop: 30 }}>
        <Image source={image1} style={{ height: 250, width: "100%" }} />
      </View>
      <View style={{ marginVertical: 20 }}>
        <MainHeading title={"Confirmation Code"} marginVertical={5} />
        <Text
          style={{
            fontFamily: "OpenSansBold",
            textAlign: "center",
            color: colors.secondary,
          }}
        >
          Enter Confirmation Code
        </Text>
      </View>
      <View style={{ width: "100%", paddingHorizontal: 30 }}>
        <InputField
          value={otp}
          placeholder="OTP ex: 123456"
          Icon={Octicons}
          iconName="number"
          setInput={setOtp}
          type={"number-pad"}
        />
        <View style={{ marginTop: 5 }}>
          <SecBtn
            text={"Verify Confirmation Code"}
            // onBtnPress={onConfirmOTP}
            onBtnPress={() => navigation.navigate("VerificationScreen")}
          />
        </View>
      </View>
    </View>
  );
};

export default OTPScreen;
