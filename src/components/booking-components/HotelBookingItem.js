import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useHotelContext } from "../../../context/HotelContext";
import { useState } from "react";
import FormatedNumber from "../FormatedNumber";
import { colors, FONTS, SIZES } from "../../../constants/theme";

const HotelBookingItem = ({ data }) => {
  const [hotel, setHotel] = useState({});
  const { hotels } = useHotelContext();

  useEffect(() => {
    if (hotels) {
      const tempHotels = hotels.filter((i) => i._id === hotelId);
      setHotel(tempHotels[0]);
    }
  }, [hotels]);
  const { _id, hotelId, amount, isPaid, nights, status, createdAt } = data;
  const { hotelName } = hotel;
  //   console.log(data, hotel);
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
      style={{
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 5,
        backgroundColor: isPaid ? "#e6ffe6" : "#ffe6e6",
      }}
    >
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
            {hotelName}
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
              PENDING
            </Text>
          )}
          <Text>{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelBookingItem;
