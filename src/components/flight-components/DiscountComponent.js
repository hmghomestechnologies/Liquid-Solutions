import { View, Text, ScrollView, FlatList, Image } from "react-native";
import React from "react";
import { hotelImg } from "../../../constants/assets";
import { colors, FONTS, SIZES } from "../../../constants/theme";

const DiscountComponent = () => {
  const data = [
    {
      id: "jjdjjdf",
      discount: 10,
      text: "Color Codes from Images Browse for an image",
      isActive: true,
    },
    {
      id: "jjd3445jjdf",
      discount: 20,
      text: "Color Codes from Images Browse for an image",
      isActive: false,
    },
    {
      id: "jjd34jjdf",
      discount: 10,
      text: "Color Codes from Images Browse for an image",
      isActive: false,
    },
  ];
  return (
    <ScrollView
      horizontal
      style={{ marginVertical: 20 }}
      showsHorizontalScrollIndicator={false}
    >
      {data &&
        data.map((item) => (
          <View
            key={item.id}
            style={{
              height: 90,
              width: 250,
              marginHorizontal: 10,
              marginVertical: 15,
              backgroundColor: item.isActive
                ? colors.darkSecondary
                : colors.darkGray,
              padding: 15,
            }}
          >
            <Text
              style={{
                fontSize: SIZES.medium,
                fontFamily: FONTS.bold,
                marginVertical: 3,
              }}
            >
              {item.discount}% Discount
            </Text>
            <Text
              style={{ color: colors.darkPrimary, fontFamily: FONTS.medium }}
            >
              {item.text}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
};

export default DiscountComponent;
