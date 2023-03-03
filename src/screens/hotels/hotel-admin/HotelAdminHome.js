import { useState, useEffect } from "react";
import { View } from "react-native";
import Footer from "../../../components/Layouts/Footer";
import { NewPreviousTab } from "../../../components";
import { useAuthContext } from "../../../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import baseURL from "../../../../constants/baseURL";
import axios from "axios";
import { useHotelContext } from "../../../../context/HotelContext";
import { BookingContainer } from "../../../components/hotel-components";

const HotelAdminHome = () => {
  const [onNew, setOnNew] = useState(true);
  const [onPrevious, setOnPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { authUser } = useAuthContext();
  const { hotelReservations, setHotelReservations } = useHotelContext();
  useEffect(() => {
    // if (authUser) {
    const config = {
      headers: {
        Authorization: `Bearer ${authUser?.token}`,
      },
    };
    axios
      .get(`${baseURL}/hotel/reservations/admin/${authUser?._id}`, config)
      .then((res) => {
        setHotelReservations(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setHotelReservations([]);
      setIsLoading(false);
    };
    // }
  }, []);
  // console.log(hotelReservations);
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
        <BookingContainer
          data={hotelReservations}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          tab="new"
        />
      ) : (
        <BookingContainer
          data={hotelReservations}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          tab="previous"
        />
      )}
      <Footer active={"hotel-admin-home"} />
    </View>
  );
};

export default HotelAdminHome;
