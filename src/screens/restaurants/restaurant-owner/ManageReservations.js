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
import { useRestaurantContext } from "../../../../context/RestaurantContext";

const ManageReservations = () => {
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
          text={"Accepted Reservations"}
          path={"FilterReservations"}
          status="CONFIRMED"
        />
        <BookingItem
          Icon={MaterialIcons}
          iconName={"error"}
          text={"Declined Reservations"}
          path={"FilterReservations"}
          color={colors.errorColor}
          status="DECLINED"
        />
      </View>
      <View>
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"new-box"}
          text={"All Reservations"}
          path={"FilterReservations"}
          status="ALL"
        />
      </View>
      <View style={styles.itemWrapper}>
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"progress-star"}
          text={"Current Reservations"}
          path={"FilterReservations"}
          status="CHECKEDIN"
        />
        <BookingItem
          Icon={Ionicons}
          iconName={"checkmark-done-circle-sharp"}
          text={"Successful Reservations"}
          path={"FilterReservations"}
          color={colors.successColor}
          status="CHECKEDOUT"
        />
      </View>
      <Footer active={"reservations"} />
    </View>
  );
};

export default ManageReservations;
const styles = StyleSheet.create({
  menuCont: {},
  itemWrapper: {
    flexDirection: "row",
  },
});
