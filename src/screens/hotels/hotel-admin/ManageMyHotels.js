import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../../constants/baseURL";
import Spinner from "react-native-loading-spinner-overlay";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { MapMarker, NoResult } from "../../../components";
import { containerMedium } from "../../../../constants/layouts";
import { S3Image } from "aws-amplify-react-native";
import { useNavigation } from "@react-navigation/native";

const ManageMyHotels = () => {
  const [hotels, setHotels] = useState(null);
  const [onLoading, setOnLoading] = useState(true);
  const { userId, config } = useAuthContext();
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get(`${baseURL}/hotel`, config)
      .then((res) => {
        setHotels(res.data);
        console.log(res.data);
        setOnLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setHotels([]);
      setOnLoading(false);
    };
  }, []);
  function renderHotel(item) {
    return (
      <TouchableOpacity
        key={item._id}
        style={[
          containerMedium,
          {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 15,
          },
        ]}
        onPress={() =>
          navigation.navigate("AdminHotelDetails", { hotel: item })
        }
      >
        <View style={{ width: "30%" }}>
          <S3Image
            imgKey={item.fImg}
            style={{
              height: 80,
              width: 80,
              borderRadius: 20,
            }}
          />
        </View>
        <View style={{ width: "70%", paddingLeft: 20 }}>
          <Text
            style={{
              fontSize: SIZES.medium,
              fontFamily: FONTS.medium,
              marginVertical: 3,
              color: colors.primary,
            }}
          >
            Name:{item.hotelName}
          </Text>
          <MapMarker
            location={`${item.address}, ${item.town}, ${item.state} State.`}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        paddingHorizontal: 30,
      }}
    >
      <Spinner visible={onLoading} />
      {hotels?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={hotels}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderHotel(item)}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.large,
              }}
            >
              Your Hotel(s)
            </Text>
          }
          style={{ marginHorizontal: 10, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 100, width: "100%" }} />}
        />
      ) : (
        <NoResult text={`${"You Have No Hotel Added"}`} />
      )}
    </View>
  );
};

export default ManageMyHotels;
