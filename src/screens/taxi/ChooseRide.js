import { View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MapContainer from "../../components/Layouts/MapContainer";
import { RideOptionsCard } from "../../components/taxi-component";

const ChooseRide = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      // showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "white", width: "100%", height: "100%" }}
    >
      <View style={{}}>
        {/* map Tab */}
        <View style={{ width: "100%", height: "50%" }}>
          <MapContainer />
        </View>
        <View style={{ width: "100%", height: "50%" }}>
          <RideOptionsCard />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseRide;
