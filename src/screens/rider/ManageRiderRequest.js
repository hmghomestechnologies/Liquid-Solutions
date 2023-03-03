import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Layouts/Footer";
import { BookingItem } from "../../components/booking-components";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { colors } from "../../../constants/theme";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import Spinner from "react-native-loading-spinner-overlay";
import { useRiderContext } from "../../../context/RiderContext";

const ManageRiderRequest = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { authUser } = useAuthContext();
  const { rider, setRiderBookings } = useRiderContext();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${authUser?.token}`,
      },
    };
    axios
      .get(`${baseURL}/restaurant/all/orders`, config)
      .then((res) => {
        setRiderBookings(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setRiderBookings([]);
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
          text={"Accepted Deliveries"}
          path={"FilterDeliveries"}
          status="DELIVERY_ACCEPTED"
        />
      </View>
      <View style={styles.itemWrapper}>
        <BookingItem
          Icon={MaterialCommunityIcons}
          iconName={"progress-star"}
          text={"OnGoing Deliveries"}
          path={"FilterDeliveries"}
          status="PICKED_UP"
        />
        <BookingItem
          Icon={Ionicons}
          iconName={"checkmark-done-circle-sharp"}
          text={"Successful Rides"}
          path={"FilterDeliveries"}
          color={colors.successColor}
          status="COMPLETED"
        />
      </View>
      <Footer active={"rider-request"} />
    </View>
  );
};

export default ManageRiderRequest;
const styles = StyleSheet.create({
  menuCont: {},
  itemWrapper: {
    flexDirection: "row",
    marginVertical: 10,
  },
});
