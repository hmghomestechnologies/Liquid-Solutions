import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  FilterContainer,
  FormatedNumber,
  ImageCont,
  ImageSlider,
  MapMarker,
  SearchResultHeader,
  SubHeader,
  WarningText,
} from "../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors, FONTS, SHADOWS, SIZES, width } from "../../../constants/theme";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { SecBtn } from "../../components/Forms";
import { getWordDate } from "../../../constants/functions";

const HotelDetailsScreen = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data, searchedData, categories, calDays } = route?.params;
  const {
    _id,
    address,
    description,
    fImg,
    facilities,
    hotelName,
    images,
    lat,
    lng,
    state,
    town,
  } = data;
  const { adult, checkInDate, checkOutDate, children, city, room } =
    searchedData;
  console.log(categories);
  return (
    <View style={{}}>
      <SearchResultHeader
        head={city}
        body={`${checkInDate} -- ${checkOutDate} | ${adult} Guest`}
      />
      <ScrollView>
        <WarningText text={"COVID19 Protocols"} />
        <View style={{ width: "100%" }}>
          <View
            style={{
              paddingHorizontal: 25,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View></View>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    marginRight: 5,
                    color: colors.primary,
                    fontFamily: FONTS.bold,
                  }}
                >
                  Hotel Policy
                </Text>
                <AntDesign name="exclamationcircle" size={24} color="orange" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 250,
              width: width - 50,
              marginHorizontal: 25,
            }}
          >
            <ImageCont source={fImg} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.medium,
                color: colors.darkSecondary,
              }}
            >
              {hotelName}
            </Text>
            {/* <View style={{ flexDirection: "row", marginLeft: 10 }}>
              <Ionicons name="star" size={24} color="orange" />
              <Ionicons name="star" size={24} color="orange" />
              <Ionicons name="star" size={24} color="orange" />
            </View> */}
          </View>
          <View
            style={[
              styles.miniCont,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <View>
              <Text style={{}}>
                Price for {`${calDays} Nights, ${searchedData.adult} Adults`}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FormatedNumber
                  value={categories[0]?.price * calDays}
                  color={colors.secondary}
                  size={SIZES.extraLarge}
                />
              </View>
              <Text style={{ fontSize: SIZES.small, color: colors.gray }}>
                Includes tax and fees
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: SIZES.base,
                  color: colors.gray,
                  fontFamily: FONTS.bold,
                }}
              >
                Basic Plan:{" "}
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "600",
                }}
              >
                {categories[0]?.categoryName}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.extraBold,
                  color: colors.gray,
                  textDecorationLine: "underline",
                  textDecorationColor: colors.gray,
                }}
                onPress={() =>
                  navigation.navigate("SelectRoomScreen", {
                    searchedData,
                    categories,
                    calDays,
                  })
                }
              >
                More Plans
              </Text>
            </View>
          </View>
          <View style={styles.miniCont}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    color: colors.darkPrimary,
                  }}
                >
                  Check In
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.small,
                    color: colors.primary,
                  }}
                >
                  {getWordDate(searchedData.checkInDate)}
                </Text>
              </View>
              <View style={{ marginLeft: 30 }}>
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    color: colors.darkPrimary,
                  }}
                >
                  Check Out
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.small,
                    color: colors.primary,
                  }}
                >
                  {getWordDate(searchedData.checkOutDate)}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <Text
                style={{ fontFamily: FONTS.medium, color: colors.darkPrimary }}
              >
                Room and Guest
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: SIZES.small,
                  color: colors.primary,
                }}
              >
                {`${room} room, ${adult} Adult, ${children} Children`}
              </Text>
            </View>
          </View>
          {/* 
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.small,
                color: "gray",
              }}
            >
              {data.rating} |
            </Text>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.small,
                color: "gray",
              }}
            >
              {data.star}
            </Text>
          </View> */}
          {/* <MapMarker location={``} /> */}
          <View
            style={[
              styles.miniCont,
              {
                paddingVertical: 15,
                paddingHorizontal: 25,
              },
            ]}
          >
            <Text style={{ fontFamily: FONTS.bold }}>Address: </Text>
            <MapMarker location={`${address}, ${town}, ${state}, Nigeria.`} />
          </View>
          <View style={styles.miniCont}>
            <SubHeader text={"Description"} color={colors.primary} />
            <Text
              style={{
                marginVertical: 5,
                color: "gray",
                fontFamily: FONTS.medium,
                textAlign: "justify",
              }}
            >
              {description}
            </Text>
          </View>
          {/* Facilities */}
          {/* <View style={styles.miniCont}>
            <SubHeader text={"Facilities"} color={colors.primary} />
            <View>
              {facilities.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 5,
                  }}
                  key={index}
                >
                  <FontAwesome5
                    name="angellist"
                    size={24}
                    color={colors.secondary}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      fontSize: SIZES.small,
                      marginLeft: 10,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View> */}
        </View>
        <View style={{ height: 125, width: "100%" }} />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 55,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <SecBtn
          text={"Continue"}
          onBtnPress={() =>
            navigation.navigate("SelectRoomScreen", {
              searchedData,
              categories,
              calDays,
            })
          }
        />
      </View>
    </View>
  );
};

export default HotelDetailsScreen;
const styles = StyleSheet.create({
  miniCont: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    ...SHADOWS.medium,
  },
});
