import { View, Text } from "react-native";
import React from "react";
import { useTaxiContext } from "../../../../context/TaxiContext";
import {
  AddTaxiContainer,
  TaxiDetailsContainer,
} from "../../../components/taxi-component";

const TaxiManageCar = () => {
  const { driver } = useTaxiContext();
  return (
    <View>{driver ? <TaxiDetailsContainer /> : <AddTaxiContainer />}</View>
  );
};

export default TaxiManageCar;
