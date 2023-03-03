import { View, SafeAreaView } from "react-native";
import { NewPreviousTab, TransparentSpinner } from "../../components";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import Toast from "react-native-toast-message";
import { useHotelContext } from "../../../context/HotelContext";
import { HotelReservationContainer } from "../../components/booking-components";

const ManageHotelReservations = () => {
  const [onNew, setOnNew] = useState(true);
  const [onPrevious, setOnPrevious] = useState(false);
  const { userReservations, setUserReservations } = useHotelContext();
  const { authUser } = useAuthContext();
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${baseURL}/hotel/reservations/${authUser?._id}`, config)
        .then((res) => {
          setUserReservations(res.data);
        })
        .catch((err) => {
          console.log(err);
          setUserReservations([]);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error Occur while Getting your Reservations",
            text2: "Please Refresh your App and try Again",
          });
        });
    };
    fetchData();
  }, []);
  console.log(userReservations);
  if (userReservations === null) return <TransparentSpinner />;
  return (
    <SafeAreaView>
      <View>
        <NewPreviousTab
          onNew={onNew}
          setOnNew={setOnNew}
          onPrevious={onPrevious}
          setOnPrevious={setOnPrevious}
          newTabText="Recent Reservations"
          prevTabText="Previous Reservations"
        />
      </View>
      {onNew ? (
        <HotelReservationContainer data={userReservations} tab="new" />
      ) : (
        <HotelReservationContainer data={userReservations} tab="previous" />
      )}
    </SafeAreaView>
  );
};

export default ManageHotelReservations;
