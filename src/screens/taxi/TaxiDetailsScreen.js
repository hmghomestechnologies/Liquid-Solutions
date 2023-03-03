import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FlightDetailsHeader } from "../../components/flight-components";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FormatedNumber } from "../../components";
import { SecBtn } from "../../components/Forms";

const TaxiDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selected } = route.params;
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          position: "absolute",
          top: 17,
          width: "100%",
          backgroundColor: "white",
          paddingTop: 15,
          // paddingHorizontal: 20,
          zIndex: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <FlightDetailsHeader text={"Trip Details"} white type />
        </View>
      </View>
      <View
        style={{
          marginTop: 100,
          borderColor: colors.secondary,
          borderWidth: 1,
          borderRadius: 10,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 20,
          }}
        >
          <View>
            <Text
              style={{
                color: colors.secondary,
                fontFamily: FONTS.bold,
                fontSize: SIZES.medium,
                marginVertical: 5,
              }}
            >
              Your Trip
            </Text>
            <View
              style={{
                height: 120,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Left Section */}
              <View
                style={{
                  height: "100%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <View style={{}}>
                  <Text style={styles.date}>Fri</Text>
                  <Text style={styles.date}>May 27</Text>
                </View>
                <View style={{}}>
                  <Text style={styles.date}>Fri</Text>
                  <Text style={styles.date}>May 27</Text>
                </View>
              </View>

              {/* Middle Line */}
              <View
                style={{
                  flexDirection: "column",
                  height: "80%",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
              >
                <FontAwesome name="map-marker" size={24} color="orange" />
                <View
                  style={{
                    width: 3,
                    height: 40,
                    backgroundColor: "orange",
                    borderRadius: 50,
                  }}
                />
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={24}
                  color="orange"
                />
              </View>
              {/* Right Section */}
              <View
                style={{
                  height: "100%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <View style={{}}>
                  <Text style={styles.time}>8:55am</Text>
                  <Text style={styles.loc}>Jabi Lake</Text>
                </View>
                <Text
                  style={{
                    color: "gray",
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.small,
                  }}
                >
                  12 mins
                </Text>
                <View style={{}}>
                  <Text style={styles.time}>8:55am</Text>
                  <Text style={styles.loc}>Jabi Lake</Text>
                </View>
              </View>
            </View>
            {/* Taxi Details */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <FontAwesome5
                  name="car-side"
                  size={20}
                  color={colors.secondary}
                />
                <Text
                  style={{
                    marginLeft: 6,
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.medium,
                  }}
                >
                  Your Taxi
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "700", color: colors.darkPrimary }}>
                  License Plate:
                </Text>
                <Text style={{ fontWeight: "700", color: colors.secondary }}>
                  BWR 102 AB
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "700", color: colors.darkPrimary }}>
                  Color:
                </Text>
                <Text style={{ fontWeight: "700", color: colors.secondary }}>
                  Silver Corolla
                </Text>
              </View>
            </View>
            {/* Terms and Features */}
            <View>
              <Text
                style={{ fontFamily: FONTS.bold, marginVertical: 10 }}
              >{`${selected} | 4 Seats | Free Cancellation`}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Octicons
                  name="arrow-switch"
                  size={20}
                  color={colors.secondary}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontFamily: FONTS.medium,
                    fontWeight: "700",
                    color: colors.darkPrimary,
                  }}
                >
                  Need a return taxi?{" "}
                  <Text style={{ color: colors.secondary }}>Check price</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Bottom Buttom */}
        <View
          style={{
            backgroundColor: colors.secondary,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontFamily: FONTS.semiBold }}>
            Total Duration:
          </Text>
          <Text style={{ color: colors.darkPrimary, fontFamily: FONTS.bold }}>
            0h 12mins
          </Text>
        </View>
      </View>
      {/* Bottom Section (Price and BTN) */}
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <View
          style={{
            backgroundColor: colors.secondary,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 5,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ color: "white", fontFamily: FONTS.semiBold }}>
            Total Price
          </Text>
          <FormatedNumber value={20000} color={"white"} size={SIZES.large} />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
          <SecBtn
            text={"Continue"}
            onBtnPress={() => navigation.navigate("PaymentScreen")}
          />
        </View>
      </View>
    </View>
  );
};

export default TaxiDetailsScreen;
const styles = StyleSheet.create({
  date: {
    color: colors.darkPrimary,
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
  },
  time: {
    color: colors.darkPrimary,
    fontFamily: FONTS.bold,
  },
  loc: {
    color: colors.secondary,
    fontFamily: FONTS.bold,
  },
});
