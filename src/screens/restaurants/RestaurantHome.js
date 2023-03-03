import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header, DateInput, TimeInput } from "../../components";
import Footer from "../../components/Layouts/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  EvilIcons,
} from "@expo/vector-icons";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { SecBtn } from "../../components/Forms";
import { useNavigation } from "@react-navigation/native";
import { SearchedHotel } from "../../components/hotel-components";
import Toast from "react-native-toast-message";
import { cities } from "../../../constants/cities";

const RestaurantHome = () => {
  const [filteredCities, setFilteredCities] = useState([]);
  const [focus, setFocus] = useState(false);
  const [checkInDate, setCheckInDate] = useState("Choose Date");
  const [checkInTime, setCheckInTime] = useState("Pick Time");
  const [persons, setPersons] = useState(1);
  const [city, setCity] = useState("");
  const [citySelected, setCitySelected] = useState(false);
  const [showContainer, setShowContainer] = useState(false);
  const [showLocationCont, setShowLocationCont] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        if (!jsonValue) {
          navigation.navigate("LoginScreen");
        } else {
          // console.log(jsonValue);
        }
      } catch (e) {
        console.log(e);
        // error reading value
      }
    };
    getUser();
  }, []);
  const searchRestaunts = async (text) => {
    setCityLoading(true);
    if (text.length > 1) {
      setCityLoading(false);
      const filtered = await cities.filter((i) =>
        i.toLowerCase().includes(text.toLowerCase())
      );
      await setFilteredCities(filtered);
      setCityLoading(false);
    }
  };
  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  const onFindRestaurants = async () => {
    if (city === "") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Location is required",
        text2: "Please Enter your Location",
      });
    } else if (checkInDate === "Choose Date") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Check In Date is required",
        text2: "Please Choose your Check In Date",
      });
    } else if (checkInTime === "Pick Time") {
      {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Time is required",
          text2: "Please Pick your Check In Time",
        });
      }
    } else {
      let searchedData = {
        city,
        checkInDate,
        checkInTime,
        persons,
      };
      navigation.navigate("ResSearchResult", { searchedData });
    }
  };
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Header
        placeholder={"Find your table for any location"}
        active={"restaurants"}
        searchPath={"RestaurantHome"}
      />
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 20,
          borderRadius: 15,
          borderColor: colors.secondary,
          borderWidth: 1,
          marginTop: -15,
          paddingVertical: 10,
          marginHorizontal: 20,
          // zIndex: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ width: "100%" }}>
            {citySelected ? (
              <View
                style={{
                  width: "100%",
                  position: "relative",
                  marginVertical: 5,
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={"google-maps"}
                  size={24}
                  color={"red"}
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 10,
                    zIndex: 1,
                  }}
                />
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    color: colors.darkPrimary,
                    fontSize: SIZES.medium,
                    width: "100%",
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    borderColor: colors.darkSecondary,
                    borderWidth: 1,
                    fontWeight: "600",
                    paddingLeft: 40,
                    borderRadius: 10,
                    backgroundColor: "white",
                  }}
                >
                  {city}
                </Text>
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
                  onPress={() => {
                    setCitySelected(false);
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  position: "relative",
                  marginVertical: 5,
                  //   flexDirection: "row",
                  //   alignItems: "center",
                  //   justifyContent: "space-between",
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
                <TouchableOpacity
                  style={{
                    width: "100%",
                    paddingHorizontal: 15,
                    paddingVertical: 13,
                    borderColor: colors.darkSecondary,
                    borderWidth: 1,
                    paddingLeft: 40,
                    borderRadius: 10,
                    backgroundColor: "white",
                  }}
                  onPress={() => setShowLocationCont(true)}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      color: colors.secondary,
                      fontWeight: "600",
                      fontSize: SIZES.medium,
                    }}
                  >
                    Enter Your Location
                  </Text>
                </TouchableOpacity>
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
            )}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginVertical: 5,
              }}
            >
              <DateInput
                dateInput={checkInDate}
                setDateInput={setCheckInDate}
                title={"Check In Date"}
                width={"48%"}
              />
              <TimeInput
                timeInput={checkInTime}
                setTimeInput={setCheckInTime}
                title={"Time"}
                width={"48%"}
              />
            </View>
            <TouchableOpacity
              style={{
                borderColor: colors.darkSecondary,
                borderWidth: 1,
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginVertical: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                setShowContainer(true);
              }}
            >
              <EvilIcons name="user" size={26} color={colors.secondary} />
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  color: colors.darkPrimary,
                  fontSize: SIZES.medium,
                  marginLeft: 5,
                }}
              >{`${persons} Persons`}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
            }}
          >
            <SecBtn text={"Find Restaurants"} onBtnPress={onFindRestaurants} />
          </View>
        </View>
      </View>
      {showContainer && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            height: 200,
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "flex-end",
            paddingBottom: 80,
            borderWidth: 1,
            borderColor: colors.darkPrimary,
            backgroundColor: "white",
          }}
        >
          <FontAwesome
            name={"times-circle"}
            size={30}
            color={"gray"}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              zIndex: 1,
            }}
            onPress={() => setShowContainer(false)}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: colors.darkPrimary,
                fontSize: SIZES.large,
              }}
            >
              Persons
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  if (persons > 1) {
                    setPersons(persons - 1);
                  }
                }}
              >
                <AntDesign name="minus" size={35} color={colors.secondary} />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 25,
                  color: colors.primary,
                  paddingHorizontal: 20,
                }}
              >
                {persons}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setPersons(persons + 1);
                }}
              >
                <AntDesign name="plus" size={35} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <Footer active={"search"} searchPath={"RestaurantHome"} />
      {showLocationCont && (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            position: "absolute",
            top: 0,
            paddingVertical: 80,
            paddingHorizontal: 20,
          }}
        >
          <FontAwesome5
            name={"times"}
            size={30}
            color={"gray"}
            style={{
              position: "absolute",
              right: 20,
              top: 40,
              zIndex: 1,
            }}
            onPress={() => setShowLocationCont(false)}
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
                placeholder={"Enter Your Location"}
                onChangeText={(text) => searchRestaunts(text)}
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
                  <Text
                    style={{
                      fontFamily: FONTS.extraBold,
                      fontStyle: "italic",
                      fontSize: SIZES.extraLarge,
                      color: colors.primary,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                    }}
                  >
                    Loading ...
                  </Text>
                ) : (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: 20 }}
                    // style={{ position: "absolute", width: "100%", top: 65 }}
                  >
                    {filteredCities.length > 0 ? (
                      <SearchedHotel
                        data={filteredCities}
                        setCity={setCity}
                        setCitySelected={setCitySelected}
                        setFocus={setFocus}
                        setShowContainer={setShowLocationCont}
                      />
                    ) : (
                      <Text>No Search City</Text>
                    )}
                    <View style={{ height: 30, width: "100%" }} />
                  </ScrollView>
                )}
              </View>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
};

export default RestaurantHome;
