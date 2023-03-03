import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import baseURL from "../constants/baseURL";
import { useAuthContext } from "./AuthContext";
const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [basket, setBasket] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [resReservations, setResReservations] = useState(null);
  const [resOrders, setResOrders] = useState(null);
  const { authUser } = useAuthContext();

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
        });
      return () => {
        setRestaurants([]);
      };
    }
  }, [authUser]);
  const getCurrentRestaurantDetails = async (restaurantId) => {
    if (restaurants) {
      const tempRes = restaurants.filter((item) => item._id === restaurantId);
      setCurrentRestaurant(tempRes);
    }
  };
  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        basket,
        setBasket,
        getCurrentRestaurantDetails,
        currentRestaurant,
        setCurrentRestaurant,
        resReservations,
        setResReservations,
        resOrders,
        setResOrders,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;

export const useRestaurantContext = () => useContext(RestaurantContext);
