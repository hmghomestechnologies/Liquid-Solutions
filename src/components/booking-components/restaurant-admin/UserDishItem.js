import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";
import FormatedNumber from "../FormatedNumber";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { useRestaurantContext } from "../../../context/RestaurantContext";
import { containerDark, containerMedium } from "../../../constants/layouts";
import { getWordDate } from "../../../constants/functions";
import { useNavigation } from "@react-navigation/native";

const UserDishItem = ({ data }) => {
  const [restaurant, setRestaurant] = useState({});
  const { restaurants } = useRestaurantContext();

  const navigation = useNavigation();

  useEffect(() => {
    if (restaurants) {
      const tempRestaurant = restaurants.filter((i) => i._id === restaurantId);
      setRestaurant(tempRestaurant[0]);
    }
  }, [restaurants]);
  const {
    _id,
    restaurantId,
    orderedItems,
    status,
    createdAt,
    amount,
    paymentMode,
  } = data;
  const { restaurantName } = restaurant;
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
  console.log(data);
  return (
    <TouchableOpacity
      style={[containerDark, {}]}
      onPress={() => navigation.navigate("OrdersDetails", { data, restaurant })}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ width: "70%" }}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.medium,
            }}
          >
            {restaurantName}
          </Text>
          {/* <View>
            <Text>Reservation ID:</Text>
            <Text>{_id}</Text>
          </View> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
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
            width: "30%",
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
                status === "COMPLETED" ? colors.successColor : colors.secondary,
              borderRadius: 10,
              color: "white",
              fontFamily: FONTS.bold,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {status === "COMPLETED" ? "DELIVERED & RECIEVED" : status}
          </Text>
          <FormatedNumber
            value={amount}
            size={SIZES.medium}
            color={colors.successColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserDishItem;
