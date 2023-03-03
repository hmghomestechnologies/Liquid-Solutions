import { View } from "react-native";
import React from "react";
import Footer from "../../components/Layouts/Footer";
import { NewPreviousTab, TransparentSpinner } from "../../components";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import baseURL from "../../../constants/baseURL";
import axios from "axios";
import { UserContainer } from "../../components/booking-components/taxi-driver";
import { useRiderContext } from "../../../context/RiderContext";
import { RiderUserContainer } from "../../components/booking-components/rider-components";

const RiderHome = () => {
  const [onNew, setOnNew] = useState(true);
  const [onPrevious, setOnPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { authUser } = useAuthContext();
  const { rider, setRider, riderBookings, setRiderBookings } =
    useRiderContext();
  useEffect(() => {
    // if (authUser) {
    const config = {
      headers: {
        Authorization: `Bearer ${authUser?.token}`,
      },
    };
    axios
      .get(`${baseURL}/rider/user/rider/${authUser?._id}`, config)
      .then(async (res) => {
        setRider(res.data);
        if (res.status === 200) {
          await axios
            .get(`${baseURL}/restaurant/all/orders`, config)
            .then((res) => {
              setRiderBookings(res.data);
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
      setRiderBookings([]);
      setRider({});
      setIsLoading(false);
    };
    // }
  }, []);
  if (isLoading) return <Spinner />;
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
      {/* {onNew ? (
        <RiderUserContainer
          data={riderBookings}
          rider={rider}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          tab="new"
        />
      ) : (
        <RiderUserContainer
          data={riderBookings}
          rider={rider}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          tab="previous"
        />
      )} */}
      <Footer active={"rider-home"} />
    </View>
  );
};

export default RiderHome;
