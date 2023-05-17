import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors, SHADOWS, SIZES } from "../../../constants/theme";
import FormatedNumber from "../FormatedNumber";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getHoursWithMinutes } from "../../../constants/functions";

const FlightResultItem = ({ data, returnDate, searchedData }) => {
  const {
    outbound,
    total_outbound_duration,
    outbound_stops,
    inbound,
    total_inbound_duration,
    inbound_stops,
    amount,
  } = data;
  const navigation = useNavigation();
  function flightTime(time) {
    const tempDate = time?.split("T");
    const tempTime = tempDate[1];
    return tempTime?.substring(0, 5);
  }
  return (
    <View
      style={{
        borderColor: colors.secondary,
        borderWidth: 1,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f4f3f3",
          borderRadius: 10,
          width: "100%",
        }}
      >
        {/* <TouchableOpacity
          style={{
            backgroundColor: "white",
            height: 35,
            width: 35,
            borderRadius: 100,
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
            ...SHADOWS.dark,
          }}
        >
          <AntDesign
            name={data.isFavorite ? "heart" : "hearto"}
            size={24}
            color={data.isFavorite ? "red" : colors.darkSecondary}
          />
        </TouchableOpacity> */}
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            borderTopLeftRadius: 10,
            width: "65%",
          }}
        >
          {/* OutBound Details */}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: colors.secondary,
                  fontSize: SIZES.medium,
                  fontWeight: "600",
                }}
              >
                {outbound[0]?.airline_details?.name}
              </Text>
              <Image
                source={{ uri: outbound[0]?.airline_details?.logo }}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 10,
                  marginLeft: 4,
                }}
              />
            </View>

            <View style={styles.wrapper}>
              {/* StartTime */}
              <View>
                <Text style={styles.time}>
                  {flightTime(outbound[0]?.departure_time)}
                </Text>
                <Text style={styles.location}>{outbound[0]?.airport_from}</Text>
              </View>
              {/* Duration */}
              <View style={styles.centerText}>
                <Text style={styles.duration}>
                  {getHoursWithMinutes(total_outbound_duration)}
                </Text>
                <Text style={styles.stops}>{outbound_stops} Stops</Text>
              </View>
              {/* EndTime */}
              {/* {outbound?.length === 1 ? (
                <View>
                  <Text style={styles.time}>
                    {flightTime(outbound[0]?.arrival_time)}
                  </Text>
                  <Text style={styles.location}>{outbound[0]?.airport_to}</Text>
                </View>
              ) : ( */}
              <View>
                <Text style={styles.time}>
                  {flightTime(outbound[outbound.length - 1]?.arrival_time)}
                </Text>
                <Text style={styles.location}>
                  {outbound[outbound.length - 1]?.airport_to}
                </Text>
              </View>
              {/* )} */}
            </View>
          </View>

          {/* Inbound Details */}
          {returnDate !== null && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: colors.secondary,
                    fontSize: SIZES.medium,
                    fontWeight: "600",
                  }}
                >
                  {inbound[0]?.airline_details?.name}
                </Text>
                <Image
                  source={{ uri: inbound[0]?.airline_details?.logo }}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 10,
                    marginLeft: 4,
                  }}
                />
              </View>

              <View style={styles.wrapper}>
                {/* StartTime */}
                <View>
                  <Text style={styles.time}>
                    {flightTime(inbound[0]?.departure_time)}
                  </Text>
                  <Text style={styles.location}>
                    {inbound[0]?.airport_from}
                  </Text>
                </View>
                {/* Duration */}
                <View style={styles.centerText}>
                  <Text style={styles.duration}>
                    {getHoursWithMinutes(total_inbound_duration)}
                  </Text>
                  <Text style={styles.stops}>{inbound_stops} Stops</Text>
                </View>
                {/* EndTime */}
                <View>
                  <Text style={styles.time}>
                    {flightTime(inbound[inbound.length - 1]?.arrival_time)}
                  </Text>
                  <Text style={styles.location}>
                    {inbound[inbound.length - 1]?.airport_to}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            flexDirection: "column",
            alignItems: "center",
            paddingHorizontal: 10,
            width: "35%",
          }}
        >
          <FormatedNumber
            value={amount}
            color={colors.secondary}
            size={SIZES.medium}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.secondary,
          width: "100%",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          position: "relative",
        }}
        onPress={() =>
          navigation.navigate("FlightDetailsScreen", { data, searchedData })
        }
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          {/* {data.numbers}+ {data.name} flight */}
          Flight Details
        </Text>
        <View style={{ position: "absolute", right: 10 }}>
          <AntDesign name="right" size={24} color={"white"} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FlightResultItem;
const styles = StyleSheet.create({
  wrapper: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  time: {
    color: colors.darkPrimary,
    fontSize: SIZES.medium,
    fontWeight: "600",
  },
  location: {
    color: colors.darkPrimary,
    fontWeight: "500",
    textAlign: "right",
    textTransform: "capitalize",
  },
  centerText: { marginHorizontal: 10 },
  duration: {
    color: "gray",
    fontWeight: "500",
    borderBottomColor: colors.darkSecondary,
    borderBottomWidth: 2,
    textAlign: "center",
  },
  stops: { color: "gray", fontWeight: "700" },
});
