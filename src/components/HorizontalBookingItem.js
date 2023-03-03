import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors, FONTS, SIZES } from "../../constants/theme";

const HorizontalBookingItem = ({ Icon, name, title, active, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: active ? "rgba(255, 255, 255, 0.14)" : colors.primary,
        borderColor: active ? colors.secondary : colors.primary,
        borderWidth: active ? 1 : 0,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
      }}
      onPress={onPress}
    >
      <Icon name={name} size={24} color="white" />
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontWeight: "600",
          color: "white",
          fontSize: SIZES.medium,
          marginLeft: 5,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default HorizontalBookingItem;
