import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { containerDark } from "../../../../constants/layouts";
import { useState, useEffect } from "react";
import { useRestaurantContext } from "../../../../context/RestaurantContext";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { SecBtn } from "../../Forms";
import FormatedNumber from "../../FormatedNumber";
import axios from "axios";
import baseURL from "../../../../constants/baseURL";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../../../../context/AuthContext";
import { useRiderContext } from "../../../../context/RiderContext";
import { useNavigation } from "@react-navigation/native";

const RiderUserItem = ({ data }) => {
  const [onLoading, setOnLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { restaurants } = useRestaurantContext();
  const { rider, setRiderBookings } = useRiderContext();
  const { _id, restaurantId, status, amount, deliveryAddress, userId } = data;
  useEffect(() => {
    if (restaurants) {
      const tempRestaurant = restaurants.filter((i) => i._id === restaurantId);
      setRestaurant(tempRestaurant[0]);
    }
  }, [restaurants]);
  const { restaurantName, address, user } = restaurant;
  let riderData = {
    assignedRiderId: rider?._id,
    orderId: _id,
    userId,
    restaurantName,
    restaurantUserId: user,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const onAccept = async () => {
    setOnLoading(true);
    await axios
      .put(`${baseURL}/rider/accept-request`, riderData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Request has been accepted Successfully!!",
            text2: "Your Has accept the User's Delivery request.",
          });
          axios
            .get(`${baseURL}/restaurant/all/orders`, config)
            .then((res) => {
              setRiderBookings(res.data);
              setOnLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
          setOnLoading(false);
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
        setOnLoading(false);
      });
  };
  const onPickup = async () => {
    setOnLoading(true);
    await axios
      .put(`${baseURL}/rider/picked-up`, riderData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Delivery Picked Up successfully",
            text2: "You Pick up User Delivery.",
          });
          axios
            .get(`${baseURL}/restaurant/all/orders`, config)
            .then((res) => {
              setRiderBookings(res.data);
              setOnLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
          setOnLoading(false);
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
        setOnLoading(false);
      });
  };
  const onCompleted = async () => {
    setOnLoading(true);
    await axios
      .put(`${baseURL}/rider/completed`, riderData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Delivery Completed Successfully",
            text2: "User Item has been delivered",
          });
          axios
            .get(`${baseURL}/restaurant/all/orders`, config)
            .then((res) => {
              setRiderBookings(res.data);
              setOnLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
          setOnLoading(false);
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
        setOnLoading(false);
      });
  };
  return (
    <View style={[containerDark, {}]}>
      <Spinner visible={onLoading} />
      <Text
        style={{
          color: colors.darkPrimary,
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
        }}
      >
        {restaurantName}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginVertical: 10,
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
              {`${address}`}
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
              {`${deliveryAddress?.description}`}
            </Text>
          </View>
        </View>
        <View style={{ width: "30%" }}>
          {status === "READY_FOR_PICKUP" ? (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.successColor,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 5,
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
            </>
          ) : status === "DELIVERY_ACCEPTED" ? (
            <TouchableOpacity
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
              onPress={onPickup}
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
          ) : status === "PICKED_UP" ? (
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
                onPress={onCompleted}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  DELIVERED
                </Text>
              </TouchableOpacity>
            </>
          ) : status === "COMPLETED" ? (
            <Text
              style={[
                styles.badgeCont,
                {
                  backgroundColor: colors.successColor,
                },
              ]}
            >
              {"DELIVERED & RECIEVED"}
            </Text>
          ) : (
            <Text></Text>
          )}
          <FormatedNumber
            value={deliveryAddress.deliveryFee - 750}
            size={SIZES.large}
          />
        </View>
      </View>
      <SecBtn
        text={"Delivery Details"}
        onBtnPress={() =>
          navigation.navigate("ManageRideDetails", { data, restaurant })
        }
      />
      <Text
        style={{
          fontStyle: "italic",
          textAlign: "center",
          fontSize: SIZES.small,
          color: colors.gray,
          fontFamily: FONTS.semiBold,
        }}
      >
        {status === "READY_FOR_PICKUP"
          ? "Awaiting Your Comfirmation"
          : status === "DELIVERY_ACCEPTED"
          ? "Awaiting Your Your Pick Up"
          : status === "PICKED_UP"
          ? "User Awaiting your Delivery"
          : status === "COMPLETED"
          ? "Order Completed - Ordered, Picked Up, Delivered"
          : ""}
      </Text>
    </View>
  );
};

export default RiderUserItem;

const styles = StyleSheet.create({});
