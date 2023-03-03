import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Footer from "../../../components/Layouts/Footer";
import { BookingItem } from "../../../components/booking-components";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { colors } from "../../../../constants/theme";
import { useTaxiContext } from "../../../../context/TaxiContext";
import { useAuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../../constants/baseURL";
import Spinner from "react-native-loading-spinner-overlay";

const DriverManageBooking = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { authUser } = useAuthContext();
  const { setDriverBookings, driver } = useTaxiContext();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${authUser?.token}`,
      },
    };
    axios
      .get(`${baseURL}/taxi/bookings/driver/${driver?._id}`, config)
      .then((res) => {
        setDriverBookings(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setDriverBookings([]);
      setIsLoading(false);
    };
  }, []);
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
      <Spinner visible={isLoading} />
      <View style={styles.itemWrapper}>
        <BookingItem
          Icon={MaterialIcons}
          iconName={"approval"}
          text={"Accepted Rides"}
          path={"FilterTaxiBooking"}
          status="CONFIRMED"
        />
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"new-box"}
          text={"New Request"}
          path={"FilterTaxiBooking"}
          status="BOOKED"
        />
      </View>
      <View style={styles.itemWrapper}>
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"progress-star"}
          text={"OnGoing Ride"}
          path={"FilterTaxiBooking"}
          status="CHECKEDIN"
        />
        <BookingItem
          Icon={Ionicons}
          iconName={"checkmark-done-circle-sharp"}
          text={"Successful Rides"}
          path={"FilterTaxiBooking"}
          color={colors.successColor}
          status="CHECKEDOUT"
        />
      </View>
      <Footer active={"driver-manage-bookings"} />
    </View>
  );
};

export default DriverManageBooking;
const styles = StyleSheet.create({
  menuCont: {},
  itemWrapper: {
    flexDirection: "row",
    marginVertical: 10,
  },
});
