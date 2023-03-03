import { View, Text, FlatList } from "react-native";
import React from "react";
import RestaurantBookingItem from "./RestaurantBookingItem";
import NoResult from "../NoResult";
import { colors, FONTS, SIZES } from "../../../constants/theme";

const RestaurantBookingContainer = ({ data, tab, isLoading, setIsLoading }) => {
  const bookings =
    tab === "new"
      ? data?.filter((item) => item.status !== "CHECKEDOUT")
      : data?.filter((item) => item.status === "CHECKEDOUT");
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RestaurantBookingItem
              data={item}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
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
              ? "You Have No New Reservation"
              : "You Have No Previous Reservations"
          }`}
        />
      )}
    </View>
  );
};

export default RestaurantBookingContainer;
