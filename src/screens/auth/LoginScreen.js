import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import {
  logo,
  colors,
  image1,
  Logo,
  OnBoardImg,
} from "../../../constants/theme";
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
    } catch (error) {
      if (error.response?.data.message) {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: `${error.response?.data.message}`,
          text2: "Please Try Again",
        });
      } else if (error.response?.data === undefined) {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: `${error?.message}`,
          text2: "Please Try Again",
        });
      } else {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: `${error.response?.data}`,
          text2: "Please Try Again",
        });
      }
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
    <ImageBackground
      source={OnBoardImg}
      style={{
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(20, 62, 100, 0.6)",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          // paddingBottom: 40,
          // paddingHorizontal: 40,
        }}
      >
        <Spinner visible={isLoading} />
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={Logo} style={{ height: 60, width: 60 }} />
          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              color: "white",
              marginBottom: 50,
            }}
          >
            Triluxy
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: 30,
            paddingTop: 20,
          }}
        >
          <Text
            style={{
              color: colors.secondary,
              fontSize: 30,
              fontWeight: "600",
              textAlign: "left",
              marginVertical: 10,
              marginBottom: 20,
            }}
          >
            Login
          </Text>
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
              <View style={{ marginTop: 10 }}>
                <SecBtn text={"Login"} onBtnPress={handleSubmit} />
              </View>
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
            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
