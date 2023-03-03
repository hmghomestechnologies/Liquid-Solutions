import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors, FONTS } from "../../../constants/theme";
import HotelSearchScreen from "../../screens/hotels/HotelSearchScreen";
import { useNavigation } from "@react-navigation/native";

export default function HotelSearchedItem({ hotel, onPressCityClick }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={onPressCityClick}
    >
      <View>
        <Image
          source={{
            uri: "https://stockphoto.com/samples/MzU4Njc5NDFmNWJjZmIwZWQ=/MjIxMWY1YmNmYjBlZA==/dubai-downtown-night-scene.jpg&size=1024",
          }}
          style={{ width: 40, height: 40, borderRadius: 5 }}
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontFamily: FONTS.bold, color: colors.primary }}>
          {hotel.town}
        </Text>
        <Text style={{ fontSize: 11 }}>City in {hotel.state}</Text>
      </View>
    </TouchableOpacity>
  );
}
