import { View, Text, FlatList } from "react-native";
import React from "react";
import NoResult from "../../NoResult";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import UserItem from "./UserItem";

const UserContainer = ({ data, tab, driver }) => {
  const bookings =
    tab === "new"
      ? data?.filter((item) => item.status === "BOOKED")
      : data?.filter((item) => item.status === "CHECKEDOUT");
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <UserItem data={item} driver={driver} />}
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
              : "You Have No Previous Taxi Bookings"
          }`}
        />
      )}
    </View>
  );
};

export default UserContainer;
