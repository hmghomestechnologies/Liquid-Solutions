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

const TaxiPayment = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const {
    origin,
    destination,
    pickupDate,
    pickupTime,
    rideCity,
    setOrigin,
    setDestination,
    setPickupDate,
    setPickupTime,
  } = useTaxiContext();

  const { price, selected } = route?.params;

  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const onSuccessPay = async (transRef) => {
    setBtnLoading(true);
    let bookingData = {
      userId: authUser?._id,
      categoryId: selected?._id,
      transactionId: transRef?.transaction,
      transactionRef: transRef?.reference,
      amount: price.toFixed(0),
      pickupDate: pickupDate,
      pickupTime: pickupTime,
      originLat: origin?.location?.lat,
      originLng: origin?.location?.lng,
      originDesc: origin?.description,
      destLat: destination?.location?.lat,
      destLng: destination?.location?.lng,
      destDesc: destination?.description,
      status: "BOOKED",
      rideCity: rideCity,
    };
    await axios
      .post(`${baseURL}/taxi/booking`, bookingData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "You have Successully booked Taxi for Your Trip",
            text2:
              "A Driver will accept your request Soon, Please await our Confirmation mail",
          });
          navigation.navigate("ManageBooking");
          // setOrigin((prev) => ({
          //   ...prev,
          //   location: null,
          //   description: null,
          // }));
          // setDestination((prev) => ({
          //   ...prev,
          //   location: null,
          //   description: null,
          // }));
          // setPickupDate("Choose Date");
          // setPickupTime("Pickup Time");
          // setBtnLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        navigation.navigate("ChooseRide");
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
        amount={price.toFixed(0)}
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
          navigation.navigate("ChooseRide");
        }}
        onSuccess={(res) => {
          onSuccessPay(res.transactionRef);
        }}
        autoStart={true}
      />
    </View>
  );
};

export default TaxiPayment;
