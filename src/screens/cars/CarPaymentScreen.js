import { View } from "react-native";
import { Paystack } from "react-native-paystack-webview";
import { PAY_STACK_PUBLIC_KEY } from "../../../constants/ApiKeys";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import { TransparentSpinner } from "../../components";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { useCarContext } from "../../../context/CarContext";

const CarPaymentScreen = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const {
    pickupLocation,
    dropOff,
    pickupDate,
    returnDate,
    setPickupLocation,
    setDropOff,
    setPickupDate,
    setReturnDate,
  } = useCarContext();
  const { data, amount, calDays } = route?.params;

  const { _id, userId } = data;
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const onSuccessPay = async (transRef) => {
    setBtnLoading(true);
    let bookingData = {
      userId: authUser?._id,
      carId: _id,
      transactionId: transRef?.transaction,
      transactionRef: transRef?.reference,
      amount: amount.toFixed(0),
      days: calDays,
      pickupDate: pickupDate,
      returnDate: returnDate,
      pickupLat: pickupLocation?.location?.lat,
      pickupLng: pickupLocation?.location?.lng,
      pickupDesc: pickupLocation?.description,
      returnLat: dropOff?.location?.lat ? dropOff?.location?.lat : null,
      returnLng: dropOff?.location?.lng ? dropOff?.location?.lng : null,
      returnDesc: dropOff?.description ? dropOff?.description : "",
      isPaid: true,
      status: "BOOKED",
      carOwnerId: userId,
    };
    await axios
      .post(`${baseURL}/car/booking`, bookingData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "You have Successully booked a Car",
            text2: "Please await our Confirmation mail",
          });
          setDropOff((prev) => ({
            ...prev,
            location: null,
            description: null,
          }));
          setPickupLocation((prev) => ({
            ...prev,
            location: null,
            description: null,
          }));
          setPickupDate("Choose Date");
          setReturnDate("Choose Date");
          navigation.reset({
            index: 0,
            routes: [{ name: "ManageBooking" }],
          });
        }
      })
      .catch((error) => {
        navigation.navigate("CarDetailsScreen", { data });
        console.log(error);
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
        amount={amount.toFixed(0)}
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
          navigation.navigate("CarDetailsScreen", { data });
        }}
        onSuccess={(res) => {
          onSuccessPay(res.transactionRef);
        }}
        autoStart={true}
      />
    </View>
  );
};

export default CarPaymentScreen;
