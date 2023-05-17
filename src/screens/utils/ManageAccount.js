import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import {
  ImageCont,
  MapMarker,
  Spinner,
  SubHeader,
  TransparentSpinner,
} from "../../components";
import AddOtherUserInfo from "../../components/AddOtherUserInfo";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageAccount = () => {
  const [info, setInfo] = useState(null);
  const [onLoading, setOnLoading] = useState(true);
  const { config, authUser, isLoggedIn } = useAuthContext();
  const navigation = useNavigation();
  const preset_key = "triluxyapp";
  const cloud_name = "dc5ulgooc";

  console.log(config);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${baseURL}/user/get-user-info`, config)
        .then((res) => {
          setInfo(res.data);
          setOnLoading(false);
        })
        .catch((err) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error Occured, while Fetching You Profile Info",
            text2: "Please Refresh Your Network",
          });
          // navigation.navigate("profileScreen");
          console.log(err.response.data);
        });
    })();
  }, []);
  const { email, name, phoneNumber, profileImg } = authUser;
  // const { address, gender, state, town, zipCode } = info;
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setOnLoading(true);
      const source = {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "profileImg.jpg",
      };
      const data = new FormData();
      data.append("file", source);
      data.append("upload_preset", preset_key);
      data.append("cloud_name", cloud_name);
      fetch("https://api.cloudinary.com/v1_1/dc5ulgooc/image/upload", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          let postData = {
            profileImg: data?.secure_url,
            userId: authUser?._id,
          };
          await axios
            .put(`${baseURL}/user/update-profile-img`, postData, config)
            .then(async (res) => {
              if (res.status == 201) {
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Profile Image Updated Succesfully",
                  text2: "You can now Manage Youur Details",
                });
                console.log(res.data);
                await AsyncStorage.removeItem("user", jsonValue);
                const jsonValue = JSON.stringify(res?.data);
                await AsyncStorage.setItem("user", jsonValue);
                await isLoggedIn();
                setOnLoading(false);
                navigation.navigate("ProfileScreen");
              } else {
                Toast.show({
                  topOffset: 60,
                  type: "error",
                  text1: "Something Went wrong",
                  text2: "Please Try Again",
                });
                setOnLoading(false);
              }
            })
            .catch((error) => {
              console.log(error.response);
              Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something Went wrong",
                text2: "Please Try Again",
              });
              setOnLoading(false);
            });
        })
        .catch((err) => {
          setOnLoading(false);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error Occured, Couldn't Image",
            text2: "Please Try Again",
          });
          console.log(err);
        });
    }
  };
  if (onLoading) return <TransparentSpinner />;
  return (
    <ScrollView>
      {info ? (
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          {/* Profile Image */}
          <TouchableOpacity
            style={{
              height: 150,
              width: 150,
              marginHorizontal: "auto",
              marginVertical: 10,
              borderRadius: 999,
              // backgroundColor: "red",
              position: "relative",
            }}
            // onPress={pickImage}
          >
            <View
              style={{
                position: "absolute",
                top: "35%",
                zIndex: 999,
                left: "35%",
              }}
            >
              <MaterialCommunityIcons
                name="image-edit-outline"
                size={50}
                color={colors.primary}
              />
            </View>
            <View style={{ opacity: 0.6 }}>
              <ImageCont source={profileImg} radius={999} />
            </View>
          </TouchableOpacity>
          {/* Profile Info */}
          <SubHeader text={"Profile Infomation"} />
          <View style={styles.miniCont}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <View>
                <View style={{ marginVertical: 5 }}>
                  <Text style={styles.textTitle}>Name:</Text>
                  <Text style={styles.textSub}>{name}</Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <Text style={styles.textTitle}>Gender:</Text>
                  <Text style={styles.textSub}>{info?.gender}</Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <Text style={styles.textTitle}>Email:</Text>
                  <Text style={styles.textSub}>{email}</Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <Text style={styles.textTitle}>Phone No:</Text>
                  <Text style={styles.textSub}>{phoneNumber}</Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <Text style={styles.textTitle}>Address:</Text>
                  <View style={{ width: "100%", height: 10 }} />
                  <MapMarker
                    location={`${info?.address}, ${info?.town}, ${info?.state}.`}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <AddOtherUserInfo />
      )}
    </ScrollView>
  );
};

export default ManageAccount;

const styles = StyleSheet.create({
  miniCont: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    ...SHADOWS.medium,
  },
  textTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: colors.darkSecondary,
  },
  textSub: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.small,
    color: "gray",
  },
});
