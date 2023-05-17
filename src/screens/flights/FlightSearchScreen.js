import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  DateInput,
  FlightSearchTabTiltle,
  HorizontalBookingItem,
  ListItem,
  SemiRounded,
  SubHeader,
} from "../../components";
import { colors, FONTS, fonts, logo, SIZES } from "../../../constants/theme";
import { SecBtn } from "../../components/Forms";
import { useNavigation } from "@react-navigation/native";
import {
  AirportsListContainer,
  DiscountComponent,
  FlightSearchInput,
  RecentSearches,
} from "../../components/flight-components";
import Footer from "../../components/Layouts/Footer";
import { hotels } from "../../../constants/dummy";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { TIQWA_API_TOKEN } from "../../../constants/ApiKeys";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import Toast from "react-native-toast-message";
const SearchScreen = () => {
  const [roundTripTab, setRoundTripTab] = useState(true);
  const [oneWayTab, setOneWayTab] = useState(false);
  const [multiCityTab, setMultiCityTab] = useState(false);
  const [departureDate, setDepartureDate] = useState("Choose Date");
  const [returnDate, setReturnDate] = useState("Choose Date");
  const [departureAirport, setDepartureAirport] = useState(null);
  const [onShowDepartureAirportContainer, setOnShowDepartureAirportContainer] =
    useState(false);
  const [destinationAirport, setDestinationAirport] = useState(null);
  const [
    onShowDestinationAirportContainer,
    setOnShowDestinationAirportContainer,
  ] = useState(false);
  const [cabin, setCabin] = useState("");
  const [adults, setAdult] = useState("1");
  const [onLoading, setOnLoading] = useState(false);

  const navigation = useNavigation();
  const cabin_data = [
    { slug: "economy", title: "Economy" },
    { slug: "premium_economy", title: "Premium Economy" },
    { slug: "business", title: "Business" },
    { slug: "first", title: "First" },
  ];
  const passenger_data = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const onRoundCityTab = () => {
    setRoundTripTab(true);
    setOneWayTab(false);
    setMultiCityTab(false);
  };
  const onOneWaytab = () => {
    setReturnDate("Choose Date");
    setRoundTripTab(false);
    setOneWayTab(true);
    setMultiCityTab(false);
  };
  const onMultiCityTab = () => {
    setRoundTripTab(false);
    setOneWayTab(false);
    setMultiCityTab(true);
  };
  const onFindFlight = async () => {
    const options = {
      method: "GET",
      url: "https://sandbox.tiqwa.com/v1/flight/search",
      params: {
        origin: departureAirport.iata_code,
        destination: destinationAirport.iata_code,
        departure_date: departureDate,
        return_date: returnDate !== "Choose Date" ? returnDate : null,
        cabin: cabin,
        adults: adults,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TIQWA_API_TOKEN}`,
      },
    };
    console.log(options.params);

    const searchedData = {
      departureAirport,
      destinationAirport,
      departureDate,
      returnDate: returnDate !== "Choose Date" ? returnDate : null,
      cabin,
      adults,
    };
    if (
      departureAirport === null ||
      destinationAirport === null ||
      departureDate === "Choose Date" ||
      cabin === "" ||
      adults === ""
    ) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "All Field are required",
        text2: "Please Fill all Fields",
      });
    } else {
      setOnLoading(true);
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setOnLoading(false);
          if (response.data.length > 0) {
            navigation.navigate("FlightSearchResult", {
              searchedData,
              flightDetails: response.data,
            });
          } else {
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Ops, No Flight Details for your Searched Details",
              text2: "Please Try Again",
            });
          }
        })
        .catch(function (error) {
          console.error(error);
          setOnLoading(false);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error Occured while getting Flight Details",
            text2: "Please Try Again",
          });
        });
    }
  };
  return (
    <View>
      <ScrollView
        style={{
          backgroundColor: colors.bgGray,
          paddingBottom: 20,
          height: "100%",
        }}
      >
        <Spinner visible={onLoading} />
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
              Let's Book your Flight!
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
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 10,
              }}
            >
              <FlightSearchTabTiltle
                title="Round Trip"
                active={roundTripTab}
                onPress={onRoundCityTab}
              />
              <FlightSearchTabTiltle
                title="One Way"
                active={oneWayTab}
                onPress={onOneWaytab}
              />
              {/* <FlightSearchTabTiltle
                title="multiCityTab"
                active={multiCityTab}
                onPress={onMultiCityTab}
              /> */}
            </View>
            {/* ROUND TRIP */}

            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View style={{ width: "100%" }}>
                <TouchableOpacity
                  style={{
                    borderColor: colors.darkSecondary,
                    borderWidth: 1,
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: 10,
                  }}
                  onPress={() => setOnShowDepartureAirportContainer(true)}
                >
                  <Text
                    style={{
                      color: "gray",
                    }}
                  >
                    {"From Where?"}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: SIZES.medium,
                        // marginLeft: 5,
                        width: "100%",
                        marginVertical: 5,
                        // fontStyle: "italic",
                      }}
                    >
                      {departureAirport === null
                        ? "City or Airport"
                        : `${departureAirport.name} Airport`}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderColor: colors.darkSecondary,
                    borderWidth: 1,
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: 10,
                  }}
                  onPress={() => setOnShowDestinationAirportContainer(true)}
                >
                  <Text
                    style={{
                      color: "gray",
                    }}
                  >
                    {"To Where?"}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: SIZES.medium,
                        // marginLeft: 5,
                        width: "100%",
                        marginVertical: 5,
                        // fontStyle: "italic",
                      }}
                    >
                      {destinationAirport === null
                        ? "City or Airport"
                        : `${destinationAirport.name} Airport`}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <DateInput
                    dateInput={departureDate}
                    setDateInput={setDepartureDate}
                    title={"Departure Date"}
                    width={roundTripTab ? "48%" : "100%"}
                  />
                  {roundTripTab && (
                    <DateInput
                      dateInput={returnDate}
                      setDateInput={setReturnDate}
                      title={"Return Date"}
                      width={"48%"}
                    />
                  )}
                </View>
                {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FlightSearchInput
                    placeholder="0"
                    desc="Adult"
                    type={"numeric"}
                    width={"32%"}
                  />
                  <FlightSearchInput
                    placeholder="0"
                    desc="Children"
                    type={"numeric"}
                    width={"32%"}
                  />
                  <FlightSearchInput
                    placeholder="0"
                    desc="Infant"
                    type={"numeric"}
                    width={"32%"}
                  />
                </View> */}
                <View
                  style={{
                    borderRadius: 5,
                    width: "100%",
                    backgroundColor: "white",
                    borderColor: colors.secondary,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    marginVertical: 10,
                  }}
                >
                  <Picker
                    selectedValue={cabin}
                    onValueChange={(itemValue) => {
                      setCabin(itemValue);
                    }}
                  >
                    <Picker.Item
                      label={"Select Class"}
                      value={""}
                      style={{
                        fontSize: SIZES.medium,
                        fontFamily: FONTS.light,
                        color: "gray",
                      }}
                    />
                    {cabin_data.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.title}
                        value={item.slug}
                        style={{
                          fontSize: SIZES.large,
                          fontFamily: FONTS.light,
                        }}
                      />
                    ))}
                  </Picker>
                </View>
                <View
                  style={{
                    borderRadius: 5,
                    width: "100%",
                    backgroundColor: "white",
                    borderColor: colors.secondary,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    marginVertical: 10,
                  }}
                >
                  <Picker
                    selectedValue={adults}
                    onValueChange={(itemValue) => {
                      setAdult(itemValue);
                    }}
                  >
                    {passenger_data.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={`${item} Passenger`}
                        value={item}
                        style={{
                          fontSize: SIZES.large,
                          fontFamily: FONTS.light,
                        }}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                }}
              >
                <SecBtn text={"Let's Go"} onBtnPress={onFindFlight} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer active={"search"} />
      {/* Departure Modal */}
      <Modal visible={onShowDepartureAirportContainer} animationType="slide">
        <AirportsListContainer
          onClosePress={() => setOnShowDepartureAirportContainer(false)}
          setValue={setDepartureAirport}
        />
      </Modal>
      {/* Departure Modal */}
      <Modal visible={onShowDestinationAirportContainer} animationType="slide">
        <AirportsListContainer
          onClosePress={() => setOnShowDestinationAirportContainer(false)}
          setValue={setDestinationAirport}
        />
      </Modal>
    </View>
  );
};

export default SearchScreen;
