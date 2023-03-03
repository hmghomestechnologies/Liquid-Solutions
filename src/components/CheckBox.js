import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { colors, FONTS } from "../../constants/theme";

const CheckBox = ({ activeChecked, setActiveChecked, label }) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 1 }}
    >
      <TouchableOpacity onPress={() => setActiveChecked(!activeChecked)}>
        {activeChecked ? (
          <AntDesign
            name="checksquare"
            size={24}
            color={colors.darkSecondary}
          />
        ) : (
          <Feather name="square" size={24} color="gray" />
        )}
      </TouchableOpacity>

      <Text style={{ marginLeft: 5, color: "gray", fontFamily: FONTS.medium }}>
        {label}
      </Text>
    </View>
  );
};

export default CheckBox;
