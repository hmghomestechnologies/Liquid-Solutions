import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import FormatedNumber from "../FormatedNumber";
import { useNavigation } from "@react-navigation/native";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import ImageCont from "../ImageCont";

const CarResultItem = ({ data }) => {
  const navigation = useNavigation();
  console.log(data);
  return (
    <View
      style={{
        // borderColor: colors.secondary,
        // borderWidth: 1,
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: "white",
        width: "100%",
        ...SHADOWS.dark,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Image */}
        <View style={{ width: "50%" }}>
          <View style={{ height: 150, width: "100%" }}>
            <ImageCont source={data.carImage} />
          </View>
        </View>
        {/* Description */}
        <View style={{ width: "50%", paddingHorizontal: 10 }}>
          <Text
            style={{
              color: colors.darkPrimary,
              fontFamily: FONTS.bold,
              fontSize: SIZES.medium,
            }}
          >
            {data.carName}
          </Text>
          <Text style={{ color: "gray", fontSize: SIZES.small }}>
            Model: {data.carModel}
          </Text>
          <Text style={{ color: "gray", fontSize: SIZES.small }}>
            Color: {data.carColor}
          </Text>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="user" size={20} color={colors.secondary} />
              <Text
                style={{ fontSize: SIZES.large, color: "gray", marginLeft: 5 }}
              >
                {4}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="car-door"
                size={20}
                color={colors.secondary}
              />
              <Text
                style={{ fontSize: SIZES.large, color: "gray", marginLeft: 5 }}
              >
                4
              </Text>
            </View>
          </View>
          {/* Bottom */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <MaterialIcons name="stars" size={20} color="green" />
              <Text style={{ color: "green" }}>Verified</Text>
            </View>
            <View>
              <FormatedNumber
                value={data.pricePerDay}
                color={colors.primary}
                size={SIZES.large}
              />
              <Text style={{ fontSize: SIZES.small }}>Per Day</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.secondary,
          width: "100%",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          position: "relative",
        }}
        onPress={() => navigation.navigate("CarDetailsScreen", { data })}
      >
        {/* Car Specs Been Removed for now */}
        {/* <View>
          {data.carSpecs.slice(0, 3).map((text, i) => (
            <View
              style={{ flexDirection: "row", alignItems: "center" }}
              key={i}
            >
              <AntDesign name="API" size={15} color="white" />
              <Text
                style={{ marginLeft: 8, color: "white", fontSize: SIZES.small }}
              >
                {text}
              </Text>
            </View>
          ))}
        </View> */}
        <View>
          <AntDesign name="right" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CarResultItem;
