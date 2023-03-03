import { View } from "react-native";
import React from "react";
import Footer from "../../../components/Layouts/Footer";
import { NewPreviousTab } from "../../../components";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import baseURL from "../../../../constants/baseURL";
import axios from "axios";
import { UserContainer } from "../../../components/booking-components/taxi-driver";
import { useTaxiContext } from "../../../../context/TaxiContext";

const TaxiDriverHome = () => {
  const [onNew, setOnNew] = useState(true);
  const [onPrevious, setOnPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState(null);

  const { authUser } = useAuthContext();
  const { driver, setDriver } = useTaxiContext();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${authUser?.token}`,
      },
    };
    axios
      .get(`${baseURL}/taxi/user/driver/${authUser?._id}`, config)
      .then(async (res) => {
        setDriver(res.data);
        console.log(driver);
        if (res.status === 200) {
          await axios
            .get(
              `${baseURL}/taxi/bookings/location/${res?.data?.rideCity}`,
              config
            )
            .then((res) => {
              setBookings(res.data);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setBookings([]);
      setDriver({});
      setIsLoading(false);
    };
  }, []);
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Spinner visible={isLoading} />
      {/* <View>
        <NewPreviousTab
          onNew={onNew}
          setOnNew={setOnNew}
          onPrevious={onPrevious}
          setOnPrevious={setOnPrevious}
          newTabText="New Request"
          prevTabText="Completed Requests"
        />
      </View>
      {onNew ? ( */}
      <UserContainer
        data={bookings}
        driver={driver}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        tab="new"
      />
      {/* ) : (
        <UserContainer
          data={bookings}
          driver={driver}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          tab="previous"
        />
      )} */}
      <Footer active={"driver-home"} />
    </View>
  );
};

export default TaxiDriverHome;
