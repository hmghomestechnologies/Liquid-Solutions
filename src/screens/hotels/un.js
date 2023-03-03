import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import {
    DateInput,
    ListItem,
    SemiRounded,
    Spinner,
    SubHeader,
  } from "../../components";
  import {
    Ionicons,
    FontAwesome,
    MaterialCommunityIcons,
    AntDesign,
  } from "@expo/vector-icons";
  import { colors, FONTS, SIZES } from "../../../constants/theme";
  import { InputField, SecBtn } from "../../components/Forms";
  import { useNavigation } from "@react-navigation/native";
  import { FlightSearchInput } from "../../components/flight-components";
  import Footer from "../../components/Layouts/Footer";
  import { hotels as hotel } from "../../../constants/dummy";
  import axios from "axios";
  import baseURL from "../../../constants/baseURL";
  import { SearchedHotel } from "../../components/hotel-components";
  import Toast from "react-native-toast-message";
  import { useHotelContext } from "../../../context/HotelContext";
  import { cities } from "../../../constants/cities";
  
  const HotelSearchScreen = () => {
    const [filteredHotels, setfilteredHotels] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchedHotels, setSearchedHotels] = useState([])
    const [focus, setFocus] = useState(false);
    const [checkInDate, setCheckInDate] = useState("Choose Date");
    const [checkOutDate, setCheckOutDate] = useState("Choose Date");
    const [room, setRoom] = useState(1);
    const [adult, setAdult] = useState(1);
    const [children, setChildren] = useState(0);
    const [city, setCity] = useState("");
    const [citySelected, setCitySelected] = useState(false);
    const [showContainer, setShowContainer] = useState(false);
    const navigation = useNavigation();
    const { hotels } = useHotelContext();
    const getHotels = async () => {
      await setfilteredHotels(hotels);
    };
    useEffect(() => {
      getHotels();
    }, []);
    const searchHotel = (text) => {
      if (text.length > 2) {
        const filtered = cities.filter((i) =>
        i.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);    }
    };
    const openList = () => {
      setFocus(true);
    };
    const onBlur = () => {
      setFocus(false);
    };
    const onFindHotel = async() => {
      if (city === "") {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Destination is required",
          text2: "Please Enter your Destination",
        });
      } else if (checkInDate === "Choose Date") {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Check In Date is required",
          text2: "Please Choose your Check In Date",
        });
      } else if (checkOutDate === "Choose Date") {
        {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Check Out Date is required",
            text2: "Please Choose your Check Out Date",
          });
        }
      } else {
        // const tempHotels = await hotels.filter((i) => i.town === city);
        // await setSearchedHotels(tempHotels);
        let searchedData = {
          city,
          checkInDate,
          checkOutDate,
          room,
          adult,
          children,
        };
        // if(searchedHotels.length > 0){
          navigation.navigate("SearchResult", { searchedData });
        // }else{
        //   Toast.show({
        //     topOffset: 60,
        //     type: "error",
        //     text1: "We Dont Have any Hotel in your Destination currently.",
        //     text2: "Please Try another Location",
        //   });
        // }
  
      }
    };
    if (!hotels) return <Spinner />;
  
    return (
      <View>
        <ScrollView style={{ backgroundColor: colors.bgGray, marginBottom: 20 }}>
          <SemiRounded>
            <View style={{ marginVertical: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 30,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://stockphoto.com/samples/ODA2NjU1MDAzMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/portrait-of-smart-friendly-smiling-kazakh-man-in-glasses-dressed-in-business-suit-in-office-on-white-background-asian-handsome-successful-businessman.jpg",
                  }}
                  style={{ height: 40, width: 40, borderRadius: 100 }}
                />
                <View>
                  <Ionicons
                    name="notifications-outline"
                    size={35}
                    color="white"
                  />
                </View>
              </View>
              <Text
                style={{
                  fontSize: SIZES.extraLarge,
                  fontFamily: "OpenSansRegular",
                  color: "white",
                  fontWeight: "900",
                  marginTop: 20,
                  marginHorizontal: 30,
                  //   marginBottom: 10,
                }}
              >
                Let's Book your Hotel!
              </Text>
            </View>
          </SemiRounded>
          <View
            style={{
              marginVertical: 25,
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: 20,
                borderRadius: 15,
                borderColor: colors.secondary,
                borderWidth: 1,
                marginTop: -100,
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
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
                        placeholder={"Destination"}
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
                  )}
                  {focus ? (
                    <View
                      style={{ position: "absolute", width: "100%", top: 65 }}
                    >
                      <SearchedHotel
                        data={filteredCities}
                        // onPress={onPressCityClick}
                        setCity={setCity}
                        setCitySelected={setCitySelected}
                        setFocus={setFocus}
                      />
                    </View>
                  ) : null}
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
                    <DateInput
                      dateInput={checkOutDate}
                      setDateInput={setCheckOutDate}
                      title={"Check Out Date"}
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
                    }}
                    onPress={() => {
                      setShowContainer(true);
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        color: colors.darkPrimary,
                      }}
                    >{`${room} Room - ${adult} Adult - ${children} Children`}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <SecBtn text={"Find Hotel"} onBtnPress={onFindHotel} />
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 20 }}>
              {/* <SubHeader text={"Popular Hotels"} color={colors.darkPrimary} style={{ zIndex: -1}}/> */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                {hotels &&
                  hotels.slice(0, 4).map((item, index) => (
                    <ListItem key={index} data={item} />
                  ))}
              </View>
            </View>
          </View>
        </ScrollView>
        {showContainer && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 300,
              backgroundColor: "white",
              width: "100%",
              paddingHorizontal: 20,
              justifyContent: "flex-end",
              paddingBottom: 80,
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
                Rooms
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    if (room > 1) {
                      setRoom(room - 1);
                    } else if(room > 34){
                      setRoom(34);
                    }else {
                      setRoom(1);
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
                  {room}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setRoom(room + 1);
                  }}
                >
                  <AntDesign name="plus" size={35} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 8,
                paddingVertical: 5,
                borderTopColor: colors.bgGray,
                borderBottomColor: colors.bgGray,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  color: colors.darkPrimary,
                  fontSize: SIZES.large,
                }}
              >
                Adult
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    if (adult > 1) {
                      setAdult(adult - 1);
                    } else {
                      setAdult(1);
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
                  {adult}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setAdult(adult + 1);
                  }}
                >
                  <AntDesign name="plus" size={35} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            </View>
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
                Children
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    if (children > 0) {
                      setChildren(children - 1);
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
                  {children}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setChildren(children + 1);
                  }}
                >
                  <AntDesign name="plus" size={35} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <Footer active={"search"} />
      </View>
    );
  };
  
  export default HotelSearchScreen;
  