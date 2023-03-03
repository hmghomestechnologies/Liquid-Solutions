import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { logo, colors, image1 } from "../../../constants/theme";
import { InputField, SecBtn } from "../../components/Forms";
import { MainHeading } from "../../components/Typography";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const onForgetPassword = async () => {
    try {
      if (email === "") {
        // Thorw Error, and Continue other validations
      } else {
        await console.log(email, password);
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
        <MainHeading title={"Forget Password"} marginVertical={5} />
        <Text
          style={{
            fontFamily: "OpenSansBold",
            textAlign: "center",
            color: colors.secondary,
          }}
        >
          Don't have an Account?{" "}
          <Text
            style={{
              fontSize: 16,
              color: colors.primary,
              textDecorationLine: "underline",
            }}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            {" "}
            Sign Up
          </Text>
        </Text>
      </View>
      <View style={{ width: "100%", paddingHorizontal: 30 }}>
        <InputField
          value={email}
          placeholder="Enter Your Email"
          Icon={MaterialIcons}
          iconName="email"
          setInput={setEmail}
          type={"email-address"}
        />
        <View style={{ marginTop: 5 }}>
          <SecBtn
            text={"Send Confirmation Code"}
            // onBtnPress={onForgetPassword}
            onBtnPress={() => navigation.navigate("OTPScreen")}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;
