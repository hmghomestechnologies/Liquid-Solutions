import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import { DoubleSubheader, Header, ListItem, SubHeader } from "../../components";
import { colors } from "../../../constants/theme";
import Footer from "../../components/Layouts/Footer";
import { recentcars } from "../../../constants/dummy";
import { RecentComponent } from "../../components/car-components";
import { GOOGLE_MAPS_APIKEY } from "../../../constants/ApiKeys";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState } from "react";
import { SecBtn } from "../../components/Forms";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useTaxiContext } from "../../../context/TaxiContext";

const TaxiHome = () => {
  const navigation = useNavigation();
  const { origin, setOrigin } = useTaxiContext();
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Header
        placeholder={"Find Taxi For you Trip"}
        active={"taxi"}
        searchPath={"TaxiHome"}
      />
      <View
        style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 20 }}
      >
        {/* <DoubleSubheader text={"Recent Searches"} />
        <FlatList
          data={recentcars}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RecentComponent car={item} index={index} />
          )}
          showsVerticalScrollIndicator={false}
        /> */}
      </View>
      <Footer active={"search"} searchPath={"TaxiSearchScreen"} />
    </View>
  );
};

export default TaxiHome;
