import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../constants/theme";

const DropDownInput = ({
  text,
  Icon,
  iconName,
  iconColor,
  textColor,
  height,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderWidth: 0.5,
        borderColor: colors.darkGray,
        height: height,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name={iconName} size={20} color={iconColor} />
        <Text style={{ marginLeft: 10, color: textColor }}>{text}</Text>
      </View>
      <Entypo name="chevron-thin-down" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default DropDownInput;
