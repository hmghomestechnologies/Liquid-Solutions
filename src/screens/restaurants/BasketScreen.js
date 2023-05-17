import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRestaurantContext } from "../../../context/RestaurantContext";
import { SecBtn } from "../../components/Forms";
import { SIZES, colors } from "../../../constants/theme";
import {
  BasketContainer,
  BasketItem,
} from "../../components/restaurant-components";
import { Entypo } from "@expo/vector-icons";

const BasketScreen = ({ navigation }) => {
  const { getAllBaskets, baskets, setBaskets } = useRestaurantContext();
  const fetchAllBaskets = async () => {
    const allBaskets = await getAllBaskets();
    setBaskets(allBaskets);
  };
  useEffect(() => {
    fetchAllBaskets();
  }, []);
  console.log(baskets);
  return (
    <View>
      {baskets.length > 0 ? (
        <View>
          <FlatList
            data={baskets}
            keyExtractor={(item, index) => index}
            style={{
              marginHorizontal: 20,
              paddingTop: 20,
            }}
            ListHeaderComponent={
              <Text
                style={{
                  fontSize: 20,
                  color: colors.darkPrimary,
                  fontWeight: "700",
                  marginBottom: 20,
                }}
              >
                Baskets({baskets.length})
              </Text>
            }
            renderItem={({ item }) => <BasketContainer data={item} />}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View style={{ height: 100, width: "100%" }} />
            }
          />
        </View>
      ) : (
        <View
          style={{
            height: "100%",
            marginHorizontal: 40,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="emoji-sad" size={40} color="red" />
          <Text
            style={{
              marginVertical: 20,
              color: colors.darkPrimary,
              fontSize: SIZES.medium,
              textAlign: "center",
            }}
          >
            You Don't have any Dish in you Basket
          </Text>
          <View style={{ width: "100%" }}>
            <SecBtn onBtnPress={() => navigation.goBack()} text={"Go Back"} />
          </View>
        </View>
      )}
    </View>
  );
};

export default BasketScreen;
