import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { colors } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../context/AuthContext";

const Footer = ({ active, searchPath }) => {
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  // const { authUser?.userRole } = authUser;
  const newPath = searchPath ? searchPath : "FlightSearchScreen";
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#E5FBFF",
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      {/* User Only MEnu Items  */}
      {authUser?.userRole === "User" && (
        <>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("HotelHome")}
          >
            <AntDesign
              name="home"
              size={24}
              color={active === "home" ? colors.primary : colors.secondary}
            />
            <Text
              style={[
                styles.text,
                {
                  color: active === "home" ? colors.primary : colors.secondary,
                },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("ManageBooking")}
          >
            <MaterialCommunityIcons
              name="briefcase-outline"
              size={24}
              color={active === "booking" ? colors.primary : colors.secondary}
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "booking" ? colors.primary : colors.secondary,
                },
              ]}
            >
              Bookings
            </Text>
          </TouchableOpacity>
        </>
      )}
      {/* Restaurant Admin Only MEnu Items  */}
      {authUser?.userRole === "resAdmin" && (
        <>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("RestaurantAdminHome")}
          >
            <Ionicons
              name="home-outline"
              size={24}
              color={
                active === "restaurantHome" ? colors.primary : colors.secondary
              }
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "restaurantHome"
                      ? colors.primary
                      : colors.secondary,
                },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("ManageReservations")}
          >
            <AntDesign
              name="trademark"
              size={24}
              color={
                active === "reservations" ? colors.primary : colors.secondary
              }
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "reservations"
                      ? colors.primary
                      : colors.secondary,
                },
              ]}
            >
              Reservations
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("ManageOrders")}
          >
            <Ionicons
              name="fast-food-outline"
              size={24}
              color={active === "orders" ? colors.primary : colors.secondary}
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "orders" ? colors.primary : colors.secondary,
                },
              ]}
            >
              Orders
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("ManageBooking")}
          >
            <Ionicons
              name="restaurant-outline"
              size={24}
              color={active === "my-res" ? colors.primary : colors.secondary}
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "my-res" ? colors.primary : colors.secondary,
                },
              ]}
            >
              My Restaurant
            </Text>
          </TouchableOpacity> */}
        </>
      )}
      {/* RIder Admin Only MEnu Items  */}
      {authUser?.userRole === "rider" && (
        <>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("RiderHome")}
          >
            <Ionicons
              name="home-outline"
              size={24}
              color={
                active === "rider-home" ? colors.primary : colors.secondary
              }
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "rider-home" ? colors.primary : colors.secondary,
                },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("ManageRiderRequest")}
          >
            <AntDesign
              name="trademark"
              size={24}
              color={
                active === "rider-request" ? colors.primary : colors.secondary
              }
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "rider-request"
                      ? colors.primary
                      : colors.secondary,
                },
              ]}
            >
              Requests
            </Text>
          </TouchableOpacity>
        </>
      )}
      {/* Car Rentor Only MEnu Items  */}
      {authUser?.userRole === "carRentor" && (
        <>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("CarRentorHome")}
          >
            <Ionicons
              name="home-outline"
              size={24}
              color={
                active === "car-rentor-home" ? colors.primary : colors.secondary
              }
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "car-rentor-home"
                      ? colors.primary
                      : colors.secondary,
                },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("CarManageBookings")}
          >
            <MaterialCommunityIcons
              name="briefcase-outline"
              size={24}
              color={
                active === "car-rentor-bookings"
                  ? colors.primary
                  : colors.secondary
              }
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "car-rentor-bookings"
                      ? colors.primary
                      : colors.secondary,
                },
              ]}
            >
              Bookings
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("ManageBooking")}
          >
            <Ionicons
              name="restaurant-outline"
              size={24}
              color={active === "my-res" ? colors.primary : colors.secondary}
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "my-res" ? colors.primary : colors.secondary,
                },
              ]}
            >
              My Restaurant
            </Text>
          </TouchableOpacity> */}
        </>
      )}
      {/* Hotel Admin Only MEnu Items  */}
      {authUser?.userRole === "hotelAdmin" && (
        <>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("HotelAdminHome")}
          >
            <Ionicons
              name="home-outline"
              size={24}
              color={
                active === "hotel-admin-home"
                  ? colors.primary
                  : colors.secondary
              }
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "hotel-admin-home"
                      ? colors.primary
                      : colors.secondary,
                },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("ManageBookings")}
          >
            <MaterialCommunityIcons
              name="briefcase-outline"
              size={24}
              color={
                active === "hotel-bookings" ? colors.primary : colors.secondary
              }
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "hotel-bookings"
                      ? colors.primary
                      : colors.secondary,
                },
              ]}
            >
              Bookings
            </Text>
          </TouchableOpacity>
        </>
      )}
      {/* Taxi Driver Only MEnu Items  */}
      {authUser?.userRole === "taxiDriver" && (
        <>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("TaxiDriverHome")}
          >
            <Ionicons
              name="home-outline"
              size={24}
              color={
                active === "driver-home" ? colors.primary : colors.secondary
              }
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "driver-home"
                      ? colors.primary
                      : colors.secondary,
                },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("DriverManageBooking")}
          >
            <MaterialCommunityIcons
              name="briefcase-outline"
              size={24}
              color={
                active === "driver-manage-bookings"
                  ? colors.primary
                  : colors.secondary
              }
            />
            <Text
              style={[
                styles.text,
                {
                  color:
                    active === "driver-manage-bookings"
                      ? colors.primary
                      : colors.secondary,
                },
              ]}
            >
              Bookings
            </Text>
          </TouchableOpacity>
        </>
      )}
      {/* <TouchableOpacity style={styles.iconContainer}>
        <Ionicons
          name="md-wallet-outline"
          size={30}
          color={active === "wallet" ? colors.primary : colors.secondary}
          onPress={() => navigation.navigate("WalletIndexScreen")}
        />
        <Text
          style={[
            styles.text,
            { color: active === "wallet" ? colors.primary : colors.secondary },
          ]}
        >
          Wallet
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("WalletIndexScreen")}
      >
        <FontAwesome5
          name="wallet"
          size={24}
          color={active === "wallet" ? colors.primary : colors.secondary}
        />
        <Text
          style={[
            styles.text,
            { color: active === "wallet" ? colors.primary : colors.secondary },
          ]}
        >
          Wallet
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <FontAwesome5
          name="user-circle"
          size={24}
          color={active === "profile" ? colors.primary : colors.secondary}
        />
        <Text
          style={[
            styles.text,
            { color: active === "profile" ? colors.primary : colors.secondary },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {},
});
