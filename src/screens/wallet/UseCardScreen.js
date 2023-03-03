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
import { useWalletContext } from "../../../context/WalletContext";

const UseCardScreen = () => {
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { amount } = route?.params;
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { setTransactions } = useWalletContext();

  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const onSuccessPay = async (transRef) => {
    setLoading(true);
    let payData = {
      userId: authUser?._id,
      desc: "Wallet Funded with Paystack",
      transactionId: transRef?.transaction,
      transactionRef: transRef?.reference,
      amount: amount,
      transType: "CREDIT",
      paymentMode: "PAYSTACK",
    };
    await axios
      .post(`${baseURL}/wallet`, payData, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Wallet Funded successful!!!",
            text2: "Funded Amount added to your wallet",
          });
          axios
            .get(`${baseURL}/wallet/user-transactions`, config)
            .then((res) => {
              setTransactions(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          navigation.navigate("WalletIndexScreen");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something Went wrong",
          text2: "Please Try Again",
        });
        setLoading(false);
        navigation.navigate("WalletIndexScreen");
      });
  };
  if (loading) return <TransparentSpinner />;

  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey={PAY_STACK_PUBLIC_KEY}
        amount={amount}
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
          setLoading(false);
          navigation.navigate("WalletIndexScreen");
        }}
        onSuccess={(res) => {
          onSuccessPay(res.transactionRef);
        }}
        autoStart={true}
      />
    </View>
  );
};

export default UseCardScreen;
