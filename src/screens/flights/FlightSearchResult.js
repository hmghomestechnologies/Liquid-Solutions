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

const FlightSearchResult = () => {
  const [recommended, setRecommended] = useState(true);
  const [best, setBest] = useState(false);
  const [cheapest, setCheapest] = useState(false);
  const [airlines, setAirlines] = useState(false);

  const data = [
    {
      id: "hhdhhfhiudh",
      name: "Quatar Airways",
      img: "https://stockphoto.com/samples/OTg1NjY0NTMwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/red-bird-icon.jpg",
      category: "Best",
      amount: 200340,
      numbers: 3,
      isFavourite: true,
      depLocation: "ABV",
      depStartTime: "6:30am",
      depStopTime: "7:30am",
      depDuration: "1hr 15mins",
      depStops: 0,
      desLocation: "LOS",
      desStartTime: "8:0pm",
      desStopTime: "10:30pm",
      desDuration: "2hr 30mins",
      desStops: 0,
    },
    {
      id: "hhdhhfhiudhhdh832",
      name: "Quatar Airways",
      img: "https://stockphoto.com/samples/OTg1NjY0NTMwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/red-bird-icon.jpg",
      category: "Best",
      amount: 200340,
      numbers: 3,
      isFavourite: true,
      depLocation: "ABV",
      depStartTime: "6:30am",
      depStopTime: "7:30am",
      depDuration: "1hr 15mins",
      depStops: 0,
      desLocation: "LOS",
      desStartTime: "8:0pm",
      desStopTime: "10:30pm",
      desDuration: "2hr 30mins",
      desStops: 0,
    },
    {
      id: "hhdhhf76fhhiudh",
      name: "Quatar Airways",
      img: "https://stockphoto.com/samples/OTg1NjY0NTMwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/red-bird-icon.jpg",
      category: "Best",
      amount: 200340,
      numbers: 3,
      isFavourite: true,
      depLocation: "ABV",
      depStartTime: "6:30am",
      depStopTime: "7:30am",
      depDuration: "1hr 15mins",
      depStops: 0,
      desLocation: "LOS",
      desStartTime: "8:0pm",
      desStopTime: "10:30pm",
      desDuration: "2hr 30mins",
      desStops: 0,
    },
    {
      id: "hhdhhfh6345iudh",
      name: "Quatar Airways",
      img: "https://stockphoto.com/samples/OTg1NjY0NTMwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/red-bird-icon.jpg",
      category: "Best",
      amount: 200340,
      numbers: 3,
      isFavourite: true,
      depLocation: "ABV",
      depStartTime: "6:30am",
      depStopTime: "7:30am",
      depDuration: "1hr 15mins",
      depStops: 0,
      desLocation: "LOS",
      desStartTime: "8:0pm",
      desStopTime: "10:30pm",
      desDuration: "2hr 30mins",
      desStops: 0,
    },
  ];

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
    <View
    // style={{ marginBottom: 20 }}
    >
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
            location={"ABV-LOS"}
            dates="Jun 6-9"
            passenger="1"
          />
        </View>
        <View
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

          {/* <FilterTab
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
          /> */}
        </View>
      </View>
      <View style={{ backgroundColor: colors.bgGray }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          style={{
            marginTop: 140,
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
              24 Results(S)
            </Text>
          }
          renderItem={({ item }) => <FlightResultItem data={item} />}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 90, width: "100%" }} />}
        />
      </View>
      <Footer active={"search"} />
    </View>
  );
};

export default FlightSearchResult;
