import { View, Text } from "react-native";
import React from "react";
import Footer from "../../../components/Layouts/Footer";
import { NewPreviousTab } from "../../../components";
import { useState } from "react";
import { useRestaurantContext } from "../../../../context/RestaurantContext";
import { useEffect } from "react";
import { useAuthContext } from "../../../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import baseURL from "../../../../constants/baseURL";
import axios from "axios";
import {
  ReservationOrderTab,
  UserOrdersContainer,
  UserReservationsContainer,
} from "../../../components/restaurant-components/res-admin";
import { useNavigation } from "@react-navigation/native";
const RestaurantAdminHome = ({ navigation }) => {
  const [onReservations, setOnReservations] = useState(true);
  const [onOrders, setOnOrders] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);

  const { authUser, config, userId } = useAuthContext();
  const {
    currentRestaurant,
    setCurrentRestaurant,
    resReservations,
    setResReservations,
    resOrders,
    setResOrders,
  } = useRestaurantContext();
  const onMountCheck = () => {
    axios
      .get(`${baseURL}/restaurant/admin/${userId}`, config)
      .then(async (res) => {
        if (res.data === null) {
          setIsLoading(false);
          navigation.navigate("AddRestaurantDetails");
        } else {
          setCurrentRestaurant(res.data);
          await axios
            .get(
              `${baseURL}/restaurant/reservations/restaurant/${res?.data?._id}`,
              config
            )
            .then((res) => {
              setResReservations(res.data);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);
            });
          await axios
            .get(`${baseURL}/restaurant/admin/orders/${res?.data?._id}`, config)
            .then((res) => {
              setResOrders(res.data);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);
            });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    onMountCheck();
  }, []);
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      onMountCheck();
    });
    return focusHandler;
  }, [navigation]);
  return (
    <>
      <View style={{ height: "100%", width: "100%" }}>
        <Spinner visible={isLoading} />
        <View>
          <ReservationOrderTab
            onReservations={onReservations}
            setOnReservations={setOnReservations}
            onOrders={onOrders}
            setOnOrders={setOnOrders}
            newTabText="New Reservations"
            prevTabText="New Orders"
          />
        </View>
        {onReservations ? (
          <UserReservationsContainer
            data={resReservations}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <UserOrdersContainer
            data={resOrders}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        <Footer active={"restaurantHome"} searchPath={"RestaurantAdminHome"} />
      </View>
    </>
  );
};

export default RestaurantAdminHome;
