import { View, Text, FlatList } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useRiderContext } from "../../../context/RiderContext";
import { RiderUserItem } from "../../components/booking-components/rider-components";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { NoResult } from "../../components";

const FilterTDeliveries = () => {
  const { riderBookings, rider } = useRiderContext();
  const route = useRoute();
  const { status } = route?.params;
  const bookings = riderBookings?.filter(
    (item) => item.status === status && item.assignedRiderId === rider?._id
  );
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <RiderUserItem data={item} rider={rider} />}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.large,
              }}
            >
              Deliveries
            </Text>
          }
          style={{ marginHorizontal: 10, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 100, width: "100%" }} />}
        />
      ) : (
        <NoResult
          text={`You Have No ${
            status === "DELIVERY_ACCEPTED"
              ? "You Have no Acepted Requests"
              : status === "PICKED_UP"
              ? "On Going Deliveries"
              : "Completed "
          } Deliveries`}
        />
      )}
    </View>
  );
};

export default FilterTDeliveries;
