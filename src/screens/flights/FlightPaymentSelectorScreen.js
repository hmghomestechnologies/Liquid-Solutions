import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OutlinedSecBtn, PrimaryBtn, SecBtn } from "../../components/Forms";
import { FormatedNumber } from "../../components";
import { FONTS, SIZES, colors } from "../../../constants/theme";
import { useWalletContext } from "../../../context/WalletContext";
import { generateUniqueId } from "../../../constants/functions";
import { useAuthContext } from "../../../context/AuthContext";
import baseURL from "../../../constants/baseURL";
import Toast from "react-native-toast-message";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

const FlightPaymentSelectorScreen = () => {
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingDetails } = route?.params;
  const { walletBal, setTransactions } = useWalletContext();
  const { authUser } = useAuthContext();

  let flightBookingData = {
    userId: authUser?._id,
    userEmail: authUser?.email,
    flightDetails: JSON.stringify(bookingDetails),
    amount: bookingDetails?.amount,
    flightReferenceID: bookingDetails?.reference,
    transId: "",
    isPaid: true,
    status: "BOOKED",
  };
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const onPayWithCard = () => {
    setLoading(true);
    navigation.navigate("FlightPaymentScreen", {
      bookingDetails,
      flightBookingData,
    });
    setLoading(false);
  };
  const onPayWithWallet = async () => {
    setLoading(true);
    const transId = generateUniqueId();
    const transRef = generateUniqueId() + "-REF";
    let payData = {
      userId: authUser?._id,
      desc: `Payment for your flight Booking`,
      transactionId: transId,
      transactionRef: transRef,
      amount: bookingDetails?.amount,
      transType: "DEBIT",
      paymentMode: "WALLET",
      notDesc: `Your wallet have been Debit with sum of ${bookingDetails?.amount} with transactional ID ${transId} and reference ${transRef}. Payment for your Flight Booking.`,
      notTitle: "Alert!!!, Wallet Debited",
      notType: "Wallet",
    };
    flightBookingData.transId = transId;
    if (bookingDetails?.amount > walletBal) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Insufficient Fund in Your Wallet",
        text2: "Please Fund your Wallet or use another mode of Payment",
      });
      setLoading(false);
    } else {
      await axios
        .post(`${baseURL}/wallet`, payData, config)
        .then((res) => {
          if (res.status == 201) {
            axios
              .post(`${baseURL}/flight/book`, flightBookingData, config)
              .then((res) => {
                if (res.status == 201) {
                  Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Flight Booked Succesfully",
                    text2:
                      "we would confirm you Payment and send your Ticket soon",
                  });
                  axios
                    .get(`${baseURL}/wallet/user-transactions`, config)
                    .then((res) => {
                      setTransactions(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setLoading(false);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "ManageBooking" }],
                  });
                }
              })
              .catch((error) => {
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
                setLoading(false);
              });
          }
        })
        .catch((error) => {
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
          setLoading(false);
          //   navigation.navigate("WalletIndexScreen");
        });
    }
  };
  const onPayWithPaypal = async () => {
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Not Yet Available",
      text2: "Please Other Payment Method",
    });
  };
  console.log(typeof bookingDetails?.amount);
  console.log(typeof walletBal);
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Spinner visible={loading} />
      <View style={{}}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              marginBottom: 10,
              fontSize: SIZES.medium,
              fontFamily: FONTS.semiBold,
              color: colors.darkPrimary,
            }}
          >
            Pay to Complete your Booking
          </Text>
          <FormatedNumber
            value={bookingDetails?.amount}
            size={SIZES.large}
            color={colors.primary}
          />
        </View>
        <PrimaryBtn text={"Pay With Card"} onBtnPress={onPayWithCard} />
        <SecBtn text={"Pay With Wallet"} onBtnPress={onPayWithWallet} />
        <OutlinedSecBtn text={"Pay With Paypal"} onBtnPress={onPayWithPaypal} />
      </View>
    </View>
  );
};

export default FlightPaymentSelectorScreen;
