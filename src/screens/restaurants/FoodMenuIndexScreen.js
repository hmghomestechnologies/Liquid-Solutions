import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { SearchResultHeader, TransparentSpinner } from "../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  colors,
  FONTS,
  SHADOWS,
  SIZES,
  spaces,
  width,
} from "../../../constants/theme";
import { SecBtn } from "../../components/Forms";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import Toast from "react-native-toast-message";
import {
  DrinkContainer,
  FoodContainer,
} from "../../components/restaurant-components";
import { useRestaurantContext } from "../../../context/RestaurantContext";

const FoodMenuIndexScreen = ({}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [activeFoods, setActiveFoods] = useState(true);
  const [activeDrinks, setActiveDrinks] = useState(false);
  const [currentBasket, setCurrentBasket] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { id, restaurantName } = route?.params;
  const { authUser } = useAuthContext();
  const { basket } = useRestaurantContext();
  useEffect(() => {
    (async () => {
      if (authUser) {
        const config = {
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        };
        await axios
          .get(`${baseURL}/restaurant/menu-items/${id}`, config)
          .then((res) => {
            setMenuItems(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })();
  }, [authUser]);
  useEffect(() => {
    const tempBasket = basket.filter((item) => item.restaurantId === id);
    setCurrentBasket(tempBasket);
    console.log(currentBasket);
  }, [basket]);
  console.log(menuItems);
  if (btnLoading || !menuItems) return <TransparentSpinner />;
  return (
    <View
      style={{
        paddingTop: 10,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <SearchResultHeader head={restaurantName} body={restaurantName} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          style={[
            styles.btnCont,
            {
              backgroundColor: activeFoods ? colors.secondary : "white",
            },
          ]}
          onPress={() => {
            setActiveFoods(true);
            setActiveDrinks(false);
          }}
        >
          <Text
            style={[
              styles.btnText,
              { color: activeFoods ? "white" : colors.secondary },
            ]}
          >
            FOODS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnCont,
            {
              backgroundColor: activeDrinks ? colors.secondary : "white",
            },
          ]}
          onPress={() => {
            setActiveFoods(false);
            setActiveDrinks(true);
          }}
        >
          <Text
            style={[
              styles.btnText,
              { color: activeDrinks ? "white" : colors.secondary },
            ]}
          >
            DRINKS
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {activeFoods && <FoodContainer data={menuItems} />}
        {activeDrinks && <DrinkContainer data={menuItems} />}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 5,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <SecBtn
          text={`My Basket ${
            currentBasket?.length > 0
              ? "-- ( " + currentBasket?.length + " )"
              : ""
          }`}
          onBtnPress={() =>
            navigation.navigate("BasketScreen", {
              restaurantId: id,
              userId: authUser?._id,
              restaurantName,
            })
          }
        />
      </View>
    </View>
  );
};

export default FoodMenuIndexScreen;
const styles = StyleSheet.create({
  miniCont: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    ...SHADOWS.light,
  },
  contDesc: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    color: colors.primary,
    textAlign: "center",
  },
  btnCont: {
    width: "50%",
    paddingVertical: 12,
  },
  btnText: {
    textAlign: "center",
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
  },
});
