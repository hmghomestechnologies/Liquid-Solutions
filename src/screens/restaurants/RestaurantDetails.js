import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  FilterContainer,
  FormatedNumber,
  ImageCont,
  ImageSlider,
  MapMarker,
  SearchResultHeader,
  SubHeader,
  TransparentSpinner,
  WarningText,
} from "../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors, FONTS, SHADOWS, SIZES, width } from "../../../constants/theme";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { SecBtn } from "../../components/Forms";
import { getWordDate } from "../../../constants/functions";
import { useAuthContext } from "../../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import Toast from "react-native-toast-message";

const RestaurantDetails = ({}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { data, searchedData } = route?.params;
  const { authUser } = useAuthContext();
  const {
    _id,
    address,
    description,
    fImg,
    restaurantName,
    images,
    state,
    town,
  } = data;
  const { checkInDate, persons, checkInTime, city } = searchedData;

  const onCompleteReservation = () => {
    setBtnLoading(true);
    let reservationData = {
      userId: authUser?._id,
      restaurantId: _id,
      transId: uuidv4(),
      checkInDate: checkInDate,
      checkInTime: checkInTime,
      reservePersons: persons,
      status: "BOOKED",
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authUser?.token}`,
      },
    };
    axios
      .post(`${baseURL}/restaurant/reservations`, reservationData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Restaurant Booked Succesfully",
            text2: "You can confirm your reservation",
          });
          setTimeout(() => {
            setBtnLoading(false);
            navigation.reset({
              index: 0,
              routes: [{ name: "ManageBookings" }],
            });
          }, 1500);
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
        setBtnLoading(false);
      });
  };
  if (btnLoading) return <TransparentSpinner />;
  return (
    <View style={{ paddingTop: 23, height: "100%" }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ width: "100%", marginTop: 20 }}>
          <View
            style={{
              height: 250,
              width: width - 50,
              borderRadius: 10,
              marginHorizontal: 25,
            }}
          >
            <ImageCont source={fImg} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.medium,
                color: colors.darkSecondary,
              }}
            >
              {restaurantName}
            </Text>
          </View>
          <View style={styles.miniCont}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    color: colors.darkPrimary,
                  }}
                >
                  Check In Date
                </Text>
                <Text style={styles.contDesc}>
                  {getWordDate(searchedData.checkInDate)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    color: colors.darkPrimary,
                  }}
                >
                  CheckIn Time
                </Text>
                <Text style={styles.contDesc}>{checkInTime}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    color: colors.darkPrimary,
                  }}
                >
                  Person(s)
                </Text>
                <Text style={styles.contDesc}>{persons}</Text>
              </View>
            </View>
          </View>
          <View style={styles.miniCont}>
            <Text style={{ fontFamily: FONTS.bold }}>Address: </Text>
            <Text
              style={{
                fontSize: SIZES.font,
                fontFamily: FONTS.regular,
                fontWeight: "500",
                color: "gray",
                fontStyle: "italic",
              }}
            >
              {`${address}, ${town}, ${state}, Nigeria.`}
            </Text>
          </View>
          <View style={styles.miniCont}>
            <SubHeader text={"Description"} color={colors.primary} />
            <Text
              style={{
                marginVertical: 5,
                color: "gray",
                fontFamily: FONTS.medium,
                textAlign: "justify",
              }}
            >
              {description}
            </Text>
          </View>
          {/* Facilities */}
          {/* <View style={styles.miniCont}>
            <SubHeader text={"Facilities"} color={colors.primary} />
            <View>
              {facilities.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 5,
                  }}
                  key={index}
                >
                  <FontAwesome5
                    name="angellist"
                    size={24}
                    color={colors.secondary}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      fontSize: SIZES.small,
                      marginLeft: 10,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View> */}
        </View>
        <View style={{ height: 70, width: "100%" }} />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <SecBtn
          text={"Reservation Restaurant"}
          onBtnPress={onCompleteReservation}
        />
      </View>
      {/* <TouchableOpacity
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          backgroundColor: colors.primary,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderTopLeftRadius: 14,
          borderBottomLeftRadius: 14,
        }}
        onPress={() =>
          navigation.navigate("FoodMenuIndexScreen", {
            id: _id,
            restaurantName,
          })
        }
      >
        <Text
          style={{ color: "white", fontWeight: "700", fontSize: SIZES.medium }}
        >
          Menu Items
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default RestaurantDetails;
const styles = StyleSheet.create({
  miniCont: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    ...SHADOWS.light,
  },
  contDesc: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    color: colors.primary,
    textAlign: "center",
  },
});
