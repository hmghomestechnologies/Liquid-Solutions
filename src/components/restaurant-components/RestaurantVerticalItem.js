import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import MapMarker from "../MapMarker";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImageCont from "../ImageCont";

const RestaurantVerticalItem = ({ data, searchedData }) => {
  const navigation = useNavigation();
  const { fImg, address, restaurantName } = data;
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        borderRadius: 10,
        backgroundColor: "white",
        ...SHADOWS.light,
        marginVertical: 7,
      }}
      onPress={() =>
        navigation.navigate("RestaurantDetails", { data, searchedData })
      }
    >
      <View
        style={{
          height: 200,
          // width: "100%",
        }}
      >
        <ImageCont source={fImg} />
      </View>
      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: SIZES.medium,
            fontFamily: FONTS.semiBold,
            color: colors.darkPrimary,
          }}
        >
          {restaurantName}
        </Text>
        <View style={{ paddingVertical: 5, position: "relative" }}>
          <MapMarker location={address} />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>81 Reservations</Text>
          <View>
            <MaterialIcons name="verified" size={30} color="#ff7d00" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantVerticalItem;
