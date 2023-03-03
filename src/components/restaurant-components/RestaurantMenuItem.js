import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import FormatedNumber from "../FormatedNumber";
import { SecBtn } from "../Forms";
import { useRestaurantContext } from "../../../context/RestaurantContext";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import ImageCont from "../ImageCont";

const RestaurantMenuItem = ({ data }) => {
  const [qty, setQty] = useState(1);

  const { basket, setBasket } = useRestaurantContext();
  const navigation = useNavigation();
  const addToBasket = () => {
    let basketItem = {
      menuId: data._id,
      menuName: data.menuName,
      price: data.price,
      menuImg: data.menuImg,
      qty: qty,
      restaurantId: data.restaurantId,
    };
    setBasket((prev) => [...prev, basketItem]);
    console.log(basket);
    // setBasket([]);
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: "Item Added to Basket",
      text2: "You can check your Basket to confirm",
    });
    setQty(1);
  };
  return (
    <View
      style={{
        paddingVertical: 15,
        borderRadius: 10,
        width: "100%",
        flexDirection: "row",
      }}
    >
      <View style={{ height: 70, width: 70 }}>
        <ImageCont source={data?.menuImg} />
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "75%",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingVertical: 6,
            width: "70%",
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.medium,
              color: colors.darkPrimary,
            }}
          >
            {data?.menuName}
          </Text>
          <FormatedNumber value={data?.price} color={colors.primary} />
        </View>
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}
              style={styles.btn}
            >
              <AntDesign name="minus" size={20} color={colors.primary} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 20,
                color: colors.darkPrimary,
                paddingHorizontal: 10,
              }}
            >
              {qty}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setQty(qty + 1);
              }}
              style={styles.btn}
            >
              <AntDesign name="plus" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 5,
              paddingHorizontal: 5,
              backgroundColor: colors.secondary,
              borderRadius: 5,
            }}
            onPress={addToBasket}
          >
            <Text
              style={{
                color: "white",
                fontSize: SIZES.small,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Add to Basket
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RestaurantMenuItem;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.bgGray,
    borderRadius: 5,
    padding: 2,
    ...SHADOWS.light,
  },
});
