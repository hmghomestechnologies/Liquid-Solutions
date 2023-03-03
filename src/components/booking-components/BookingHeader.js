import { View, Text } from "react-native";
import React from "react";
import { BookingMenuItem } from "./";
import { useState } from "react";

const BookingHeader = () => {
  const [activeFlight, setActiveFlight] = useState(true);
  const [activeHotel, setActiveHotel] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState(false);
  const [activeCars, setActiveCars] = useState(false);
  const onFlightPress = () => {
    setActiveFlight(true);
    setActiveHotel(false);
    setActiveRestaurant(false);
    setActiveCars(false);
  };
  const onHotelPress = () => {
    setActiveFlight(false);
    setActiveHotel(true);
    setActiveRestaurant(false);
    setActiveCars(false);
  };
  const onRestaurantPress = () => {
    setActiveFlight(false);
    setActiveHotel(false);
    setActiveRestaurant(true);
    setActiveCars(false);
  };
  const onCarsPress = () => {
    setActiveFlight(false);
    setActiveHotel(false);
    setActiveRestaurant(false);
    setActiveCars(true);
  };
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 10,
      }}
    >
      <BookingMenuItem
        text={"Flights"}
        menu={activeFlight}
        onPress={onFlightPress}
      />
      <BookingMenuItem
        text={"Hotels"}
        menu={activeHotel}
        onPress={onHotelPress}
      />
      <BookingMenuItem
        text={"Restaurants"}
        menu={activeRestaurant}
        onPress={onRestaurantPress}
      />
      <BookingMenuItem text={"Cars"} menu={activeCars} onPress={onCarsPress} />
    </View>
  );
};

export default BookingHeader;
