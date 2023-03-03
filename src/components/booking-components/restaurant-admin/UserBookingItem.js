import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";
import FormatedNumber from "../../FormatedNumber";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { useRestaurantContext } from "../../../../context/RestaurantContext";
import { containerDark, containerMedium } from "../../../../constants/layouts";
import { getWordDate } from "../../../../constants/functions";
import { useNavigation } from "@react-navigation/native";

const UserBookingItem = ({ data }) => {
  const [user, setUser] = useState({});

  const navigation = useNavigation();

  useEffect(() => {}, []);
  const { _id, restaurantId, reservePersons, status, createdAt } = data;
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
  return (
    <TouchableOpacity
      style={[containerDark, {}]}
      onPress={() =>
        navigation.navigate("RestaurantBookingDetails", { data, restaurant })
      }
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
            {}
          </Text>
          <View>
            <Text>Reservation ID:</Text>
            <Text>{_id}</Text>
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
        <View>
          <Text
            style={{
              paddingVertical: 5,
              paddingHorizontal: 8,
              backgroundColor:
                status === "CHECKEDOUT"
                  ? colors.successColor
                  : colors.secondary,
              borderRadius: 10,
              color: "white",
              fontFamily: FONTS.bold,
            }}
          >
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserBookingItem;
