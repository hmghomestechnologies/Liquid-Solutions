import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  LineDivider,
  MapMarker,
  SubHeader,
  TransparentSpinner,
} from "../../components";
import { PrimaryBtn, SecBtn } from "../../components/Forms";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { containerLight } from "../../../constants/layouts";
import { getWordDate } from "../../../constants/functions";
import { useAuthContext } from "../../../context/AuthContext";

const RestaurantBookingDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { data, restaurant, user } = route?.params;
  console.log(restaurant, data);
  const { address, fImg, state, town, restaurantName } = restaurant;
  const { checkInDate, checkInTime, reservePersons, status } = data;
  if (!data || !restaurant) return <TransparentSpinner />;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        paddingHorizontal: 30,
      }}
    >
      {/* User Details */}
      {authUser?.userRole === "resAdmin" ? (
        <View
          style={[
            containerLight,

            {
              paddingVertical: 10,
              paddingHorizontal: 20,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.medium,
              color: colors.primary,
              paddingVertical: 10,
            }}
          >
            User's <AntDesign name="user" size={24} color={colors.secondary} />{" "}
            Details
          </Text>
          <LineDivider />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              // alignItems: "center",
            }}
          >
            <View>
              <View style={{ marginVertical: 2 }}>
                <Text style={styles.textTitle}>Name:</Text>
                <Text style={styles.textSub}>{user?.name}</Text>
              </View>
              <View style={{ marginVertical: 2 }}>
                <Text style={styles.textTitle}>Email:</Text>
                <Text style={styles.textSub}>{user?.email}</Text>
              </View>
              <View style={{ marginVertical: 2 }}>
                <Text style={styles.textTitle}>Phone No:</Text>
                <Text style={styles.textSub}>{user?.phoneNumber}</Text>
              </View>
            </View>
            <Image
              source={{ uri: user?.profileImg }}
              style={{ height: 120, width: 120, borderRadius: 999 }}
            />
          </View>
        </View>
      ) : (
        <View
          style={[
            containerLight,

            {
              paddingVertical: 10,
              paddingHorizontal: 20,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.medium,
              color: colors.primary,
              paddingVertical: 10,
            }}
          >
            Restaurant{" "}
            <Ionicons
              name="restaurant-outline"
              size={24}
              color={colors.secondary}
            />{" "}
            Details
          </Text>
          <LineDivider />
          <Image
            source={{ uri: fImg }}
            style={{
              height: 120,
              width: 120,
              borderRadius: 50,
              marginVertical: 10,
            }}
          />
          <SubHeader text={restaurantName} color={colors.primary} />
          <MapMarker location={`${address}, ${town}, ${state}.`} />
          <PrimaryBtn
            text={"More Info"}
            onBtnPress={() =>
              navigation.navigate("SingleRestaurant", { data: restaurant })
            }
          />
        </View>
      )}

      {/* Booking Details */}
      <View style={containerLight}>
        <SubHeader text={"Booking Details"} />
        <LineDivider />
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  color: colors.darkPrimary,
                }}
              >
                Check In Date
              </Text>
              <Text style={styles.contDesc}>{getWordDate(checkInDate)}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  color: colors.darkPrimary,
                }}
              >
                CheckIn Time
              </Text>
              <Text style={styles.contDesc}>{checkInTime}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  color: colors.darkPrimary,
                }}
              >
                Person(s)
              </Text>
              <Text style={styles.contDesc}>{reservePersons}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                paddingVertical: 5,
                paddingHorizontal: 8,
                color: colors.primary,
                fontFamily: FONTS.bold,
              }}
            >
              Reservation Status
            </Text>
            <Text
              style={{
                paddingVertical: 5,
                paddingHorizontal: 8,
                backgroundColor:
                  status === "CHECKEDOUT"
                    ? colors.successColor
                    : colors.secondary,
                borderRadius: 10,
                color: "white",
                fontFamily: FONTS.bold,
              }}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RestaurantBookingDetails;
const styles = StyleSheet.create({});
