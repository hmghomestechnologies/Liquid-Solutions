import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  FormatedNumber,
  ImageCont,
  ImageSlider,
  LineDivider,
  MapMarker,
  SearchResultHeader,
  SubHeader,
  TransparentSpinner,
} from "../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import { CarMapContainer } from "../../components/car-components";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";

const CarInfoScreen = () => {
  const [carOwner, setCarOwner] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route?.params;
  const { authUser } = useAuthContext();

  const {
    _id,
    carName,
    carColor,
    carDesc,
    carDocuments,
    carImages,
    carModel,
    carSpecs,
    plateNumber,
    plateNumberImg,
    pricePerDay,
    rideCity,
    rideState,
    userId,
  } = data;
  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      };
      await axios
        .get(`${baseURL}/user/user/${userId}`, config)
        .then((res) => {
          setCarOwner(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return () => {
        setCarOwner({});
      };
    })();
  }, []);
  if (loading || !carOwner) return <TransparentSpinner />;
  return (
    <ScrollView style={{ marginTop: 20 }}>
      <View style={{ width: "100%" }}>
        <ImageSlider images={carImages} />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
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
            <Text style={{ color: "gray", fontSize: SIZES.small }}>
              or Similar Compact
            </Text>
          </View>
          {/* Pricing Tab */}
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <FormatedNumber
              value={pricePerDay}
              color={colors.darkPrimary}
              size={SIZES.large}
            />
            <Text style={{ color: "gray", fontSize: SIZES.small }}>
              Per day
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
        <View style={{ marginVertical: 15 }}>
          <SubHeader text={"Car Specs"} color={colors.primary} />
          <View style={{ marginTop: 5 }}>
            {carSpecs.map((e, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 3,
                }}
              >
                <AntDesign name="API" size={15} color={colors.secondary} />
                <Text style={{ marginLeft: 5, color: "gray" }}>{e}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Car Owner Info */}
        <View style={styles.miniCont}>
          <SubHeader text={"Car Owner Details"} />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              // alignItems: "center",
            }}
          >
            <View>
              <View style={{ marginVertical: 2 }}>
                <Text style={styles.textTitle}>Name:</Text>
                <Text style={styles.textSub}>{carOwner?.name}</Text>
              </View>
              <View style={{ marginVertical: 2 }}>
                <Text style={styles.textTitle}>Email:</Text>
                <Text style={styles.textSub}>{carOwner?.email}</Text>
              </View>
              <View style={{ marginVertical: 2 }}>
                <Text style={styles.textTitle}>Phone No:</Text>
                <Text style={styles.textSub}>{carOwner?.phoneNumber}</Text>
              </View>
            </View>
            <View style={{ height: 120, width: 120 }}>
              <ImageCont source={carOwner?.profileImg} radius={999} />
            </View>
          </View>
        </View>
        {/* map Section */}
        <View
          style={[
            styles.miniCont,
            { width: "100%", height: 200, marginVertical: 10 },
          ]}
        >
          <View style={{ marginVertical: 8 }}>
            <MapMarker location={`${rideCity}, ${rideState}`} />
          </View>
          <CarMapContainer />
        </View>
        {/* Plate Number Details */}
        <View>
          <Text
            style={{
              fontSize: SIZES.medium,
              color: colors.darkPrimary,
              marginVertical: 5,
            }}
          >
            Plate Number: {plateNumber}
          </Text>
          <Image
            source={{ uri: plateNumberImg }}
            style={{ height: 100, width: "100%", marginBottom: 50 }}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CarInfoScreen;

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
