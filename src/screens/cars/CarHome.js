import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import { DoubleSubheader, Header, ListItem, SubHeader } from "../../components";
import { colors } from "../../../constants/theme";
import Footer from "../../components/Layouts/Footer";
import { recentcars } from "../../../constants/dummy";
import { RecentComponent } from "../../components/car-components";

const CarHome = () => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Header
        placeholder={"Make Most of your trap"}
        active={"car"}
        searchPath={"CarSearchScreen"}
      />
      <View
        style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 20 }}
      >
        <DoubleSubheader text={"Recent Searches"} />
        <FlatList
          data={recentcars}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RecentComponent car={item} index={index} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Footer active={"search"} searchPath={"CarHome"} />
    </View>
  );
};

export default CarHome;
