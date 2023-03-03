import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors, FONTS, SIZES } from "../../../constants/theme";

const BookingMenuItem = ({ text, menu, onPress, counts }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          marginVertical: 2,
          marginHorizontal: 5,
        }}
        onPress={onPress}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.medium,
              color: colors.primary,
            }}
          >
            {text}
          </Text>
          <Text
            style={{
              color: "white",
              backgroundColor: colors.darkSecondary,
              fontFamily: FONTS.bold,
              borderRadius: 1000,
              height: 15,
              width: 15,
              textAlign: "center",
              fontSize: 12,
              marginLeft: 1,
            }}
          >
            {counts}
          </Text>
        </View>
        {menu && (
          <View
            style={{
              height: 6,
              width: "100%",
              backgroundColor: colors.secondary,
              borderRadius: 10,
              marginVertical: 2,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BookingMenuItem;
const styles = StyleSheet.create({});
