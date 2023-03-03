import { View, Text, FlatList } from "react-native";
import React from "react";
import NoResult from "../../NoResult";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import RiderUserItem from "./RiderUserItem";

const RiderUserContainer = ({ data, tab, rider }) => {
  const bookings =
    tab === "new"
      ? data?.filter(
          (item) =>
            item.deliveryAddress.deliveryCity === rider.rideCity &&
            item.status === "READY_FOR_PICKUP"
        )
      : data?.filter(
          (item) =>
            item.deliveryAddress.deliveryCity === rider.rideCity &&
            item.status === "COMPLETED"
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
              {`${tab === "new" ? "New Request" : "Completed Rides"}`}{" "}
            </Text>
          }
          style={{ marginHorizontal: 20, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 100, width: "100%" }} />}
        />
      ) : (
        <NoResult
          text={`${
            tab === "new"
              ? "You Have No New Ride Request"
              : "You Have No Previous Taxi Rides"
          }`}
        />
      )}
    </View>
  );
};

export default RiderUserContainer;
