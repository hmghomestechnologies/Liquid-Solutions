import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import baseURL from "../constants/baseURL";
import { useAuthContext } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [baskets, setBaskets] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [resReservations, setResReservations] = useState(null);
  const [resOrders, setResOrders] = useState(null);
  const { authUser } = useAuthContext();

  async function getAllBaskets() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const basketKeys = keys.filter((key) => key.startsWith("basket_"));
      const baskets = await AsyncStorage.multiGet(basketKeys);

      return baskets.map(([key, value]) => ({
        restaurantId: key.replace("basket_", ""),
        items: JSON.parse(value),
      }));
    } catch (error) {
      console.log("Error retrieving all baskets:", error);
      return [];
    }
  }
  async function fetchAllBaskets() {
    const allBaskets = await getAllBaskets();
    setBaskets(allBaskets);
  }
  useEffect(() => {
    if (authUser) {
      const config = {
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      };
      axios
        .get(`${baseURL}/restaurant/admin`, config)
        .then((res) => {
          setRestaurants(res.data);
        })
        .catch((err) => {
          console.log(err);
          setRestaurants([]);
        });
    }
    fetchAllBaskets();
  }, [authUser]);

  const getCurrentRestaurantDetails = async (restaurantId) => {
    if (restaurants) {
      const tempRes = restaurants.filter((item) => item._id === restaurantId);
      setCurrentRestaurant(tempRes);
    }
  };
  const addToBasket = async (restaurantId, dish) => {
    try {
      // Check if basket exists for the restaurant ID
      const basketExists = await AsyncStorage.getItem(`basket_${restaurantId}`);

      if (basketExists) {
        // Basket exists, retrieve and update it
        const basket = JSON.parse(basketExists);
        basket.push(dish);

        // Save the updated basket back to AsyncStorage
        await AsyncStorage.setItem(
          `basket_${restaurantId}`,
          JSON.stringify(basket)
        );
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Item Added to Basket",
          text2: "You can check your Basket to confirm",
        });
      } else {
        // Basket does not exist, create a new one
        const newBasket = [dish];

        // Save the new basket to AsyncStorage
        await AsyncStorage.setItem(
          `basket_${restaurantId}`,
          JSON.stringify(newBasket)
        );
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Item Added to Basket",
          text2: "You can check your Basket to confirm",
        });
      }
    } catch (error) {
      console.log("Error adding dish to basket:", error);
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        baskets,
        setBaskets,
        getCurrentRestaurantDetails,
        currentRestaurant,
        setCurrentRestaurant,
        resReservations,
        setResReservations,
        resOrders,
        setResOrders,
        addToBasket,
        getAllBaskets,
        fetchAllBaskets,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;

export const useRestaurantContext = () => useContext(RestaurantContext);
