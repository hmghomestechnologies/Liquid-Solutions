import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuthContext } from "../../../context/AuthContext";
import { SecBtn } from "../../components/Forms";
import { SIZES, colors } from "../../../constants/theme";
import { Ionicons, Foundation, Entypo, FontAwesome } from "@expo/vector-icons";
import { DishItem, DishListItem } from "../../components/restaurant-components";
import { TransparentSpinner } from "../../components";
import { useRestaurantContext } from "../../../context/RestaurantContext";

const DishesSearchResult = () => {
  const [dishes, setDishes] = useState([]);
  const [onBlock, setOnBlock] = useState(true);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { config } = useAuthContext();
  const { city } = route.params;
  const navigate = useNavigation();
  const { baskets } = useRestaurantContext();

  const getDishes = async () => {
    setLoading(true);
    await axios
      .get(`${baseURL}/restaurant/dishes/${city}`, config)
      .then((res) => {
        setDishes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setRestaurants([]);
        setLoading(false);
      });
  };
  useEffect(() => {
    getDishes();
  }, []);
  console.log(dishes);
  if (loading) return <TransparentSpinner />;
  return (
    <View>
      {dishes.length > 0 ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            paddingHorizontal: 20,
          }}
        >
          <FlatList
            data={dishes}
            keyExtractor={(item) => item._id}
            style={{
              //   marginHorizontal: 20,
              paddingTop: 20,
            }}
            ListHeaderComponent={
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.darkPrimary,
                    fontWeight: "700",
                    marginBottom: 20,
                  }}
                >
                  Results({dishes?.length})
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <TouchableOpacity
                    style={{ position: "relative" }}
                    onPress={() => navigate.navigate("BasketScreen")}
                  >
                    <FontAwesome
                      size={30}
                      color={colors.secondary}
                      name="shopping-basket"
                    />

                    {baskets?.length > 0 && (
                      <Text
                        style={{
                          position: "absolute",
                          right: 10,
                          top: 2,
                          zIndex: 1,
                          backgroundColor: colors.errorColor,
                          borderRadius: 999,
                          color: "white",
                          paddingVertical: 2,
                          paddingHorizontal: 5,
                        }}
                      >
                        {baskets?.length <= 99 ? baskets?.length : "99+"}
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setOnBlock(true)}>
                    <Foundation
                      name="thumbnails"
                      size={30}
                      color={colors.secondary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setOnBlock(false)}>
                    <Ionicons
                      name="list-circle-sharp"
                      size={30}
                      color={colors.secondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }
            renderItem={({ item }) =>
              onBlock ? <DishItem data={item} /> : <DishListItem data={item} />
            }
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: 40, width: "100%" }} />}
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
            We Don't Have Any Dishes in Your Searched Location
          </Text>
          <View style={{ width: "100%" }}>
            <SecBtn onBtnPress={() => navigate.goBack()} text={"Go Back"} />
          </View>
        </View>
      )}
    </View>
  );
};

export default DishesSearchResult;
