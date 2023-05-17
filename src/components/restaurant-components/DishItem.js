import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { containerMedium } from "../../../constants/layouts";
import { useNavigation } from "@react-navigation/native";
import { useRestaurantContext } from "../../../context/RestaurantContext";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { FONTS, SHADOWS, SIZES, colors } from "../../../constants/theme";
import FormatedNumber from "../FormatedNumber";

const DishItem = ({ data }) => {
  const [qty, setQty] = useState(1);
  const [restaurant, setRestaurant] = useState({});

  const { fetchAllBaskets, restaurants, addToBasket } = useRestaurantContext();
  const navigation = useNavigation();
  const {
    menuName,
    menuType,
    location,
    discountedPrice,
    price,
    description,
    menuImg,
    restaurantId,
  } = data;
  useEffect(() => {
    const foundItem = restaurants.find(
      (element) => element._id === restaurantId
    );
    if (foundItem) setRestaurant(foundItem);
  }, []);

  const handleAddToBasket = async () => {
    let basketItem = {
      menuId: data._id,
      menuName: data.menuName,
      price: discountedPrice ? discountedPrice : price,
      menuImg: data.menuImg,
      qty: qty,
      restaurantId: data.restaurantId,
    };
    await addToBasket(restaurantId, basketItem);
    await fetchAllBaskets();
    // setBasket((prev) => [...prev, basketItem]);
    // console.log(basket);
    // setBasket([]);
    setQty(1);
  };
  return (
    <View style={[containerMedium, {}]}>
      <Image
        source={{ uri: menuImg }}
        style={{
          height: 220,
          width: "100%",
          borderRadius: 10,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
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
              fontFamily: FONTS.bold,
              fontSize: SIZES.large,
              color: colors.darkPrimary,
              paddingVertical: 5,
            }}
          >
            {menuName}
          </Text>
          {discountedPrice ? (
            <View>
              <FormatedNumber
                value={price}
                isStrike
                size={15}
                color={colors.primary}
              />
              <FormatedNumber
                value={discountedPrice}
                size={20}
                color={colors.primary}
              />
            </View>
          ) : (
            <FormatedNumber value={price} size={20} color={colors.primary} />
          )}
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 8,
          }}
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
            onPress={handleAddToBasket}
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons name="kitchen" size={18} color={colors.darkGray} />
        <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: SIZES.small,
            color: colors.gray,
          }}
        >
          {restaurant?.restaurantName}
        </Text>
      </View>
    </View>
  );
};

export default DishItem;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.bgGray,
    borderRadius: 5,
    padding: 2,
    ...SHADOWS.light,
  },
});
