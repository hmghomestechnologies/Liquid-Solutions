import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { FlightDetailsHeader } from "../../components/flight-components";
import { AntDesign } from "@expo/vector-icons";
import { colors, FONTS } from "../../../constants/theme";

const FlightDetailsScreen = () => {
  const data1 = [
    {
      type: "Outbound",
    },
  ];
  return (
    <SafeAreaView>
      {/* <View
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
          <FlightDetailsHeader text={"Flight Details"} type />
        </View>
        <View
          style={{
            backgroundColor: "#E7F8F7",
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign name="infocirlce" size={24} color="orange" />
          <Text
            style={{
              marginLeft: 10,
              fontFamily: FONTS.semiBold,
              color: colors.secondary,
            }}
          >
            COVID-19 Protocol
          </Text>
        </View>
      </View>

      <ScrollView>
        <FlightDetailsScreen />
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default FlightDetailsScreen;
