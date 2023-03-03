import { View, Text } from "react-native";
import React from "react";
import Footer from "../../../components/Layouts/Footer";
import { NewPreviousTab } from "../../../components";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import baseURL from "../../../../constants/baseURL";
import axios from "axios";
import { UserCarBookingContainer } from "../../../components/booking-components/car-rentor";
import { useCarContext } from "../../../../context/CarContext";

const RentorHome = () => {
  const [onNew, setOnNew] = useState(true);
  const [onPrevious, setOnPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { authUser } = useAuthContext();
  const { rentorBookings, setRentorBookings } = useCarContext();
  useEffect(() => {
    // if (authUser) {
    const config = {
      headers: {
        Authorization: `Bearer ${authUser?.token}`,
      },
    };
    axios
      .get(`${baseURL}/car/user/${authUser?._id}`, config)
      .then((res) => {
        setRentorBookings(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setRentorBookings([]);
      setIsLoading(false);
    };
    // }
  }, []);
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Spinner visible={isLoading} />
      <View>
        <NewPreviousTab
          onNew={onNew}
          setOnNew={setOnNew}
          onPrevious={onPrevious}
          setOnPrevious={setOnPrevious}
          newTabText="New Request"
          prevTabText="Completed Requests"
        />
      </View>
      {onNew ? (
        <UserCarBookingContainer
          data={rentorBookings}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          tab="new"
        />
      ) : (
        <UserCarBookingContainer
          data={rentorBookings}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          tab="previous"
        />
      )}
      <Footer active={"car-rentor-home"} />
    </View>
  );
};

export default RentorHome;
