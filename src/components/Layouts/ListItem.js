import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import MapMarker from "../MapMarker";
import ImageCont from "../ImageCont";

const ListItem = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: width / 2 - 30,
        margin: 5,
        position: "relative",
        marginVertical: 10,
        borderColor: "#939090",
        borderRadius: 10,
        ...SHADOWS.light,
        zIndex: -1,
      }}
      onPress={() => navigation.navigate("HotelListItemDetails", { data })}
    >
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          borderRadius: 15,
        }}
      >
        <View style={{ margin: 5, position: "relative" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              height: 35,
              width: 35,
              borderRadius: 100,
              position: "absolute",
              top: 5,
              right: 5,
              zIndex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign
              name={data.isFavorite ? "heart" : "hearto"}
              size={24}
              color={data.isFavorite ? "red" : "red"}
            />
          </TouchableOpacity>
          <View style={{ height: 130 }}>
            <ImageCont source={data.fImg} radius={20} />
          </View>
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 0 }}>
          <Text
            style={{
              fontSize: SIZES.medium,
              color: colors.darkPrimary,
              marginVertical: 3,
              fontFamily: FONTS.bold,
            }}
          >
            {data.hotelName}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 2,
              marginBottom: 5,
            }}
          >
            <MapMarker location={data.town} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
