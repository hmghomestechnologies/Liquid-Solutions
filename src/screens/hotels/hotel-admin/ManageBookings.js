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

const ManageBookings = () => {
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
          text={"Confirmed Bookings"}
          path={"FilterBookings"}
          status="CONFIRMED"
        />
        <BookingItem
          Icon={MaterialIcons}
          iconName={"error"}
          text={"Declined Bookings"}
          path={"FilterBookings"}
          color={colors.errorColor}
          status="CANCEL"
        />
      </View>
      <View>
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"new-box"}
          text={"All Bookings"}
          path={"FilterBookings"}
          status="ALL"
        />
      </View>
      <View style={styles.itemWrapper}>
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"progress-star"}
          text={"Checked In Bookings"}
          path={"FilterBookings"}
          status="CHECKEDIN"
        />
        <BookingItem
          Icon={Ionicons}
          iconName={"checkmark-done-circle-sharp"}
          text={"Completed Bookings"}
          path={"FilterBookings"}
          color={colors.successColor}
          status="CHECKEDOUT"
        />
      </View>
      <Footer active={"hotel-bookings"} />
    </View>
  );
};

export default ManageBookings;
const styles = StyleSheet.create({
  menuCont: {},
  itemWrapper: {
    flexDirection: "row",
  },
});
