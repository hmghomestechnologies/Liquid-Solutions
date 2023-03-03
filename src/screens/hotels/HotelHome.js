import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Header,
  ListItem,
  SubHeader,
  TransparentSpinner,
} from "../../components";
import { colors } from "../../../constants/theme";
import { CountryItem } from "../../components/flight-components";
import Footer from "../../components/Layouts/Footer";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const HotelHome = () => {
  const [isLoading] = useState(false);
  // useEffect(() => {
  //   if (authUser?.userRole === "resAdmin") {
  //     setIsLoading(true);
  //     navigation.navigate("Home");
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);
  if (isLoading) return <TransparentSpinner />;
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Header
        placeholder={"Search For Some where to stay"}
        active={"hotel"}
        searchPath={"HotelSearchScreen"}
      />

      <Footer active={"search"} searchPath={"HotelHome"} />
    </View>
  );
};

export default HotelHome;
