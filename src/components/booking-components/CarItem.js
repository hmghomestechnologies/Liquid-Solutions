import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import FormatedNumber from "../FormatedNumber";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { containerDark } from "../../../constants/layouts";
import { getWordDate } from "../../../constants/functions";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import baseURL from "../../../constants/baseURL";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useCarContext } from "../../../context/CarContext";

const CarItem = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { setBookings } = useCarContext();
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const {
    status,
    createdAt,
    amount,
    pickupDate,
    returnDate,
    days,
    _id,
    carOwnerId,
    carId,
  } = data;
  const getDate = () => {
    let tempDate = new Date(createdAt);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    return fDate;
  };
  const onPickedUp = () => {
    setIsLoading(true);
    let pickedUpData = {
      id: _id,
      carOwnerId,
      userEmail: authUser?.email,
      carId,
      name: authUser?.name,
      returnDate: getWordDate(returnDate),
    };
    axios
      .put(`${baseURL}/car/user/pickedup`, pickedUpData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Car Picked up!!",
            text2: "You Just Picked up the Car you rented",
          });
          axios
            .get(`${baseURL}/car/bookings/user/${authUser?._id}`, config)
            .then((res) => {
              setBookings(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          setIsLoading(false);
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
        setIsLoading(false);
      });
  };
  return (
    <TouchableOpacity
      style={[containerDark, {}]}
      onPress={() => navigation.navigate("BookedCarDetails", { data })}
    >
      <Spinner visible={isLoading} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ width: "60%" }}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.medium,
            }}
          >
            {`Car rented from ${getWordDate(pickupDate)} to ${getWordDate(
              returnDate
            )}`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <Text>{`Rented for ${days} Days`}</Text>
          </View>

          <Text
            style={{
              color: "gray",
              fontFamily: FONTS.medium,
              paddingVertical: 5,
            }}
          >
            {getWordDate(getDate())}
          </Text>
        </View>
        <View
          style={{
            width: "40%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              paddingVertical: 5,
              paddingHorizontal: 8,
              backgroundColor:
                status === "RETURNED" ? colors.successColor : colors.secondary,
              borderRadius: 10,
              color: "white",
              fontFamily: FONTS.bold,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {status}
          </Text>
          <FormatedNumber
            value={amount}
            size={SIZES.medium}
            color={colors.successColor}
          />
          {status === "CONFIRMED" ? (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.successColor,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 15,
                  marginVertical: 10,
                  fontFamily: "OpenSansExtraBold",
                  paddingHorizontal: 15,
                }}
                onPress={onPickedUp}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Picked Up
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
      <Text
        style={{
          fontStyle: "italic",
          textAlign: "center",
          fontSize: SIZES.small,
          color: colors.gray,
          fontFamily: FONTS.semiBold,
        }}
      >
        {status === "BOOKED"
          ? "Awaiting Car Owner's Comfirmation"
          : status === "CONFIRMED"
          ? "Awaiting Your Pick Up"
          : status === "PICKEDUP"
          ? "Awaiting Your return"
          : status === "RETURNED"
          ? "Ordered Completed, You booked, picked up and returned a Car"
          : "Your Booking was rejected"}
      </Text>
    </TouchableOpacity>
  );
};

export default CarItem;

const styles = StyleSheet.create({
  badgeCont: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    color: "white",
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginBottom: 10,
  },
});
