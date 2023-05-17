import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import ImageCont from "../ImageCont";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { containerMedium } from "../../../constants/layouts";
import { useTaxiContext } from "../../../context/TaxiContext";
import TransparentSpinner from "../TransparentSpinner";
import MapMarker from "../MapMarker";

const TaxiDetailsContainer = () => {
  const [loading, setLoading] = useState(true);
  const { driver } = useTaxiContext();

  const {
    _id,
    carName,
    carColor,
    carDesc,
    carImage,
    carModel,
    plateNumber,
    plateNumberImg,
    rideCity,
    rideState,
    licenseNumber,
    licenseImg,
  } = driver;

  if (!driver) return <TransparentSpinner />;
  return (
    <ScrollView
      style={{ marginTop: 20, marginBottom: 20, paddingHorizontal: 20 }}
    >
      <View style={{ width: "100%", height: 200 }}>
        <ImageCont source={carImage} />
      </View>
      <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.large,
                color: colors.darkSecondary,
              }}
            >
              {carName}
            </Text>
          </View>
        </View>
        {/* Car Details */}
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 2,
            }}
          >
            <Text style={styles.textTitle}>Model:</Text>
            <Text style={styles.textSub}>{carModel}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 2,
            }}
          >
            <Text style={styles.textTitle}>Color:</Text>
            <Text style={styles.textSub}>{carColor}</Text>
          </View>
        </View>
        {/* Car Loacation */}
        <View style={[styles.miniCont]}>
          <View style={{ marginVertical: 8 }}>
            <MapMarker location={`${rideCity}, ${rideState}`} />
          </View>
        </View>
        {/* Plate Number Details */}
        <View
          style={[
            containerMedium,
            {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text
            style={{
              fontSize: SIZES.medium,
              color: colors.darkPrimary,
              marginVertical: 5,
            }}
          >
            Plate Number: {plateNumber}
          </Text>
          <View style={{ height: 100, width: 150 }}>
            <ImageCont source={plateNumberImg} />
          </View>
        </View>
        {/* License Number Details */}
        <View
          style={[
            containerMedium,
            {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text
            style={{
              fontSize: SIZES.medium,
              color: colors.darkPrimary,
              marginVertical: 5,
            }}
          >
            License Number: {licenseNumber.toUpperCase()}
            {console.log(driver)}
          </Text>
          <View style={{ height: 100, width: 150 }}>
            <ImageCont source={licenseImg} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TaxiDetailsContainer;

const styles = StyleSheet.create({
  miniCont: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    ...SHADOWS.medium,
  },
  textTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: colors.darkSecondary,
  },
  textSub: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.small,
    color: "gray",
  },
});
