import { View } from "react-native";
import { Paystack } from "react-native-paystack-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useState } from "react";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { useAuthContext } from "../../../context/AuthContext";
import { PAY_STACK_PUBLIC_KEY } from "../../../constants/ApiKeys";
import { TransparentSpinner } from "../../components";

const FlightPaymentScreen = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const route = useRoute();
  const { bookingDetails, flightBookingData } = route.params;
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const onSuccessPay = async (transRef) => {
    flightBookingData.transId = transRef?.transaction;
    await axios
      .post(`${baseURL}/flight/book`, flightBookingData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Flight Booked Succesfully",
            text2: "we would confirm you Payment and send your Ticket soon",
          });
          setBtnLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "ManageBooking" }],
          });
        }
      })
      .catch((error) => {
        // Navigate Back with Data
        navigation.navigate("FlightPaymentSelectorScreen", { bookingDetails });
        console.log(error.message);
        if (error?.response?.data?.message === undefined) {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: `${error?.message}`,
            text2: "Please Try Again",
          });
        } else {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: `${error?.response?.data?.message}`,
            text2: "Please Try Again",
          });
        }
        setBtnLoading(false);
      });
  };
  if (btnLoading) return <TransparentSpinner />;
  console.log(flightBookingData);
  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey={PAY_STACK_PUBLIC_KEY}
        amount={bookingDetails?.amount.toFixed(0)}
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
          navigation.navigate("FlightPaymentSelectorScreen", {
            bookingDetails,
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

export default FlightPaymentScreen;
