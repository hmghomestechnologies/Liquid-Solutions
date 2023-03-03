import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const MenuItem = ({ Icon, iconName, text, path, params }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        marginVertical: 5,
      }}
      onPress={() => navigation.navigate(path, { params })}
    >
      <View>
        <Icon name={iconName} color={colors.secondary} size={28} />
      </View>
      <Text
        style={{
          marginLeft: 12,
          fontSize: SIZES.medium,
          color: colors.primary,
          fontFamily: FONTS.semiBold,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
