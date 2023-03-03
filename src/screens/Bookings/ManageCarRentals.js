import { View, SafeAreaView } from "react-native";
import { NewPreviousTab, TransparentSpinner } from "../../components";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { CarBookingContainer } from "../../components/booking-components";
import { useCarContext } from "../../../context/CarContext";

const ManageCarRentals = () => {
  const [onNew, setOnNew] = useState(true);
  const [onPrevious, setOnPrevious] = useState(false);
  const { bookings, setBookings } = useCarContext();
  const { authUser } = useAuthContext();
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${baseURL}/car/bookings/user/${authUser?._id}`, config)
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
  if (!bookings) return <TransparentSpinner />;
  return (
    <SafeAreaView>
      <View>
        <NewPreviousTab
          onNew={onNew}
          setOnNew={setOnNew}
          onPrevious={onPrevious}
          setOnPrevious={setOnPrevious}
          newTabText="New Rented Cars"
          prevTabText="Previously Rented Cars"
        />
      </View>
      {onNew ? (
        <CarBookingContainer data={bookings} tab="new" />
      ) : (
        <CarBookingContainer data={bookings} tab="previous" />
      )}
    </SafeAreaView>
  );
};

export default ManageCarRentals;
