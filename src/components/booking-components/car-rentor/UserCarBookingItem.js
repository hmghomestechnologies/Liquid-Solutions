import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect } from "react";
import FormatedNumber from "../../FormatedNumber";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { containerDark } from "../../../../constants/layouts";
import { getWordDate } from "../../../../constants/functions";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import baseURL from "../../../../constants/baseURL";
import { useAuthContext } from "../../../../context/AuthContext";
import Toast from "react-native-toast-message";
import TransparentSpinner from "../../TransparentSpinner";
import { useCarContext } from "../../../../context/CarContext";
const UserCarBookingItem = ({ data }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { setRentorBookings } = useCarContext();

  const {
    _id,
    status,
    createdAt,
    amount,
    pickupDate,
    returnDate,
    days,
    userId,
    carId,
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
  const onAccept = () => {
    setIsLoading(true);
    let Data = {
      id: _id,
      userEmail: user?.email,
    };
    axios
      .put(`${baseURL}/car/rentor/accept`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Car request Accepted Successfully!!",
            text2: "You Have Accept the User Car Request",
          });
          axios
            .get(`${baseURL}/car/user/${authUser?._id}`, config)
            .then((res) => {
              setRentorBookings(res.data);
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
    let Data = {
      id: _id,
      userEmail: user?.email,
    };
    axios
      .put(`${baseURL}/car/rentor/decline`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Car request Decline Successfully!!",
            text2: "You Have Declined the User Car Request",
          });
          navigation.navigate("CarManageBookings");
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

  const onReturn = () => {
    setIsLoading(true);
    let Data = {
      id: _id,
      userEmail: user?.email,
      carOwnerEmail: authUser?.email,
      carId,
    };
    axios
      .put(`${baseURL}/car/rentor/returned`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Car request Has Successfully!!",
            text2: "Your Car request process is completed",
          });
          axios
            .get(`${baseURL}/car/user/${authUser?._id}`, config)
            .then((res) => {
              setRentorBookings(res.data);
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
      onPress={() => navigation.navigate("BookedCarDetails", { data, user })}
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
        <View style={{ width: "70%" }}>
          {/* <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
            {`${user?.name} ${
              status === "BOOKED" ? "Wants to rent Your Car from" : ""
            } ${getWordDate(pickupDate)} to ${getWordDate(
              returnDate
            )} Which is  ${days} Days`}
          </Text> */}
          {status === "BOOKED" ? (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
              {`${user?.name} ${
                status === "BOOKED" ? "Wants to rent Your Car from" : ""
              } ${getWordDate(pickupDate)} to ${getWordDate(
                returnDate
              )} Which is  ${days} Days`}
            </Text>
          ) : status === "CONFIRMED" ? (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
              {`${user?.name} rented Your Car from ${getWordDate(
                pickupDate
              )} to ${getWordDate(returnDate)} ${days} Days`}
            </Text>
          ) : status === "PICKEDUP" ? (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
              {`${user?.name} picked up your car he rented on ${getWordDate(
                pickupDate
              )} and expected to be returned on ${getWordDate(returnDate)}.`}
            </Text>
          ) : status === "PICKEDUP" ? (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
              {`${user?.name} picked up your car he rented on ${getWordDate(
                pickupDate
              )} and expected to be returned on ${getWordDate(returnDate)}.`}
            </Text>
          ) : status === "RETURNED" ? (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
              {`${user?.name} rented your car on ${getWordDate(
                pickupDate
              )} returned on ${getWordDate(returnDate)} in Good Condition.`}
            </Text>
          ) : (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
              {`Your Decline the request of Car wanted to be rented by${
                user?.name
              } on ${getWordDate(pickupDate)}.`}
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
          ) : status === "PICKEDUP" ? (
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
                onPress={onReturn}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Return
                </Text>
              </TouchableOpacity>
            </>
          ) : status === "RETURNED" ? (
            <Text
              style={[
                styles.badgeCont,
                {
                  backgroundColor: colors.successColor,
                },
              ]}
            >
              {"RETURNED & CONFIRMED"}
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
          ? "Awaiting User's Pick Up"
          : status === "PICKEDUP"
          ? "Car Picked Up, Awaiting User's return"
          : status === "RETURNED"
          ? "Car Request completed, booked, Picked and Returned"
          : ""}
      </Text>
    </TouchableOpacity>
  );
};

export default UserCarBookingItem;
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
