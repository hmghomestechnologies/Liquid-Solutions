import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  EvilIcons,
} from "@expo/vector-icons";
import { TextInput } from "react-native";
import { useState } from "react";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import { containerDark } from "../../../constants/layouts";
import { TIQWA_API_TOKEN } from "../../../constants/ApiKeys";
const AirportsListContainer = ({ onClosePress, setValue }) => {
  const [filteredHotels, setfilteredHotels] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchedHotels, setSearchedHotels] = useState([]);
  const [focus, setFocus] = useState(false);
  const [checkInDate, setCheckInDate] = useState("Choose Date");
  const [checkOutDate, setCheckOutDate] = useState("Choose Date");
  const [room, setRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [city, setCity] = useState("");
  const [citySelected, setCitySelected] = useState(false);
  const [showContainer, setShowContainer] = useState(false);
  const [showLocationCont, setShowLocationCont] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const searchHotel = async (text) => {
    setCityLoading(true);
    if (text.length > 3) {
      const options = {
        method: "GET",
        url: `https://sandbox.tiqwa.com/v1/airports?keyword=${text}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TIQWA_API_TOKEN}`,
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setFilteredCities(response.data);
          setCityLoading(false);
        })
        .catch(function (error) {
          console.error(error);
          setCityLoading(false);
        });
    }
  };
  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  return (
    <View style={{ paddingTop: 70, paddingHorizontal: 20 }}>
      <FontAwesome5
        name={"times"}
        size={25}
        color={"gray"}
        style={{
          position: "absolute",
          right: 20,
          top: 20,
          zIndex: 1,
        }}
        onPress={onClosePress}
      />
      <View>
        <View
          style={{
            width: "100%",
            position: "relative",
            marginVertical: 5,
          }}
        >
          <Ionicons
            name={"md-search"}
            size={24}
            color={"gray"}
            style={{
              position: "absolute",
              left: 10,
              top: 10,
              zIndex: 1,
            }}
          />
          <TextInput
            placeholder={"City or Airport"}
            onChangeText={(text) => searchHotel(text)}
            onFocus={openList}
            style={{
              fontFamily: "OpenSansMedium",
              color: colors.secondary,
              width: "100%",
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderColor: colors.darkSecondary,
              borderWidth: 1,
              fontWeight: "600",
              paddingLeft: 40,
              borderRadius: 10,
              backgroundColor: "white",
            }}
          />
          <FontAwesome
            name={"times-circle"}
            size={24}
            color={"gray"}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              zIndex: 1,
            }}
            onPress={onBlur}
          />
        </View>
        {focus ? (
          <View>
            {cityLoading ? (
              <View style={{ marginTop: 20 }}>
                <ActivityIndicator color={colors.secondary} />
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingVertical: 20 }}
                // style={{ position: "absolute", width: "100%", top: 65 }}
              >
                {filteredCities.length > 0 ? (
                  <View>
                    {filteredCities.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          containerDark,
                          {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          },
                        ]}
                        onPress={() => {
                          setValue(item);
                          onClosePress();
                        }}
                      >
                        <View style={{ width: "80%" }}>
                          <Text
                            style={{
                              color: "gray",
                              fontFamily: FONTS.medium,
                              fontSize: SIZES.large,
                            }}
                          >{`${item.city}, ${item.country}`}</Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: FONTS.bold,
                              marginTop: 5,
                            }}
                          >{`${item.name} Airport(${item.city_code})`}</Text>
                        </View>
                        <View style={[containerDark, { width: "20%" }]}>
                          <Text
                            style={{
                              textAlign: "center",
                              color: colors.primary,
                              fontFamily: FONTS.bold,
                              fontSize: 15,
                            }}
                          >
                            {item.city_code}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <Text>No Searched Airport</Text>
                )}
                <View style={{ height: 80, width: "100%" }} />
              </ScrollView>
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default AirportsListContainer;
