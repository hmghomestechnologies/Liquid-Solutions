import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, FONTS, SIZES } from "../../constants/theme";

const MapMarker = ({ location }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <MaterialCommunityIcons name="google-maps" size={24} color="red" />
      <Text
        style={{
          fontSize: SIZES.font,
          fontFamily: FONTS.semiBold,
          color: colors.secondary,
        }}
      >
        {location}
      </Text>
    </View>
  );
};

export default MapMarker;
