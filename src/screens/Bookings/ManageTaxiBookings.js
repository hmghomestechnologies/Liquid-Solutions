import { View, SafeAreaView } from "react-native";
import { NewPreviousTab } from "../../components";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { TaxiBookingContainer } from "../../components/booking-components";

const ManageTaxiBookings = () => {
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
        .get(`${baseURL}/taxi/user/bookings/${authUser?._id}`, config)
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
          newTabText="New Bookings"
          prevTabText="Previously Bookings"
        />
      </View>
      {onNew ? (
        <TaxiBookingContainer data={bookings} tab="new" />
      ) : (
        <TaxiBookingContainer data={bookings} tab="previous" />
      )}
    </SafeAreaView>
  );
};

export default ManageTaxiBookings;
