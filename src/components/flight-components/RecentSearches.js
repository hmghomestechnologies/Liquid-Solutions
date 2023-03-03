import { View, Text, ScrollView, FlatList, Image } from "react-native";
import React from "react";
import { hotelImg } from "../../../constants/assets";
import { colors, FONTS, SIZES } from "../../../constants/theme";

const RecentSearches = () => {
  const data = [
    {
      id: "jjdjjdf",
      country: "Dubai",
      dateL: "Jul 1-5",
      numbrs: "2 adults",
      image:
        "https://th.bing.com/th/id/R.ed041b61d80635960008bb44b178d590?rik=l6qdGZrAUfcAzA&pid=ImgRaw&r=0",
    },
    {
      id: "jjd45jjdf",
      country: "Dubai",
      dateL: "Jul 1-5",
      numbrs: "2 adults",
      image:
        "https://th.bing.com/th/id/R.ed041b61d80635960008bb44b178d590?rik=l6qdGZrAUfcAzA&pid=ImgRaw&r=0",
    },
    {
      id: "jjdjj556df",
      country: "Dubai",
      dateL: "Jul 1-5",
      numbrs: "2 adults",
      image:
        "https://th.bing.com/th/id/R.ed041b61d80635960008bb44b178d590?rik=l6qdGZrAUfcAzA&pid=ImgRaw&r=0",
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
            style={{ marginHorizontal: 10, marginVertical: 15 }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 10,
                borderColor: "white",
                borderWidth: 1.5,
              }}
            />
            <Text
              style={{
                fontSize: SIZES.medium,
                fontFamily: FONTS.bold,
                marginVertical: 3,
              }}
            >
              {item.country}
            </Text>
            <Text
              style={{ color: colors.darkSecondary, fontFamily: FONTS.medium }}
            >
              {item.dateL}, {item.numbrs}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
};

export default RecentSearches;
