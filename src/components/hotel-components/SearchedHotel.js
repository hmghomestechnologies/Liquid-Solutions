import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors, FONTS } from "../../../constants/theme";
import HotelSearchedItem from "./HotelSearchedItem";

const SearchedHotel = ({
  data,
  onPress,
  setCity,
  setCitySelected,
  setFocus,
  setShowContainer,
}) => {
  console.log(data);
  return (
    <View
      style={{
        backgroundColor: "white",
        borderColor: colors.darkGray,
        borderWidth: 1,
        width: "100%",
        zIndex: 10000,
        paddingVertical: 10,
        // paddingHorizontal: 10,
        borderRadius: 10,
      }}
    >
      {data.map((item, index) => (
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
          //   onPress={onPress}
          onPress={() => {
            setCity(item);
            setCitySelected(true);
            setFocus(false);
            setShowContainer(false);
          }}
          key={index}
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
              {item}
            </Text>
            <Text style={{ fontSize: 11 }}>City in Nigeria</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SearchedHotel;
