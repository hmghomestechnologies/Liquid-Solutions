import { View } from "react-native";
import { Paystack } from "react-native-paystack-webview";
import { PAY_STACK_PUBLIC_KEY } from "../../../constants/ApiKeys";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import { useTaxiContext } from "../../../context/TaxiContext";
import { TransparentSpinner } from "../../components";
import axios from "axios";
import baseURL from "../../../constants/baseURL";

const HotelPaymentScreen = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { authUser } = useAuthContext();

  const { reservationData, searchedData, category, calDays } = route?.params;

  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const onSuccessPay = async (transRef) => {
    setBtnLoading(true);
    reservationData.transId = transRef?.transaction;
    await axios
      .post(`${baseURL}/hotel/reservations`, reservationData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Hotel Booked Succesfully",
            text2: "You can confirm your reservation",
          });
          setBtnLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "ManageBooking" }],
          });
        }
      })
      .catch((error) => {
        console.log(error);
        navigation.navigate("HotelBookingScreen", {
          searchedData,
          category,
          calDays,
        });
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something Went wrong",
          text2: "Please Try Again",
        });
        setBtnLoading(false);
      });
  };
  if (btnLoading) return <TransparentSpinner />;
  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey={PAY_STACK_PUBLIC_KEY}
        amount={reservationData?.amount.toFixed(0)}
        billingEmail={authUser?.email}
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error Occured, Payment Couldn't Complete",
            text2: "Please Try Again",
          });
          navigation.navigate("HotelBookingScreen", {
            searchedData,
            category,
            calDays,
          });
        }}
        onSuccess={(res) => {
          onSuccessPay(res.transactionRef);
        }}
        autoStart={true}
      />
    </View>
  );
};

export default HotelPaymentScreen;
