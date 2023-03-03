import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors, FONTS, SIZES } from "../../../constants/theme";

const RecentComponent = ({ car }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
      }}
    >
      <View>
        <Image
          source={{ uri: car.f_img }}
          style={{ height: 70, width: 70, borderRadius: 10 }}
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            color: colors.darkPrimary,
            fontFamily: FONTS.bold,
            fontSize: 15,
            marginBottom: 6,
          }}
        >{`${car.froLoc} - ${car.toLoc}`}</Text>
        <Text
          style={{
            color: colors.gray,
            fontFamily: FONTS.medium,
          }}
        >{`${car.froDur} - ${car.toDur}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecentComponent;
