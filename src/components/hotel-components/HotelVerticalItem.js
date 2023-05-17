import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import FormatedNumber from "../FormatedNumber";
import MapMarker from "../MapMarker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import ImageCont from "../ImageCont";
import { Octicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const HotelVerticalItem = ({ data, searchedData }) => {
  const navigation = useNavigation();
  const { hotelName, fImg, address, state, town } = data;
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [calDays, setCalDays] = useState(null);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const calDate = () => {
    const date1 = new Date(searchedData.checkInDate);
    const date2 = new Date(searchedData.checkOutDate);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setCalDays(diffDays);
  };
  useEffect(() => {
    axios
      .get(`${baseURL}/category/hotel/categories/${data._id}`)
      .then((res) => {
        setCategories(res.data);
        setCategory(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    calDate();
    return () => {
      setCategory([]);
    };
  }, []);

  // if (!category?.categoryName) return <TransparentSpinner />;
  // console.log(searchedData);
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "white",
        marginVertical: 10,
        ...SHADOWS.medium,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
        position: "relative",
      }}
      onPress={() => {
        if (categories.length > 0) {
          navigation.navigate("HotelDetailsScreen", {
            data,
            searchedData,
            categories,
            calDays,
          });
        } else {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "This hotel is not ready to be booked",
            text2:
              "Please Choose another Hotel in within your preferred Destination",
          });
        }
      }}
    >
      <Octicons
        name="verified"
        size={30}
        color={colors.successColor}
        style={{ position: "absolute", right: 5, top: 5 }}
      />
      {/* Image */}
      <View style={{ height: 140, width: "40%" }}>
        <ImageCont source={fImg} />
        {/* borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10, */}
      </View>
      {/* Description */}
      <View
        style={{
          width: "60%",
          paddingTop: 15,
          paddingHorizontal: 20,
          paddingRight: 20,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.medium,
            color: colors.darkSecondary,
          }}
        >
          {hotelName}
        </Text>
        {/* <View
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
          <Ionicons name="star" size={24} color="orange" />
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
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "gray",
            marginVertical: 10,
          }}
        />
        <View style={{ marginRight: 10 }}>
          <MapMarker location={`${address}, ${town}, ${state} State.`} />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: SIZES.small, marginVertical: 2 }}>
            <Text
              style={{
                fontSize: SIZES.base,
                color: colors.gray,
                fontFamily: FONTS.bold,
              }}
            >
              Basic Plan:{" "}
            </Text>
            {category?.categoryName}
          </Text>
          <Text
            style={{
              fontSize: SIZES.small,
              marginVertical: 2,
              marginBottom: 6,
            }}
          >
            Price for {`${calDays} Nights, ${searchedData.adult} Adults`}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            {category?.discountedPrice === 0 ? (
              <>
                <FormatedNumber
                  value={category?.price * calDays}
                  color={colors.primary}
                  size={SIZES.large}
                />
              </>
            ) : (
              <View style={{ flexDirection: "column" }}>
                <View>
                  <FormatedNumber
                    value={category?.price * calDays}
                    color={colors.primary}
                    size={SIZES.large}
                    isStrike
                  />
                </View>
                <FormatedNumber
                  value={category?.discountedPrice * calDays}
                  color={colors.primary}
                  size={SIZES.large}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelVerticalItem;
