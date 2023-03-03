import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../../constants/theme";

const FilterTab = ({ activeTab, name, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.rectBox,
        { backgroundColor: activeTab ? colors.darkPrimary : "white" },
      ]}
    >
      <Text
        style={[
          styles.rectText,
          { color: activeTab ? "white" : colors.darkPrimary },
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterTab;
const styles = StyleSheet.create({
  rectBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginHorizontal: 5,
  },
  rectText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
