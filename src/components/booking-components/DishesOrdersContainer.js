import { View, Text, FlatList } from "react-native";
import React from "react";
import RestaurantBookingItem from "./RestaurantBookingItem";
import NoResult from "../NoResult";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import DishesItem from "./DishesItem";

const DishesOrdersContainer = ({ data, tab }) => {
  const orders =
    tab === "new"
      ? data?.filter((item) => item.status != "COMPLETED")
      : data?.filter((item) => item.status === "COMPLETED");
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {orders?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <DishesItem data={item} />}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.large,
              }}
            >
              Orders
            </Text>
          }
          style={{ marginHorizontal: 20, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 100, width: "100%" }} />}
        />
      ) : (
        <NoResult
          text={`${
            tab === "new"
              ? "You Have No New Dishes Ordered"
              : "You Have No Previous Orders"
          }`}
        />
      )}
    </View>
  );
};

export default DishesOrdersContainer;
