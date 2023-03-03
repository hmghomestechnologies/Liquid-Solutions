import { View, FlatList } from "react-native";
import React from "react";
import RestaurantMenuItem from "./RestaurantMenuItem";

const DrinkContainer = ({ data }) => {
  const drinks = data.filter((i) => i.menuType === "DRINK");
  return (
    <View>
      <FlatList
        data={drinks}
        keyExtractor={(item) => item._id}
        style={{}}
        renderItem={({ item }) => <RestaurantMenuItem data={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 150, width: "100%" }} />}
      />
    </View>
  );
};

export default DrinkContainer;
