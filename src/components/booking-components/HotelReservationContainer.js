import { View, Text, FlatList } from "react-native";
import React from "react";
import NoResult from "../NoResult";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import HotelReservationItem from "./HotelReservationItem";

const HotelReservationContainer = ({ data, tab }) => {
  const reservations =
    tab === "new"
      ? data?.filter((item) => item.status != "CHECKEDOUT")
      : data?.filter((item) => item.status === "CHECKEDOUT");
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {reservations?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={reservations}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <HotelReservationItem data={item} />}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.large,
              }}
            >
              Reservations
            </Text>
          }
          style={{ marginHorizontal: 20, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 100, width: "100%" }} />}
        />
      ) : (
        <NoResult
          text={`${
            tab === "new"
              ? "You Have No Recent Reservations"
              : "You Have No Previous Reservations"
          }`}
        />
      )}
    </View>
  );
};

export default HotelReservationContainer;
