import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../../constants/theme";

const Spinner = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        backgroundColor: "(0,0,0, 0.7)",
        height: "100%",
        width: "100%",
      }}
    >
      <ActivityIndicator size={"large"} color={colors.secondary} />
    </View>
  );
};

export default Spinner;
