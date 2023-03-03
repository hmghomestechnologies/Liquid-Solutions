import { View, Text, Image } from "react-native";
import React from "react";
import { colors } from "../../../constants/theme";

const CountryItem = ({ country, index }) => {
  return (
    <View style={{ marginHorizontal: 10, marginLeft: index == 0 ? 20 : 0 }}>
      <Image
        source={{ uri: country.image }}
        style={{ height: 130, width: 200, borderRadius: 10 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 5,
          marginVertical: 10,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 16,
              color: colors.darkPrimary,
            }}
          >
            {country.name}
          </Text>
          <Text style={{ color: "gray", fontWeight: "600" }}>
            {country.desc}
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: country.flagImg }}
            style={{ height: 30, width: 40, borderRadius: 5 }}
          />
        </View>
      </View>
    </View>
  );
};

export default CountryItem;
