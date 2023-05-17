import { View, Text } from "react-native";
import React from "react";
import { colors, width } from "../../../constants/theme";

const SemiRounded = ({ children, height }) => {
  return (
    <View
      style={{
        height: height ? height : 200,
        width: width,
        backgroundColor: colors.secondary,
        borderTopColor: colors.secondary,
        borderTopWidth: 0.5,
        marginTop: 22,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      {children}
    </View>
  );
};

export default SemiRounded;
