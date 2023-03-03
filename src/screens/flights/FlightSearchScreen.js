import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import {
  DateInput,
  FlightSearchTabTiltle,
  HorizontalBookingItem,
  ListItem,
  SemiRounded,
  SubHeader,
} from "../../components";
import {
  MaterialIcons,
  Fontisto,
  AntDesign,
  EvilIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { colors, fonts, logo, SIZES } from "../../../constants/theme";
import { SecBtn } from "../../components/Forms";
import { useNavigation } from "@react-navigation/native";
import {
  DiscountComponent,
  FlightSearchInput,
  RecentSearches,
} from "../../components/flight-components";
import Footer from "../../components/Layouts/Footer";
import { hotels } from "../../../constants/dummy";
const SearchScreen = () => {
  const [activeFlight, setActiveFlight] = useState(true);
  const [activeHotel, setActiveHotel] = useState(false);
  const [activeCar, setActiveCar] = useState(false);
  const [activeCruise, setActiveCruise] = useState(false);
  const [roundTripTab, setRoundTripTab] = useState(true);
  const [oneWayTab, setOneWayTab] = useState(false);
  const [multiCityTab, setMultiCityTab] = useState(false);
  const [departureDate, setDepartureDate] = useState("Choose Date");
  const [returnDate, setReturnDate] = useState("Choose Date");
  const navigation = useNavigation();
  const onFlights = () => {
    setActiveFlight(true);
    setActiveHotel(false);
    setActiveCar(false);
    setActiveCruise(false);
  };
  const onHotels = () => {
    setActiveFlight(false);
    setActiveHotel(true);
    setActiveCar(false);
    setActiveCruise(false);
  };
  const onCars = () => {
    setActiveFlight(false);
    setActiveHotel(false);
    setActiveCar(true);
    setActiveCruise(false);
  };
  const onCruises = () => {
    setActiveFlight(false);
    setActiveHotel(false);
    setActiveCar(false);
    setActiveCruise(true);
  };
  const onRoundCityTab = () => {
    setRoundTripTab(true);
    setOneWayTab(false);
    setMultiCityTab(false);
  };
  const onOneWaytab = () => {
    setRoundTripTab(false);
    setOneWayTab(true);
    setMultiCityTab(false);
  };
  const onMultiCityTab = () => {
    setRoundTripTab(false);
    setOneWayTab(false);
    setMultiCityTab(true);
  };

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
              Let's Book your Flight!
            </Text>
            {/* <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginLeft: 30, marginVertical: 18 }}
            >
              <HorizontalBookingItem
                Icon={MaterialIcons}
                name={"flight"}
                title="Flights"
                onPress={onFlights}
                active={activeFlight}
              />
              <HorizontalBookingItem
                Icon={MaterialIcons}
                name={"local-hotel"}
                title="Hotels"
                onPress={onHotels}
                active={activeHotel}
              />
              <HorizontalBookingItem
                Icon={AntDesign}
                name={"car"}
                title="Cars"
                onPress={onCars}
                active={activeCar}
              />
              <HorizontalBookingItem
                Icon={Fontisto}
                name={"ship"}
                title="Cruises"
                onPress={onCruises}
                active={activeCruise}
              />
            </ScrollView> */}
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
                justifyContent: "space-between",
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
              <FlightSearchTabTiltle
                title="multiCityTab"
                active={multiCityTab}
                onPress={onMultiCityTab}
              />
            </View>
            {/* ROUND TRIP */}
            {roundTripTab && (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View style={{}}>
                  <FlightSearchInput
                    placeholder={"City or Airport"}
                    desc="To"
                  />
                  <FlightSearchInput
                    placeholder={"City or Airport"}
                    desc="Destinations"
                  />
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
                      width={"48%"}
                    />
                    <DateInput
                      dateInput={returnDate}
                      setDateInput={setReturnDate}
                      title={"Return Date"}
                      width={"48%"}
                    />
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
                    type={"number-pad"}
                    width={"32%"}
                  />
                  <FlightSearchInput
                    placeholder="0"
                    desc="Children"
                    type={"number-pad"}
                    width={"32%"}
                  />
                  <FlightSearchInput
                    placeholder="0"
                    desc="Infant"
                    type={"number-pad"}
                    width={"32%"}
                  />
                </View> */}
                  <FlightSearchInput
                    placeholder="passenger & Class"
                    desc="passenger & Class"
                  />
                  <FlightSearchInput placeholder="Economy" desc="Coach" />
                </View>
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <SecBtn
                    text={"Find Flight"}
                    onBtnPress={() => navigation.navigate("FlightSearchResult")}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={{ marginVertical: 20 }}>
            <SubHeader text={"Recent Searches"} color={colors.darkPrimary} />
            <RecentSearches />
          </View>
          <View style={{}}>
            <SubHeader
              text={"Travel More, Spend Less"}
              color={colors.darkPrimary}
            />
            <DiscountComponent />
          </View>
          <View>
            <SubHeader text={"Popular Hotels"} color={colors.darkPrimary} />
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
                hotels.map((item) => <ListItem key={item.id} data={item} />)}
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer active={"search"} />
    </View>
  );
};

export default SearchScreen;
