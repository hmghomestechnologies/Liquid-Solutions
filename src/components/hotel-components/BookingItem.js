import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import { useHotelContext } from "../../../context/HotelContext";
import baseURL from "../../../constants/baseURL";
import { containerDark } from "../../../constants/layouts";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { getWordDate } from "../../../constants/functions";
import FormatedNumber from "../FormatedNumber";
import Toast from "react-native-toast-message";
import { OutlinedSecBtn, PrimaryBtn, SecBtn } from "../Forms";
const BookingItem = ({ data }) => {
  const [user, setUser] = useState({});
  const [category, setCategory] = useState({});
  const [hotel, setHotel] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { setHotelReservations } = useHotelContext();

  const {
    _id,
    amount,
    categoryId,
    checkInDate,
    checkOutDate,
    createdAt,
    hotelAdminId,
    hotelId,
    isPaid,
    nights,
    status,
    userId,
  } = data;
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };

  const getDatas = async () => {
    await axios
      .get(`${baseURL}/user/user/${userId}`, config)
      .then((res) => {
        setUser(res.data);
        setLoadingUser(false);
      })
      .catch((err) => {
        console.log("User Error", err);
      });
    await axios
      .get(`${baseURL}/category/${categoryId}`, config)
      .then((res) => {
        setCategory(res.data);
        setLoadingUser(false);
      })
      .catch((err) => {
        console.log("Category ", err);
      });
    await axios
      .get(`${baseURL}/hotel/hotel/${hotelId}`, config)
      .then((res) => {
        setHotel(res.data);
        setLoadingUser(false);
      })
      .catch((err) => {
        console.log("Hotel ", err);
      });
  };
  useEffect(() => {
    if (authUser) {
      getDatas();
    }
  }, []);
  let formData = {
    reserveId: _id,
    hotelAdminEmail: authUser?.email,
    userEmail: user?.email,
    categoryName: category?.categoryName,
    hotelName: hotel?.hotelName,
    checkInDate,
  };
  const onConfirmReservation = async () => {
    setIsLoading(true);
    await axios
      .put(`${baseURL}/hotel/reservations/confirm`, formData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Hotel Reservation Confirm Successfully!!",
            text2: "You Can now manage this reservation",
          });
          axios
            .get(`${baseURL}/hotel/reservations/admin/${authUser?._id}`, config)
            .then((res) => {
              setHotelReservations(res.data);
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
  const onCancelReservation = async () => {
    setIsLoading(true);
    await axios
      .put(`${baseURL}/hotel/reservations/cancel`, formData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Reservation Cancel Successfully!!",
            text2: "You Have Cancel This Reservation",
          });
          axios
            .get(`${baseURL}/hotel/reservations/admin/${authUser?._id}`, config)
            .then((res) => {
              setHotelReservations(res.data);
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
  const onCheckInReservation = async () => {
    setIsLoading(true);
    await axios
      .put(`${baseURL}/hotel/reservations/checkin`, formData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "You have Successfully Checked in This User",
            text2: "You Can now manage this reservation",
          });
          axios
            .get(`${baseURL}/hotel/reservations/admin/${authUser?._id}`, config)
            .then((res) => {
              setHotelReservations(res.data);
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
  const onCheckOutReservation = async () => {
    setIsLoading(true);
    await axios
      .put(`${baseURL}/hotel/reservations/checkout`, formData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "You have Successfully Checked Out This User",
            text2: "You Can now manage this reservation",
          });
          axios
            .get(`${baseURL}/hotel/reservations/admin/${authUser?._id}`, config)
            .then((res) => {
              setHotelReservations(res.data);
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
  // if (loadingUser || isLoading) return <TransparentSpinner />;
  return (
    <TouchableOpacity
      style={[containerDark, {}]}
      // onPress={() => navigation.navigate("BookedCarDetails", { data, user })}
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
        <View style={{ width: "65%" }}>
          {/* <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
            {`${user?.name} ${
              status === "BOOKED" ? "Wants to rent Your Car from" : ""
            } ${getWordDate(checkInDate)} to ${getWordDate(
              checkOutDate
            )} Which is  ${nights} nights`}
          </Text> */}
          {status === "BOOKED" ? (
            <Text style={{ fontFamily: FONTS.medium, fontSize: 15 }}>
              {`${user?.name} ${
                status === "BOOKED"
                  ? `Has Reserved for ${category.categoryName}, Checking In On `
                  : ""
              } ${getWordDate(checkInDate)} And Checkout On  ${getWordDate(
                checkOutDate
              )} Which is for  ${nights} nights`}
            </Text>
          ) : status === "CONFIRMED" ? (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
              {`${user?.name} Has Reservation for ${
                category.categoryName
              }, from ${getWordDate(checkInDate)} to ${getWordDate(
                checkOutDate
              )} ${nights} night(s), Was Confirmed`}
            </Text>
          ) : status === "CHECKEDIN" ? (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
              {`You Checked In ${user?.name} on ${getWordDate(
                checkInDate
              )} and expected to be Checked Out on ${getWordDate(
                checkOutDate
              )}.`}
            </Text>
          ) : status === "CHECKEDOUT" ? (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
              {`${user?.name} Has been Checked Out, He stays From ${getWordDate(
                checkInDate
              )} to ${getWordDate(checkOutDate)}, which was ${nights} Night(s)`}
            </Text>
          ) : (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
              {`You Cancel the reservation of ${user?.name} on ${getWordDate(
                checkInDate
              )}.`}
            </Text>
          )}
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
          <View style={{ marginVertical: 8 }}>
            <FormatedNumber
              value={amount}
              color={colors.primary}
              size={SIZES.large}
            />
          </View>
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
                onPress={onConfirmReservation}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  CONFIRM
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
                onPress={onCancelReservation}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  CANCEL
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
              {"CONFIRMED"}
            </Text>
          ) : status === "CHECKEDIN" ? (
            <>
              <View
                style={{
                  backgroundColor: colors.primary,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 15,
                  marginVertical: 10,
                  fontFamily: "OpenSansExtraBold",
                  paddingHorizontal: 15,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Checked In
                </Text>
              </View>
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
              {"COMPLETED"}
            </Text>
          ) : (
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
          )}
        </View>
      </View>
      {/* Call to Action BTN */}
      {status === "CONFIRMED" && (
        <View style={{ marginHorizontal: "10%", marginVertical: 10 }}>
          <PrimaryBtn
            text={"Check In User"}
            onBtnPress={onCheckInReservation}
          />
        </View>
      )}
      {status === "CHECKEDIN" && (
        <View style={{ marginHorizontal: "10%", marginVertical: 10 }}>
          <SecBtn text={"Check Out User"} onBtnPress={onCheckOutReservation} />
        </View>
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
          ? "Awaiting User's Check In"
          : status === "CHECKEDIN"
          ? "User checked In, Awaiting User's Checking Out"
          : status === "CHECKEDOUT"
          ? "Hotel Reservation Completed, Booked, Checked In, Checked Out."
          : "You Cancel This reservation"}
      </Text>
    </TouchableOpacity>
  );
};

export default BookingItem;
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
