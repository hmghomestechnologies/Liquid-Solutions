import { View, Text, FlatList } from "react-native";
import React from "react";
import NoResult from "../NoResult";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import TaxiBookingItem from "./TaxiBookingItem";

const TaxiBookingContainer = ({ data, tab }) => {
  const bookings =
    tab === "new"
      ? data?.filter((item) => item.status != "CHECKEDOUT")
      : data?.filter((item) => item.status === "CHECKEDOUT");
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TaxiBookingItem data={item} />}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.large,
              }}
            >
              Bookings
            </Text>
          }
          style={{ marginHorizontal: 20, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 100, width: "100%" }} />}
        />
      ) : (
        <NoResult
          text={`${
            tab === "new"
              ? "You Have No Taxi Bookings"
              : "You Have No Previous Taxi Bookings"
          }`}
        />
      )}
    </View>
  );
};

export default TaxiBookingContainer;
