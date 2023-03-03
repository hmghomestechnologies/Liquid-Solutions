import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors, FONTS, SIZES } from "../../constants/theme";

const WarningText = ({ text }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#EEF6FF",
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <AntDesign name="exclamationcircle" size={24} color="orange" />
      <Text
        style={{
          marginLeft: 7,
          fontFamily: FONTS.bold,
          fontSize: SIZES.small,
          color: colors.secondary,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default WarningText;
