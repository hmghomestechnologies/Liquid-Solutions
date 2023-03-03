import { View, Text } from "react-native";
import React from "react";
import { FONTS, SIZES } from "../../constants/theme";

const SubHeader = ({ text, color }) => {
  return (
    <View style={{ marginVertical: 5 }}>
      <Text
        style={{ color: color, fontSize: SIZES.large, fontFamily: FONTS.bold }}
      >
        {text}
      </Text>
    </View>
  );
};

export default SubHeader;
