import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { FlightDetailsHeader } from "../../components/flight-components";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { containerDark } from "../../../constants/layouts";
import { FormatedNumber, SubHeader } from "../../components";
import {
  getAirportWithCode,
  getCityWithCode,
  getCountryWithCode,
  getHoursWithMinutes,
  getWordDate,
} from "../../../constants/functions";
import { Image } from "react-native";
import { SecBtn } from "../../components/Forms";

const FlightDetailsScreen = ({ navigation }) => {
  const route = useRoute();
  const { data, searchedData } = route?.params;

  const { outbound, inbound, amount } = data;
  const { departureAirport, destinationAirport } = searchedData;

  function getDate(timeStamp) {
    const tempDate = timeStamp.split("T");
    return tempDate[0];
  }
  function getTime(timeStamp) {
    const tempTime = timeStamp.split("T");
    return tempTime[1].substring(0, 5);
  }
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <ScrollView
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 25,
          // width: "100%",
        }}
      >
        {/* OutBound Section */}
        <View style={{ width: "100%" }}>
          <SubHeader text={"Departure Details"} />
          {/* FromTo */}
          <View style={styles.fromToContainer}>
            <Text style={styles.fromToText}>{departureAirport?.city}</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={30}
              color="orange"
              style={{ marginHorizontal: 5 }}
            />
            <Text style={styles.fromToText}>{destinationAirport?.city}</Text>
          </View>
          {/* OutBound Details Container */}
          {outbound?.map((item, index) => (
            <View
              style={[
                containerDark,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                },
              ]}
              key={index}
            >
              {/* First Cloumn */}
              <View style={[styles.columnWrapper, { width: "30%" }]}>
                {/* Depature Time */}
                <View>
                  <Text style={styles.title}>
                    {getTime(item?.departure_time)}
                  </Text>
                  <Text style={styles.desc}>
                    {getWordDate(getDate(item?.departure_time))}
                  </Text>
                </View>
                {/* Duration */}
                <View>
                  <Text style={styles.desc}>
                    {getHoursWithMinutes(item?.duration)}
                  </Text>
                  {/* <Text style={styles.desc}>{outbound_stops} Stops</Text> */}
                </View>
                {/* Arrival Time */}
                <View>
                  <Text style={styles.title}>
                    {getTime(item?.arrival_time)}
                  </Text>
                  <Text style={styles.desc}>
                    {getWordDate(getDate(item?.arrival_time))}
                  </Text>
                </View>
              </View>
              {/* Second COLUM */}
              <View style={[styles.columnWrapper, { width: "10%" }]}>
                {/* One */}
                <View style={styles.dotLineContainer}>
                  <View style={styles.dot} />
                  <View style={styles.line} />
                </View>
                <View>
                  <MaterialIcons
                    name="flight"
                    size={30}
                    color={colors.secondary}
                    style={{
                      transform: [{ rotateX: "180deg" }],
                      marginVertical: 30,
                    }}
                  />
                </View>
                <View style={styles.dotLineContainer}>
                  <View style={styles.line} />
                  <View style={styles.dot} />
                </View>
              </View>

              {/* Third Column */}
              <View style={[styles.columnWrapper, { width: "60%" }]}>
                {/* First Row */}
                <View>
                  <View style={styles.cityTitleWrapper}>
                    <Text style={styles.title}>
                      {getCityWithCode(item?.airport_from)}
                    </Text>
                    <Entypo
                      name="dot-single"
                      size={24}
                      color={colors.primary}
                    />
                    <Text style={styles.title}>{item?.airport_from}</Text>
                  </View>
                  <Text style={styles.desc}>
                    {getAirportWithCode(item?.airport_from)} Airport,{" "}
                    {getCountryWithCode(item?.airport_from)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "space-between",
                  }}
                >
                  <Image
                    source={{ uri: item?.airline_details?.logo }}
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      marginHorizontal: 5,
                    }}
                  />
                  <Text
                    style={{
                      color: colors.secondary,
                      fontSize: SIZES.medium,
                      fontWeight: "600",
                      flex: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {item?.airline_details?.name}
                  </Text>
                </View>
                <View>
                  <View style={styles.cityTitleWrapper}>
                    <Text style={styles.title}>
                      {getCityWithCode(item?.airport_to)}
                    </Text>
                    <Entypo
                      name="dot-single"
                      size={24}
                      color={colors.primary}
                    />
                    <Text style={styles.title}>{item?.airport_to}</Text>
                  </View>
                  <Text style={styles.desc}>
                    {getAirportWithCode(item?.airport_to)} Airport,{" "}
                    {getCountryWithCode(item?.airport_to)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 25 }} />
        {inbound?.length !== 0 && (
          <View style={{ width: "100%" }}>
            <SubHeader text={"Return Trip Details"} />
            {/* FromTo */}
            <View style={styles.fromToContainer}>
              <Text style={styles.fromToText}>{destinationAirport?.city}</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={30}
                color="orange"
                style={{ marginHorizontal: 5 }}
              />
              <Text style={styles.fromToText}>{departureAirport?.city}</Text>
            </View>
            {/* OutBound Details Container */}
            {inbound?.map((item, index) => (
              <View
                style={[
                  containerDark,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                  },
                ]}
                key={index}
              >
                {/* First Cloumn */}
                <View style={[styles.columnWrapper, { width: "30%" }]}>
                  {/* Depature Time */}
                  <View>
                    <Text style={styles.title}>
                      {getTime(item?.departure_time)}
                    </Text>
                    <Text style={styles.desc}>
                      {getWordDate(getDate(item?.departure_time))}
                    </Text>
                  </View>
                  {/* Duration */}
                  <View>
                    <Text style={styles.desc}>
                      {getHoursWithMinutes(item?.duration)}
                    </Text>
                    {/* <Text style={styles.desc}>{outbound_stops} Stops</Text> */}
                  </View>
                  {/* Arrival Time */}
                  <View>
                    <Text style={styles.title}>
                      {getTime(item?.arrival_time)}
                    </Text>
                    <Text style={styles.desc}>
                      {getWordDate(getDate(item?.arrival_time))}
                    </Text>
                  </View>
                </View>
                {/* Second COLUM */}
                <View style={[styles.columnWrapper, { width: "10%" }]}>
                  {/* One */}
                  <View style={styles.dotLineContainer}>
                    <View style={styles.dot} />
                    <View style={styles.line} />
                  </View>
                  <View>
                    <MaterialIcons
                      name="flight"
                      size={30}
                      color={colors.secondary}
                      style={{
                        transform: [{ rotateX: "180deg" }],
                        marginVertical: 30,
                      }}
                    />
                  </View>
                  <View style={styles.dotLineContainer}>
                    <View style={styles.line} />
                    <View style={styles.dot} />
                  </View>
                </View>

                {/* Third Column */}
                <View style={[styles.columnWrapper, { width: "60%" }]}>
                  {/* First Row */}
                  <View>
                    <View style={styles.cityTitleWrapper}>
                      <Text style={styles.title}>
                        {getCityWithCode(item?.airport_from)}
                      </Text>
                      <Entypo
                        name="dot-single"
                        size={24}
                        color={colors.primary}
                      />
                      <Text style={styles.title}>{item?.airport_from}</Text>
                    </View>
                    <Text style={styles.desc}>
                      {getAirportWithCode(item?.airport_from)} Airport,{" "}
                      {getCountryWithCode(item?.airport_from)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      // justifyContent: "space-between",
                    }}
                  >
                    <Image
                      source={{ uri: item?.airline_details?.logo }}
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        marginHorizontal: 5,
                      }}
                    />
                    <Text
                      style={{
                        color: colors.secondary,
                        fontSize: SIZES.medium,
                        fontWeight: "600",
                        flex: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {item?.airline_details?.name}
                    </Text>
                  </View>
                  <View>
                    <View style={styles.cityTitleWrapper}>
                      <Text style={styles.title}>
                        {getCityWithCode(item?.airport_to)}
                      </Text>
                      <Entypo
                        name="dot-single"
                        size={24}
                        color={colors.primary}
                      />
                      <Text style={styles.title}>{item?.airport_to}</Text>
                    </View>
                    <Text style={styles.desc}>
                      {getAirportWithCode(item?.airport_to)} Airport,{" "}
                      {getCountryWithCode(item?.airport_to)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
        <View style={{ height: 130 }} />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        {/* <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormatedNumber value={amount} size={30} color={colors.secondary} />
        </View> */}
        <SecBtn
          text={`Continue `}
          onBtnPress={() =>
            navigation.navigate("FlightBookingScreen", { flight_id: data?.id })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    // height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  fromToContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fromToText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: colors.primary,
  },
  dotLineContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: "orange",
  },
  line: {
    height: 50,
    width: 3,
    backgroundColor: "#FFD580",
  },
  cityTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
  },
  desc: {
    color: colors.gray,
    fontSize: SIZES.medium,
    flex: 1,
    flexWrap: "wrap",
  },
});
export default FlightDetailsScreen;
