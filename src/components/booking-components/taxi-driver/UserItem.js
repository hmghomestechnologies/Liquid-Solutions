import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { getWordDate } from "../../../../constants/functions";
import FormatedNumber from "../../FormatedNumber";
import { containerDark } from "../../../../constants/layouts";
import { useAuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../../constants/baseURL";
import { useTaxiContext } from "../../../../context/TaxiContext";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { PrimaryBtn } from "../../Forms";

const UserItem = ({ data, driver }) => {
  const [isLoading, setIsLoading] = useState(null);
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { setDriverBookings } = useTaxiContext();

  const {
    _id,
    status,
    createdAt,
    amount,
    pickupDate,
    pickupTime,
    originDesc,
    destDesc,
    userId,
  } = data;
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const resData = {
    bookingId: _id,
    assignedCarId: driver?._id,
    userId,
    driverEmail: authUser?.email,
  };

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
  const onAccept = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/taxi/accept-request`, resData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Request has been accepted Successfully!!",
            text2: "Your Has accept the User's ride request.",
          });
          axios
            .get(
              `${baseURL}/taxi/bookings/location/${res?.data?.rideCity}`,
              config
            )
            .then((res) => {
              setDriverBookings(res.data);
              setIsLoading(false);
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
  const onStartTrip = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/taxi/start-trip`, resData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Trip Start Successfully!!",
            text2: "You have picked up the user from their Location.",
          });
          axios
            .get(`${baseURL}/taxi/bookings/driver/${driver?._id}`, config)
            .then((res) => {
              setDriverBookings(res.data);
              setIsLoading(false);
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
  const onEndTrip = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/taxi/end-trip`, resData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Trip Ended Successfully!!",
            text2: "You have Drop off user to their Destination.",
          });
          axios
            .get(`${baseURL}/taxi/bookings/driver/${driver?._id}`, config)
            .then((res) => {
              setDriverBookings(res.data);
              setIsLoading(false);
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
      onPress={() => navigation.navigate("TaxiBookingDetails", { data })}
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
        <View style={{ width: "70%" }}>
          <View>
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                //   fontSize: SIZES.medium,
              }}
            >
              {`${originDesc}`}
            </Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <FontAwesome name="angle-double-down" size={24} color="red" />
            </View>
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                //   fontSize: SIZES.medium,
              }}
            >
              {`${destDesc}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <Text>{`On ${getWordDate(pickupDate)} By ${pickupTime}`}</Text>
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
            width: "30%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            {status === "BOOKED" ? (
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
                onPress={onAccept}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Accept Request
                </Text>
              </TouchableOpacity>
            ) : status === "CONFIRMED" ? (
              <Text
                style={[
                  styles.badgeCont,
                  {
                    backgroundColor: colors.successColor,
                  },
                ]}
              >
                {"ACCEPTED & CONFIRMED"}
              </Text>
            ) : status === "CHECKEDIN" ? (
              <Text
                style={[
                  styles.badgeCont,
                  {
                    backgroundColor: colors.secondary,
                  },
                ]}
              >
                {"Trip In Progress"}
              </Text>
            ) : status === "CHECKEDOUT" ? (
              <Text
                style={[
                  styles.badgeCont,
                  {
                    backgroundColor: colors.successColor,
                  },
                ]}
              >
                {"TRIP ENDED"}
              </Text>
            ) : (
              <Text></Text>
            )}
          </View>
          <FormatedNumber
            value={amount}
            size={SIZES.medium}
            color={colors.darkPrimary}
          />
        </View>
      </View>
      {status === "CONFIRMED" ? (
        <View>
          <PrimaryBtn text={"Start Trip"} onBtnPress={onStartTrip} />
        </View>
      ) : status === "CHECKEDIN" ? (
        <View>
          <PrimaryBtn text={"End Trip"} onBtnPress={onEndTrip} />
        </View>
      ) : (
        <View />
      )}
      <Text
        style={{
          textAlign: "center",
          color: colors.gray,
          fontStyle: "italic",
          fontWeight: "600",
        }}
      >
        {status === "BOOKED"
          ? " Awaiting Your Confirmation"
          : status === "CONFIRMED"
          ? "User Awaiting Your Pick Up"
          : status === "CHECKEDIN"
          ? "User Already Picked Up, Safe Trip"
          : status === "CHECKEDOUT"
          ? "Trip Completed and Successful"
          : ""}
      </Text>
    </TouchableOpacity>
  );
};

export default UserItem;
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
