import { View, Text, SafeAreaView } from "react-native";
import { NewPreviousTab } from "../../components";
import { useState, useEffect } from "react";
import {
  RestaurantBookingContainer,
  RestaurantBookingItem,
} from "../../components/booking-components";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";

const ManageRestaurantReservations = () => {
  const [onNew, setOnNew] = useState(true);
  const [onPrevious, setOnPrevious] = useState(false);
  const [bookings, setBookings] = useState(null);

  const { authUser } = useAuthContext();
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${baseURL}/restaurant/reservations/${authUser?._id}`, config)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return () => {
        setBookings([]);
      };
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView>
      <View>
        <NewPreviousTab
          onNew={onNew}
          setOnNew={setOnNew}
          onPrevious={onPrevious}
          setOnPrevious={setOnPrevious}
          newTabText="New Reservations"
          prevTabText="Previous Reservations"
        />
      </View>
      {onNew ? (
        <RestaurantBookingContainer data={bookings} tab="new" />
      ) : (
        <RestaurantBookingContainer data={bookings} tab="previous" />
      )}
    </SafeAreaView>
  );
};

export default ManageRestaurantReservations;
