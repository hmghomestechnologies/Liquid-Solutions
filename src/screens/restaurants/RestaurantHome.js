import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header, DateInput, TimeInput, SemiRounded } from "../../components";
import Footer from "../../components/Layouts/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  EvilIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { SecBtn } from "../../components/Forms";
import { useNavigation } from "@react-navigation/native";
import { SearchedHotel } from "../../components/hotel-components";
import Toast from "react-native-toast-message";
import { cities } from "../../../constants/cities";
import { useRestaurantContext } from "../../../context/RestaurantContext";

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
  const [onFood, setOnFood] = useState(true);
  const [onRestaurant, setOnRestaurant] = useState(false);
  const navigation = useNavigation();
  const { baskets } = useRestaurantContext();

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
  function onActiveFood() {
    setOnFood(true);
    setOnRestaurant(false);
    setCity("");
  }
  function onActiveRestaurant() {
    setOnFood(false);
    setOnRestaurant(true);
    setCity("");
  }
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
  const onFindFoods = async () => {
    if (city === "") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Location is required",
        text2: "Please Enter your Location",
      });
    } else {
      navigation.navigate("DishesSearchResult", { city });
    }
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
      <SemiRounded height={400}>
        <TouchableOpacity
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: 20,
            paddingRight: 10,
          }}
          onPress={() => navigation.navigate("BasketScreen")}
        >
          <View style={{ position: "relative" }}>
            <FontAwesome size={34} color={"white"} name="shopping-basket" />

            {baskets?.length > 0 && (
              <Text
                style={{
                  position: "absolute",
                  right: 10,
                  top: 2,
                  zIndex: 1,
                  backgroundColor: colors.errorColor,
                  borderRadius: 999,
                  color: "white",
                  paddingVertical: 2,
                  paddingHorizontal: 5,
                }}
              >
                {baskets?.length <= 99 ? baskets?.length : "99+"}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={{}}>
          <Text
            style={{
              fontSize: SIZES.large,
              fontFamily: FONTS.light,
              color: "white",
              marginHorizontal: 30,
              marginBottom: 30,
              textAlign: "center",
              // fontStyle: "italic",
            }}
          >
            Let's Manage your Restaurant Reservation
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Image
            source={{
              uri: "https://res.cloudinary.com/dc5ulgooc/image/upload/v1680504564/240_F_49231350_jh7XTcw63loFJEKquojhg1lveFRzYSI7_wpt4hh.jpg",
            }}
            style={{ height: 150, width: "30%" }}
          />
          <Image
            source={{
              uri: "https://res.cloudinary.com/dc5ulgooc/image/upload/v1680504720/food_oqp5mt.jpg",
            }}
            style={{ height: 150, width: "70%" }}
          />
        </View>
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONTS.light,
            color: "white",
            textAlign: "center",
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          Let's Order your Delicious Meal
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[
              styles.tabCont,
              { backgroundColor: onFood ? "white" : colors.secondary },
            ]}
            onPress={onActiveFood}
          >
            <Ionicons
              name="fast-food-outline"
              size={30}
              color={onFood ? colors.successColor : "white"}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: FONTS.semiBold,
                color: onFood ? colors.secondary : "white",
              }}
            >
              FOODS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabCont,
              { backgroundColor: onRestaurant ? "white" : colors.secondary },
            ]}
            onPress={onActiveRestaurant}
          >
            <MaterialIcons
              name="kitchen"
              size={30}
              color={onRestaurant ? colors.successColor : "white"}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: FONTS.semiBold,
                color: onRestaurant ? colors.secondary : "white",
              }}
            >
              RESTAURANTS
            </Text>
          </TouchableOpacity>
        </View>
      </SemiRounded>
      {/* Find Food */}
      {onFood && (
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
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 15,
                borderColor: colors.darkSecondary,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "white",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
                marginVertical: 10,
              }}
              onPress={() => setShowLocationCont(true)}
            >
              <MaterialCommunityIcons
                name="map-marker-radius-outline"
                size={20}
                color={"red"}
              />
              <Text
                style={{
                  color: colors.gray,
                  width: "90%",
                  fontWeight: "500",
                }}
              >
                {city ? city : "City"}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
              }}
            >
              <SecBtn text={"FIND FOODS"} onBtnPress={onFindFoods} />
            </View>
          </View>
        </View>
      )}
      {/* Find Restaurants */}
      {onRestaurant && (
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
              {/* {citySelected ? (
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
              )} */}
              <TouchableOpacity
                style={{
                  width: "100%",
                  paddingVertical: 15,
                  borderColor: colors.darkSecondary,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "white",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}
                onPress={() => setShowLocationCont(true)}
              >
                <MaterialCommunityIcons
                  name="map-marker-radius-outline"
                  size={20}
                  color={"red"}
                />
                <Text
                  style={{
                    color: colors.gray,
                    width: "90%",
                    fontWeight: "500",
                  }}
                >
                  {city ? city : "City"}
                </Text>
              </TouchableOpacity>
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
              <SecBtn
                text={"Find Restaurants"}
                onBtnPress={onFindRestaurants}
              />
            </View>
          </View>
        </View>
      )}
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
const styles = StyleSheet.create({
  tabCont: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
