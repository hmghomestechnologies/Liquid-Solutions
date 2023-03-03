import { View, StyleSheet } from "react-native";
import React from "react";
import Footer from "../../components/Layouts/Footer";
import { BookingItem } from "../../components/booking-components";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const ManageBooking = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.itemWrapper}>
        <BookingItem
          Icon={Ionicons}
          iconName={"restaurant-outline"}
          text={"Restaurant Reservations"}
          path={"ManageRestaurantReservations"}
        />
        <BookingItem
          Icon={Ionicons}
          iconName={"fast-food-outline"}
          text={"Ordered Dishes"}
          path={"ManageDishesOrders"}
        />
      </View>
      <View>
        <BookingItem
          Icon={Fontisto}
          iconName={"hotel"}
          text={"Hotel Reservations"}
          path={"ManageHotelReservations"}
        />
      </View>
      <View style={styles.itemWrapper}>
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"taxi"}
          text={"Taxi Bookings"}
          path={"ManageTaxiBookings"}
        />
        <BookingItem
          Icon={Ionicons}
          iconName={"car-sport-sharp"}
          text={"Car Rentals"}
          path={"ManageCarRentals"}
        />
      </View>
      <Footer active={"booking"} />
    </View>
  );
};

export default ManageBooking;
const styles = StyleSheet.create({
  menuCont: {},
  itemWrapper: {
    flexDirection: "row",
  },
});
