import { View, Text, Image } from "react-native";
import React from "react";
import FormatedNumber from "../FormatedNumber";
import { colors } from "../../../constants/theme";
import ImageCont from "../ImageCont";

const BasketItem = ({ data, width }) => {
  const { menuId, menuName, menuImg, price, qty, restaurantId } = data;
  // console.log(data);
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
        borderColor: colors.bgGray,
        borderBottomWidth: 1,
      }}
    >
      <Text>{qty}</Text>
      <View style={{ height: 30, width: 30 }}>
        <ImageCont source={menuImg} />
      </View>
      <Text style={{ width: width ? width : "30%" }}>{menuName}</Text>
      <FormatedNumber value={price} size={12} />
      <View style={{ width: "16%" }}>
        <FormatedNumber size={14} value={price * qty} />
      </View>
    </View>
  );
};

export default BasketItem;
