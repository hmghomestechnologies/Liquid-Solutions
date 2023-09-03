import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { colors, image1, SIZES, FONTS } from "../../../constants/theme";
import { InputField, LoadingBtn, SecBtn } from "../../components/Forms";
import { MainHeading } from "../../components/Typography";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { Storage } from "aws-amplify";
import Spinner from "react-native-loading-spinner-overlay";
import { useAuthContext } from "../../../context/AuthContext";

const RegisterScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [imgKey, setImgKey] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params;
  const preset_key = "triluxyapp";
  const cloud_name = "dc5ulgooc";
  function containsNonNumbers(input) {
    // Use a regular expression to check if the input contains non-numeric characters
    return /[^0-9]/.test(input);
  }

  const onSignUp = async () => {
    if (fullName === "" || email === "" || phone === "" || password === "") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Empty Fields",
        text2: "Please Filled all Fields",
      });
    } else if (containsNonNumbers(phone)) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Invalid Phone Number",
        text2: "Please Numbers are Phone Number only",
      });
    } else {
      setLoading(true);
      let user = {
        name: fullName,
        email: email.toLowerCase(),
        phoneNumber: phone.trim(),
        password: password,
        userRole: params.userType,
        profileImg: null,
        userStatus: "active",
      };
      if (profileImg === null) {
        user.profileImg =
          "https://res.cloudinary.com/dc5ulgooc/image/upload/v1679504085/403554_ib5oa4.png";
      } else {
        const imageData = new FormData();
        imageData.append("file", profileImg);
        imageData.append("upload_preset", preset_key);
        await axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            imageData
          )
          .then((res) => {
            user.profileImg = res?.data?.secure_url;
          })
          .catch((error) => {
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Error Occured, Couldn't Image",
              text2: "You can Update the Profile Later",
            });
            console.log(error);
          });
      }
      user.profileImg =
        "https://res.cloudinary.com/dc5ulgooc/image/upload/v1679504085/403554_ib5oa4.png";
      await axios
        .post(`${baseURL}/user/register`, user)
        .then((res) => {
          if (res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "User Register Succesfully",
              text2: "Please Login",
            });
            setLoading(false);
            setTimeout(() => {
              navigation.navigate("LoginScreen");
            }, 500);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.data?.message === undefined) {
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
              text1: `${error?.response?.data?.message}`,
              text2: "Please Try Again",
            });
          }
        });
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setProfileImg(result.assets[0]);
    }
  };
  return (
    <View
      style={{
        height: "100%",
        flex: 1,
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Spinner visible={loading} />
      <View
        style={{
          width: "100%",
          marginTop: 10,
          height: 220,
          position: "relative",
        }}
      >
        {/* Image Uploa8der */}
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: -20,
            zIndex: 100,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 120,
              width: 120,
              backgroundColor: "white",
              borderRadius: 999,
            }}
            onPress={pickImage}
          >
            {profileImg ? (
              <Image
                source={{ uri: profileImg?.uri }}
                style={{ height: "100%", width: "100%", borderRadius: 999 }}
              />
            ) : (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="image-plus"
                  size={50}
                  color={colors.secondary}
                />
                <Text
                  style={{
                    fontSize: SIZES.base,
                    fontFamily: FONTS.bold,
                    color: colors.gray,
                  }}
                >
                  Upload Profile Image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Image source={image1} style={{ height: "100%", width: "100%" }} />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ marginVertical: 20 }}>
          <MainHeading title={"SignUp"} marginVertical={5} />
          <Text
            style={{
              fontFamily: "OpenSansBold",
              textAlign: "center",
              color: colors.secondary,
            }}
          >
            Already have an Account?{" "}
            <Text
              style={{
                fontSize: 16,
                color: colors.primary,
                textDecorationLine: "underline",
              }}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              {" "}
              Sign In
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
              value={fullName}
              placeholder="Enter Your Name"
              Icon={AntDesign}
              iconName="user"
              setInput={setFullName}
            />
            <InputField
              value={email.toLowerCase().trim()}
              placeholder="Enter Your Email"
              Icon={MaterialIcons}
              iconName="email"
              setInput={setEmail}
              type={"email-address"}
            />
            <InputField
              value={phone.toLowerCase().trim()}
              placeholder="Enter Your Phone Number"
              Icon={Feather}
              iconName="phone-call"
              setInput={setPhone}
              type={"numeric"}
            />
            <InputField
              value={password}
              placeholder="Password"
              Icon={AntDesign}
              iconName="lock1"
              setInput={setPassword}
              password
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Ionicons
                name="checkmark-done-circle-sharp"
                size={24}
                color={colors.secondary}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "OpenSansMedium",
                  fontWeight: "700",
                }}
              >
                By continuing you agree to our Terms and condition and the
                privacy Policy
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <SecBtn text={"Sign Up"} onBtnPress={onSignUp} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
