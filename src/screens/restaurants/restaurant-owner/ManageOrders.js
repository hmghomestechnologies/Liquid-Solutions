import { View, StyleSheet } from "react-native";
import React from "react";
import Footer from "../../../components/Layouts/Footer";
import { BookingItem } from "../../../components/booking-components";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { colors } from "../../../../constants/theme";
import { useRestaurantContext } from "../../../../context/RestaurantContext";

const ManageOrders = () => {
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
          text={"Accepted Orders"}
          path={"FilteredOrders"}
          status="ACCEPT"
        />
        <BookingItem
          Icon={MaterialIcons}
          iconName={"error"}
          text={"Declined Orders"}
          path={"FilteredOrders"}
          color={colors.errorColor}
          status="DECLINE"
        />
      </View>
      <View>
        <BookingItem
          Icon={AntDesign}
          iconName={"menuunfold"}
          text={"All Orders"}
          path={"FilteredOrders"}
          status="ALL"
        />
      </View>
      <View style={styles.itemWrapper}>
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"progress-star"}
          text={"Current Orders"}
          path={"FilteredOrders"}
          status="COOKING"
        />
        <BookingItem
          Icon={Ionicons}
          iconName={"checkmark-done-circle-sharp"}
          text={"Successful Orders"}
          path={"FilteredOrders"}
          color={colors.successColor}
          status="COMPLETED"
        />
      </View>
      <Footer active={"orders"} />
    </View>
  );
};

export default ManageOrders;
const styles = StyleSheet.create({
  menuCont: {},
  itemWrapper: {
    flexDirection: "row",
  },
});
