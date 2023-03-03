import { View, Text, FlatList } from "react-native";
import React from "react";
import { UserBookingItem } from "./";
import NoResult from "../../NoResult";
import { colors, FONTS, SIZES } from "../../../../constants/theme";

const UserBookingContainer = ({ data, tab, isLoading, setIsLoading }) => {
  const bookings =
    tab === "new"
      ? data?.filter((item) => item.status !== "CHECKEDOUT")
      : data?.filter((item) => item.status === "CHECKEDOUT");
  console.log(bookings);
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {data?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <UserBookingItem
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

export default UserBookingContainer;
