import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const BookingItem = ({ Icon, iconName, text, path, color, status }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(path, { status })}
    >
      <View>
        <Icon
          name={iconName}
          size={24}
          color={color ? color : colors.secondary}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          paddingVertical: 5,
          color: colors.primary,
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default BookingItem;

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 999,
    ...SHADOWS.medium,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
