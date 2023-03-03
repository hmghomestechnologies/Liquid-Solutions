import { View, Text, FlatList } from "react-native";
import React from "react";
import NoResult from "../NoResult";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import CarItem from "./CarItem";

const CarBookingContainer = ({ data, tab }) => {
  const bookings =
    tab === "new"
      ? data?.filter((item) => item.status != "RETURNED")
      : data?.filter((item) => item.status === "RETURNED");
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CarItem data={item} />}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.large,
              }}
            >
              Car Rentals
            </Text>
          }
          style={{ marginHorizontal: 20, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 100, width: "100%" }} />}
        />
      ) : (
        <NoResult
          text={`${
            tab === "new"
              ? "You Have No New Car Rented"
              : "You Have No Previous Car Rented"
          }`}
        />
      )}
    </View>
  );
};

export default CarBookingContainer;
