import { View, FlatList } from "react-native";
import React from "react";
import RestaurantMenuItem from "./RestaurantMenuItem";

const FoodContainer = ({ data }) => {
  const foods = data.filter((i) => i.menuType === "FOOD");
  return (
    <View>
      <FlatList
        data={foods}
        keyExtractor={(item) => item._id}
        style={{}}
        renderItem={({ item }) => <RestaurantMenuItem data={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 150, width: "100%" }} />}
      />
    </View>
  );
};

export default FoodContainer;
