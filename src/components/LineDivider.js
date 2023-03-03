import { View, Text } from "react-native";
import React from "react";
import { colors } from "../../constants/theme";

export default function LineDivider() {
  return (
    <View
      style={{ height: 1, width: "100%", backgroundColor: colors.darkGray }}
    />
  );
}
