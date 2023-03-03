import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors, SHADOWS, SIZES } from "../../../constants/theme";
import FormatedNumber from "../FormatedNumber";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FlightResultItem = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderColor: colors.secondary,
        borderWidth: 1,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f4f3f3",
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
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
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            borderTopLeftRadius: 10,
          }}
        >
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
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {data.name}
            </Text>
            <Image
              source={{ uri: data.img }}
              style={{ height: 20, width: 20 }}
            />
          </View>

          <View style={styles.wrapper}>
            {/* StartTime */}
            <View>
              <Text style={styles.time}>{data.depStartTime}</Text>
              <Text style={styles.location}>{data.depLocation}</Text>
            </View>
            {/* Duration */}
            <View style={styles.centerText}>
              <Text style={styles.duration}>{data.depDuration}</Text>
              <Text style={styles.stops}>{data.depStops} Stops</Text>
            </View>
            {/* EndTime */}
            <View>
              <Text style={styles.time}>{data.depStopTime}</Text>
              <Text style={styles.location}>{data.desLocation}</Text>
            </View>
          </View>
          <View style={styles.wrapper}>
            {/* StartTime */}
            <View>
              <Text style={styles.time}>{data.depStartTime}</Text>
              <Text style={styles.location}>{data.depLocation}</Text>
            </View>
            {/* Duration */}
            <View style={styles.centerText}>
              <Text style={styles.duration}>{data.depDuration}</Text>
              <Text style={styles.stops}>{data.depStops} Stops</Text>
            </View>
            {/* EndTime */}
            <View>
              <Text style={styles.time}>{data.depStopTime}</Text>
              <Text style={styles.location}>{data.desLocation}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            flexDirection: "column",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <FormatedNumber
            value={data.amount}
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
        onPress={() => navigation.navigate("FlightDetailsScreen")}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
          {data.numbers}+ {data.name} flight
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
  wrapper: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
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
  },
  stops: { color: "gray", fontWeight: "700" },
});
