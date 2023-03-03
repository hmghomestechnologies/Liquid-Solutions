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
import FormatedNumber from "../../FormatedNumber";

const UserOrderItem = ({ data, isLoading, setIsLoading }) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { setResOrders, currentRestaurant } = useRestaurantContext();
  const {
    _id,
    amount,
    orderedItems,
    restaurantId,
    status,
    createdAt,
    userId,
    deliveryAddress,
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
    rideCity: deliveryAddress.deliveryCity,
  };
  const onAccept = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/restaurant/admin/order/accept`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Request Accepted!!",
            text2: "You Have Accept the User's Order Request",
          });
          axios
            .get(`${baseURL}/restaurant/admin/orders/${restaurantId}`, config)
            .then((res) => {
              setResOrders(res.data);
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
      .put(`${baseURL}/restaurant/admin/order/decline`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Request Decline!!",
            text2: "You Have Declined the User's Order Request",
          });
          axios
            .get(`${baseURL}/restaurant/admin/orders/${restaurantId}`, config)
            .then((res) => {
              setResOrders(res.data);
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
  const onCooking = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/restaurant/admin/order/cooking`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Cooking!",
            text2: "You Have Processing the User's Order Request",
          });
          axios
            .get(`${baseURL}/restaurant/admin/orders/${restaurantId}`, config)
            .then((res) => {
              setResOrders(res.data);
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
  const onReady = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/restaurant/admin/order/ready`, Data, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Ready!!",
            text2: "User Order's Ready",
          });
          axios
            .get(`${baseURL}/restaurant/admin/orders/${restaurantId}`, config)
            .then((res) => {
              setResOrders(res.data);
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
    <View
      style={[containerDark, {}]}
      onPress={() =>
        navigation.navigate("OrdersDetails", {
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
          <View></View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{`${orderedItems.length} Items Ordered`}</Text>
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
          {status === "NEW" ? (
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
              <TouchableOpacity
                style={{
                  backgroundColor: colors.errorColor,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 5,
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
          ) : status === "ACCEPT" ? (
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
              onPress={onCooking}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Start Cooking
              </Text>
            </TouchableOpacity>
          ) : status === "COOKING" ? (
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
                onPress={onReady}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Ready for Pickup
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
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormatedNumber value={amount} size={SIZES.large} />
      </View>
      <SecBtn
        text={"Order Details"}
        onBtnPress={() => {
          navigation.navigate("OrdersDetails", {
            data,
            user,
            restaurant: currentRestaurant,
          });
        }}
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
        {status === "NEW"
          ? "Awaiting Your Comfirmation "
          : status === "ACCEPT"
          ? "Awaiting Your Preparation"
          : status === "COOKING"
          ? "User Preparation Started, Awaiting Your Finishing Up"
          : status === "COMPLETED"
          ? "Order Completed - Ordered, Picked Up, Delivered"
          : "You Declined User's Orders"}
      </Text>
    </View>
  );
};

export default UserOrderItem;
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
