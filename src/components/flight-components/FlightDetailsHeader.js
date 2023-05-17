import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const FlightDetailsHeader = ({ location, dates, type, text, white }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: white ? "white" : colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderTopColor: "#a3d4fe",
        borderTopWidth: 1,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Icon */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="left"
            size={27}
            color={white ? colors.secondary : "white"}
          />
        </TouchableOpacity>
        {type ? (
          <Text
            style={{
              marginLeft: 5,
              fontFamily: FONTS.semiBold,
              fontSize: 12,
              color: white ? colors.secondary : "white",
            }}
          >
            {text}
          </Text>
        ) : (
          <View
            style={{
              marginLeft: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: SIZES.medium,
                fontFamily: FONTS.semiBold,
                color: white ? colors.secondary : "white",
                fontStyle: "italic",
              }}
            >
              {location}
            </Text>
            <Text style={{ color: "white", fontWeight: "500" }}>{dates}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FlightDetailsHeader;
