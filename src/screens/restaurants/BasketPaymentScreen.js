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
import { useRestaurantContext } from "../../../context/RestaurantContext";

const BasketPaymentScreen = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { setBasket } = useRestaurantContext();

  const { newOrder, currentBasket, deliveryAddress, restaurantName } =
    route?.params;

  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const onSuccessPay = async (transRef) => {
    setBtnLoading(true);
    let orderData = {
      userId: authUser?._id,
      restaurantId: newOrder?.restaurantId,
      transactionId: transRef?.transaction,
      transactionRef: transRef?.reference,
      amount: newOrder?.total.toFixed(0),
      orderedItems: currentBasket,
      status: "NEW",
      isPaid: true,
      deliveryAddress: deliveryAddress,
      paymentMode: "PAYSTACK",
    };
    await axios
      .post(`${baseURL}/restaurant/order`, orderData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Your Order was successful!!!",
            text2:
              "Our Restaurant will Confirm and Process Your Order, Please await our Confirmation mail",
          });
          setBasket([]);
          navigation.reset({
            index: 0,
            routes: [{ name: "ManageBooking" }],
          });
          setBtnLoading(false);
        }
      })
      .catch((error) => {
        navigation.navigate("BasketScreen", {
          restaurantId: newOrder?.restaurantId,
          userId: newOrder?.userId,
          restaurantName,
        });
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
        amount={newOrder?.total.toFixed(0)}
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
          navigation.navigate("BasketScreen", {
            restaurantId: newOrder?.restaurantId,
            userId: newOrder?.userId,
            restaurantName,
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

export default BasketPaymentScreen;
