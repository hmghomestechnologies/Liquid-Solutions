import { View, Text, FlatList } from "react-native";
import React from "react";
import { NoResult } from "../../../components";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useTaxiContext } from "../../../../context/TaxiContext";
import { UserItem } from "../../../components/booking-components/taxi-driver";

const FilterTaxiBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { driverBookings } = useTaxiContext();
  const route = useRoute();
  const { status } = route?.params;
  const bookings = driverBookings?.filter((item) => item.status === status);
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <UserItem
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
              Bookings
            </Text>
          }
          style={{ marginHorizontal: 10, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 100, width: "100%" }} />}
        />
      ) : (
        <NoResult
          text={`You Have No ${
            status === "BOOKED"
              ? "New"
              : status === "CONFIRMED"
              ? "Accepted"
              : status === "PICKEDUP"
              ? "Current"
              : status === "REJECTED"
              ? "Rejected"
              : "Successful"
          } Request`}
        />
      )}
    </View>
  );
};

export default FilterTaxiBooking;
