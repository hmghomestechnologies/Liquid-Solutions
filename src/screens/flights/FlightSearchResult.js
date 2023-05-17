import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  FlightDetailsHeader,
  FlightResultItem,
} from "../../components/flight-components";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, FONTS, SHADOWS } from "../../../constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import Footer from "../../components/Layouts/Footer";
import { useRoute } from "@react-navigation/native";

const FlightSearchResult = () => {
  const [recommended, setRecommended] = useState(true);
  const [best, setBest] = useState(false);
  const [cheapest, setCheapest] = useState(false);
  const [airlines, setAirlines] = useState(false);
  const route = useRoute();
  const { searchedData, flightDetails } = route?.params;
  const onRecommended = () => {
    setRecommended(true);
    setBest(false);
    setCheapest(false);
    setAirlines(false);
  };
  const onBest = () => {
    setRecommended(false);
    setBest(true);
    setCheapest(false);
    setAirlines(false);
  };
  const onCheapest = () => {
    setRecommended(false);
    setBest(false);
    setCheapest(true);
    setAirlines(false);
  };
  const onAirlines = () => {
    setRecommended(false);
    setBest(false);
    setCheapest(false);
    setAirlines(true);
  };

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          position: "absolute",
          top: 17,
          width: "100%",
          backgroundColor: "white",
          paddingTop: 15,
          // paddingHorizontal: 20,
          zIndex: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <FlightDetailsHeader
            location={`Flight details from ${searchedData?.departureAirport?.city} to ${searchedData?.destinationAirport?.city}`}
            dates={`${searchedData?.departureDate} ${
              searchedData?.returnDate !== null
                ? " -- " + searchedData?.returnDate
                : ""
            }`}
          />
        </View>
        {/* <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 8,
            justifyContent: "space-between",
            ...SHADOWS.dark,
          }}
        >
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons name="sort" size={24} color="black" />
              <Text style={{ fontFamily: FONTS.semiBold, marginLeft: 5 }}>
                Sort By
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              placeholder="By Min Price"
              style={{
                borderWidth: 1,
                borderColor: colors.gray,
                width: 170,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              borderWidth: 1,
              borderColor: colors.darkPrimary,
              height: 40,
              width: 40,
            }}
          >
            <FontAwesome name="dollar" size={15} color="black" />
            <Text style={{ fontFamily: FONTS.semiBold }}>NGN</Text>
          </View>

          <FilterTab
            name={"Recommend"}
            activeTab={recommended}
            onPress={onRecommended}
          />
          <FilterTab name={"Best"} activeTab={best} onPress={onBest} />
          <FilterTab
            name={"Cheapest"}
            activeTab={cheapest}
            onPress={onCheapest}
          />
          <FilterTab
            name={"airlines"}
            activeTab={airlines}
            onPress={onAirlines}
          />
        </View> */}
      </View>
      <View style={{ backgroundColor: colors.bgGray, height: "100%" }}>
        <FlatList
          data={flightDetails}
          keyExtractor={(item) => item.id}
          style={{
            marginTop: 80,
            marginHorizontal: 20,
            paddingTop: 20,
          }}
          ListHeaderComponent={
            <Text
              style={{
                fontSize: 20,
                color: colors.darkPrimary,
                fontWeight: "700",
              }}
            >
              {flightDetails?.length} Results(s)
            </Text>
          }
          renderItem={({ item }) => (
            <FlightResultItem
              data={item}
              returnDate={searchedData?.returnDate}
              searchedData={searchedData}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 90, width: "100%" }} />}
        />
      </View>
      <Footer active={"search"} />
    </View>
  );
};

export default FlightSearchResult;
