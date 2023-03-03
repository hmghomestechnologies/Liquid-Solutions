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

  const onSignUp = async () => {
    setLoading(true);
    if (fullName === "" || email === "" || phone === "" || password === "") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Empty Fields",
        text2: "Please Filled all Fields",
      });
      setLoading(false);
    } else if (profileImg === null) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Profile Image needed",
        text2: "Please Upload Your Profile Image",
      });
      setLoading(false);
    } else {
      let user = {
        name: fullName,
        email: email.toLowerCase(),
        phoneNumber: phone.toLowerCase().trim(),
        password: password,
        userRole: params.userType,
        profileImg: null,
        userStatus: "active",
      };
      user.profileImg = await uploadFile(profileImg);
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
          console.log(error);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something Went wrong",
            text2: "Please Try Again",
          });
          setLoading(false);
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
    if (!result.cancelled) {
      setProfileImg(result.uri);
    }
  };
  const uploadFile = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png", // contentType is optional
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
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
          marginTop: 20,
          height: 250,
          position: "relative",
        }}
      >
        {/* Image Uploader */}
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: -10,
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
                source={{ uri: profileImg }}
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
