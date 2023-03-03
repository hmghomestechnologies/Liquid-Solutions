import { View, Text } from "react-native";
import React from "react";
import { colors, FONTS, SIZES } from "../../constants/theme";

const DoubleSubheader = ({ text }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Text
        style={{
          fontSize: SIZES.medium,
          fontFamily: FONTS.bold,
          color: colors.darkPrimary,
        }}
      >
        {text}
      </Text>
      <Text
        style={{
          fontSize: SIZES.medium,
          fontFamily: FONTS.bold,
          color: colors.darkPrimary,
          textDecorationLine: "underline",
        }}
      >
        See all
      </Text>
    </View>
  );
};

export default DoubleSubheader;
