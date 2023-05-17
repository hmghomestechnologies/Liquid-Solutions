import { StyleSheet, Text, View, Image, Alert, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { logo, colors, image1 } from "../../../constants/theme";
import { InputField, LoadingBtn, SecBtn } from "../../components/Forms";
import { MainHeading } from "../../components/Typography";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { useAuthContext } from "../../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const { isLoading, Login } = useAuthContext();

  const saveUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
      // Toast.show({
      //   topOffset: 60,
      //   type: "success",
      //   text1: "Success",
      //   text2: "Login Succesful",
      // });
      navigation.navigate("HotelHome");
    } catch (e) {
      // saving error
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Error occur!!!",
        text2: "Please Try Again",
      });
      console.log(e);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const user = {
      email: email.toLowerCase().trim(),
      password,
    };
    if (email === "" || password === "") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Empty Fields",
        text2: "Please Filled all Fields",
      });
      setLoading(false);
    } else {
      setLoading(false);
      Login(user);
      // axios
      //   .post(`${baseURL}/user/login`, user)
      //   // .then((response) => response.text())
      //   .then((res) => {
      //     console.log(res.data);
      //     saveUser(res.data);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     Toast.show({
      //       topOffset: 60,
      //       type: "error",
      //       text1: "Invalid Emaill or Password",
      //       text2: "Please Try Again",
      //     });
      //     setLoading(false);
      //   });
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
        backgroundColor: "white",
      }}
    >
      <Spinner visible={isLoading} />
      <View style={{ width: "100%", marginTop: 20 }}>
        <Image source={image1} style={{ height: 250, width: "100%" }} />
      </View>
      <View style={{ paddingHorizontal: 20, width: "100%" }}>
        <View style={{ marginVertical: 40 }}>
          <MainHeading title={"Sign In"} marginVertical={5} />
          <Text
            style={{
              fontFamily: "OpenSansBold",
              textAlign: "center",
              color: colors.secondary,
            }}
          >
            Don't Have an Account?{" "}
            <Text
              style={{
                fontSize: 16,
                color: colors.primary,
                textDecorationLine: "underline",
              }}
              onPress={() =>
                navigation.navigate("RegisterScreen", { userType: "User" })
              }
            >
              Sign Up
            </Text>
          </Text>
        </View>
        <View style={{ width: "100%", zIndex: 20 }}>
          <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
          >
            <InputField
              value={email.toLowerCase().trim()}
              placeholder="Enter Your Email"
              Icon={MaterialIcons}
              iconName="email"
              setInput={setEmail}
              type={"email-address"}
            />
            <InputField
              value={password}
              placeholder="Password"
              Icon={AntDesign}
              iconName="lock1"
              setInput={setPassword}
              password
            />
            <View style={{ marginTop: 20 }}>
              {loading ? (
                <LoadingBtn />
              ) : (
                <SecBtn text={"Login"} onBtnPress={handleSubmit} />
              )}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
