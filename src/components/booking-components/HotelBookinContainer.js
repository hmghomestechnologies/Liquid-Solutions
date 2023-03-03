import { View } from "react-native";
import React from "react";
import HotelBookingItem from "./HotelBookingItem";

const HotelBookinContainer = ({ hotelbookings }) => {
  console.log(hotelbookings);
  return (
    <View>
      {hotelbookings &&
        hotelbookings.map((item, index) => (
          <HotelBookingItem key={index} data={item} />
        ))}
      <View style={{ width: "100%", height: 80 }} />
    </View>
  );
};

export default HotelBookinContainer;
