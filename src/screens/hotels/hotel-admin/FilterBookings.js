import { View, Text, FlatList } from "react-native";
import React from "react";
import { NoResult } from "../../../components";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { BookingItem } from "../../../components/hotel-components";
import { useHotelContext } from "../../../../context/HotelContext";

const FilterBookings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { hotelReservations } = useHotelContext();
  const route = useRoute();
  const { status } = route?.params;
  const bookings =
    status === "ALL"
      ? hotelReservations
      : hotelReservations?.filter((item) => item.status === status);
  console.log(hotelReservations);
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <BookingItem
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
              : status === "CHECKEDIN"
              ? "Currently Checked In"
              : status === "CANCEL"
              ? "Rejected"
              : "Completed"
          } Bookings`}
        />
      )}
    </View>
  );
};

export default FilterBookings;
