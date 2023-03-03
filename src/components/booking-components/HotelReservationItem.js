import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
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
import { useHotelContext } from "../../../context/HotelContext";
import TransparentSpinner from "../TransparentSpinner";

const HotelReservationItem = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hotel, setHotel] = useState(null);
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { setUserReservations, hotels } = useHotelContext();
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const {
    _id,
    amount,
    assignedRoomId,
    categoryId,
    checkInDate,
    checkOutDate,
    createdAt,
    hotelId,
    isPaid,
    nights,
    status,
    transId,
    updatedAt,
    userId,
  } = data;
  useEffect(() => {
    axios
      .get(`${baseURL}/hotel/hotel/${data?.hotelId}`, config)
      .then((res) => {
        setHotel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setHotel({});
    };
  }, []);
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
    <>
      {hotel ? (
        <TouchableOpacity
          style={[containerDark, {}]}
          //   onPress={() => navigation.navigate("BookedCarDetails", { data })}
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
            <View style={{ width: "80%" }}>
              <Text
                style={{
                  color: colors.secondary,
                  fontFamily: FONTS.semiBold,
                  fontSize: SIZES.medium,
                }}
              >
                {hotel?.hotelName}
              </Text>
              <View>
                <Text>Reservation ID:</Text>
                <Text>{_id}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>{`1 Room  |-| ${nights} Nights`}</Text>
              </View>
              <Text
                style={{
                  fontSize: SIZES.small,
                  color: "gray",
                  fontFamily: FONTS.medium,
                }}
              >
                {getDate()}
              </Text>
            </View>
            <View>
              <FormatedNumber
                value={amount}
                size={SIZES.medium}
                color={colors.primary}
              />

              {isPaid ? (
                <Text
                  style={{
                    backgroundColor: "#33cc33",
                    textAlign: "center",
                    color: "white",
                    fontSize: SIZES.small,
                    fontFamily: FONTS.bold,
                    borderRadius: 10,
                    marginVertical: 4,
                    padding: 2,
                  }}
                >
                  PAID
                </Text>
              ) : (
                <Text
                  style={{
                    backgroundColor: "#ff0000",
                    textAlign: "center",
                    color: "white",
                    fontSize: SIZES.small,
                    fontFamily: FONTS.bold,
                    borderRadius: 10,
                    marginVertical: 4,
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                  }}
                >
                  Not Paid
                </Text>
              )}
              <Text>{status}</Text>
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
              ? "Reservation Awaiting Comfirmation"
              : status === "CONFIRMED"
              ? "Reservation Confirmed, Awaiting your Check In"
              : status === "CHECKEDIN"
              ? "Awaiting Your Checking Out"
              : status === "CHECKEDOUT"
              ? "Reservation Completed, You Reserved, Checked In, Checked Out"
              : "Your Reservation was rejected"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default HotelReservationItem;

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
