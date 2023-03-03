import { View, Text, FlatList } from "react-native";
import React from "react";
import NoResult from "../../NoResult";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { RestaurantBookingItem } from "../../booking-components";
import UserReservationItem from "./UserReservationItem";

const UserReservationsContainer = ({ data, isLoading, setIsLoading }) => {
  const bookings = data?.filter((item) => item.status === "BOOKED");
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <UserReservationItem
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
        <NoResult text="You Have No New Reservation" />
      )}
    </View>
  );
};

export default UserReservationsContainer;
