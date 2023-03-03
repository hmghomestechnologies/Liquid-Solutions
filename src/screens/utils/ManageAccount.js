import { ScrollView, StyleSheet, Text, View } from "react-native";
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

const ManageAccount = () => {
  const [info, setInfo] = useState(null);
  const [onLoading, setOnLoading] = useState(true);
  const { config } = useAuthContext();
  const { authUser } = useAuthContext();
  const navigation = useNavigation();

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
          navigation.navigate("profileScreen");
          console.log(err);
        });
    })();
  }, []);
  const { email, name, phoneNumber, profileImg } = authUser;
  // const { address, gender, state, town, zipCode } = info;
  if (onLoading) return <TransparentSpinner />;
  console.log(info);
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
          <View
            style={{
              height: 250,
              width: 250,
              marginHorizontal: "auto",
              marginVertical: 10,
            }}
          >
            <ImageCont source={profileImg} radius={999} />
          </View>
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
