import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { containerDark } from "../../../../constants/layouts";
import { getWordDate } from "../../../../constants/functions";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../../context/AuthContext";
import baseURL from "../../../../constants/baseURL";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { useRestaurantContext } from "../../../../context/RestaurantContext";
import TransparentSpinner from "../../TransparentSpinner";
import { PrimaryBtn, SecBtn } from "../../Forms";

const UserReservationItem = ({ data, isLoading, setIsLoading }) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { setResReservations, currentRestaurant } = useRestaurantContext();
  const {
    _id,
    restaurantId,
    reservePersons,
    status,
    createdAt,
    checkInDate,
    checkInTime,
    userId,
  } = data;
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  useEffect(() => {
    if (authUser) {
      axios
        .get(`${baseURL}/user/user/${userId}`, config)
        .then((res) => {
          setUser(res.data);
          setLoadingUser(false);
        })
        .catch((err) => {
          console.log(err);
        });
      return () => {
        setUser({});
      };
    }
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
  let Data = {
    id: _id,
    userEmail: user?.email,
    adminEmail: authUser?.email,
  };
  const onAccept = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/restaurant/admin/accept`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Reservation Request Accepted!!",
            text2: "You Have Accept the User's Reservation Request",
          });
          axios
            .get(
              `${baseURL}/restaurant/reservations/restaurant/${restaurantId}`,
              config
            )
            .then((res) => {
              setResReservations(res.data);
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
  const onDecline = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/restaurant/admin/decline`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Reservation Request Decline!!",
            text2: "You Have Declined the User's Reservation Request",
          });
          axios
            .get(
              `${baseURL}/restaurant/reservations/restaurant/${restaurantId}`,
              config
            )
            .then((res) => {
              setResReservations(res.data);
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
  const onCheckedIn = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/restaurant/admin/checkin`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "User Checked In Successfully!!!",
            text2: "You Have Checked In User",
          });
          axios
            .get(
              `${baseURL}/restaurant/reservations/restaurant/${restaurantId}`,
              config
            )
            .then((res) => {
              setResReservations(res.data);
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
  const onCheckedOut = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/restaurant/admin/checkout`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Reservation Checked Out!!",
            text2: "You Have Checked Out User",
          });
          axios
            .get(
              `${baseURL}/restaurant/reservations/restaurant/${restaurantId}`,
              config
            )
            .then((res) => {
              setResReservations(res.data);
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
      onPress={() =>
        navigation.navigate("RestaurantBookingDetails", {
          data,
          user,
          restaurant: currentRestaurant,
        })
      }
    >
      <Spinner visible={loadingUser} />
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
            {user?.name}
          </Text>
          <View>
            <Text
              style={{
                color: colors.secondary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.medium,
              }}
            >{`${getWordDate(checkInDate)} : ${checkInTime}`}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{`${reservePersons} Person(s)`}</Text>
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
          <View style={{ marginVertical: 8 }}></View>
          {status === "BOOKED" ? (
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
                onPress={onAccept}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.errorColor,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 15,
                  marginVertical: 10,
                  fontFamily: "OpenSansExtraBold",
                  paddingHorizontal: 15,
                }}
                onPress={onDecline}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Decline
                </Text>
              </TouchableOpacity>
            </>
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
                // onPress={onReturn}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  In Progress
                </Text>
              </TouchableOpacity>
            </>
          ) : status === "CHECKEDOUT" ? (
            <Text
              style={[
                styles.badgeCont,
                {
                  backgroundColor: colors.successColor,
                },
              ]}
            >
              {"Checked Out"}
            </Text>
          ) : status === "DECLINED" ? (
            <Text
              style={[
                styles.badgeCont,
                {
                  backgroundColor: colors.errorColor,
                },
              ]}
            >
              {"DECLINED"}
            </Text>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
      {status === "CONFIRMED" && (
        <SecBtn text={"Check In User"} onBtnPress={onCheckedIn} />
      )}
      {status === "CHECKEDIN" && (
        <PrimaryBtn text={"Check Out User"} onBtnPress={onCheckedOut} />
      )}
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
          ? "Awaiting Your Comfirmation"
          : status === "CONFIRMED"
          ? "Awaiting User's Checking In"
          : status === "CHECKEDIN"
          ? "User Reservation Started, Awaiting User's Check out"
          : status === "CHECKEDOUT"
          ? "Restaurant Reservation Completed - Booked, Checked In, Checked Ou"
          : "You Declined User's Reservation"}
      </Text>
    </TouchableOpacity>
  );
};

export default UserReservationItem;
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
