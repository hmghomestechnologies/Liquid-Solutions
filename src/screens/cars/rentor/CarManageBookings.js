import { View, StyleSheet } from "react-native";
import React from "react";
import Footer from "../../../components/Layouts/Footer";
import { BookingItem } from "../../../components/booking-components";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { colors } from "../../../../constants/theme";

const CarManageBookings = () => {
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
          Icon={MaterialIcons}
          iconName={"approval"}
          text={"Accepted Requests"}
          path={"FilterCarBooking"}
          status="CONFIRMED"
        />
        <BookingItem
          Icon={MaterialIcons}
          iconName={"error"}
          text={"Rejected Requests"}
          path={"FilterCarBooking"}
          color={colors.errorColor}
          status="REJECTED"
        />
      </View>
      <View>
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"new-box"}
          text={"New Request"}
          path={"FilterCarBooking"}
          status="BOOKED"
        />
      </View>
      <View style={styles.itemWrapper}>
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"progress-star"}
          text={"Current Request"}
          path={"FilterCarBooking"}
          status="PICKEDUP"
        />
        <BookingItem
          Icon={Ionicons}
          iconName={"checkmark-done-circle-sharp"}
          text={"Successful Requests"}
          path={"FilterCarBooking"}
          color={colors.successColor}
          status="RETURNED"
        />
      </View>
      <Footer active={"car-rentor-bookings"} />
    </View>
  );
};

export default CarManageBookings;
const styles = StyleSheet.create({
  menuCont: {},
  itemWrapper: {
    flexDirection: "row",
  },
});
