import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";

const FilterContainer = ({ children, filter, setFilter }) => {
  return (
    <View
      style={{
        // height: "88%",
        width: "100%",
        backgroundColor: "white",
        position: "absolute",
        zIndex: 10,
        bottom: 0,
        borderTopColor: colors.secondary,
        borderTopWidth: 2,
        paddingHorizontal: 20,
      }}
    >
      {/* Filter Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity onPress={() => setFilter(!filter)}>
          <FontAwesome5 name="times" size={26} color={colors.secondary} />
        </TouchableOpacity>
        <Text>Sort and Filter</Text>
        <TouchableOpacity>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

export default FilterContainer;
