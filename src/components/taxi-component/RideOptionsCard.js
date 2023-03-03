import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import FormatedNumber from "../FormatedNumber";
import { useState } from "react";
import { useTaxiContext } from "../../../context/TaxiContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { useAuthContext } from "../../../context/AuthContext";
import { useWalletContext } from "../../../context/WalletContext";
import { OutlinedSecBtn, PrimaryBtn, SecBtn } from "../Forms";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { v4 as uuidv4 } from "uuid";
import TransparentSpinner from "../TransparentSpinner";

const RideOptionsCard = () => {
  const [selected, setSelected] = useState(null);
  const [price, setPrice] = useState(0);
  const [showPaymentCont, setShowPaymentCont] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    travelTimeInformation,
    origin,
    destination,
    pickupDate,
    pickupTime,
    rideCity,
    setPickupDate,
    setPickupTime,
    setOrigin,
    setDestination,
  } = useTaxiContext();
  const { authUser } = useAuthContext();
  const navigation = useNavigation();
  const { rides } = useTaxiContext();
  const { walletBal, setTransactions } = useWalletContext();
  const pricePerMile = 335;

  const data = [
    {
      id: 1,
      title: "Standard",
      multiplier: 1,
      image:
        "https://stockphoto.com/samples/Nzc1MDc0MjUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/red-car--on-white-background.jpg&size=1024",
    },
    {
      id: 2,
      title: "Executive",
      multiplier: 1.8,
      image:
        "https://stockphoto.com/samples/NDc4OTA5MTEwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/car-closeup.jpg&size=1024",
    },
    {
      id: 3,
      title: "Luxury",
      multiplier: 2.6,
      image:
        "https://stockphoto.com/samples/MzUyOTQ0NjAwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/black-car.jpg&size=1024",
    },
  ];
  function getPrice(number) {
    setPrice(
      parseInt(travelTimeInformation?.distance?.text) * number * pricePerMile
    );
  }
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  const onPayWithCard = () => {
    setLoading(true);
    navigation.navigate("TaxiPayment", { price, selected });
    setLoading(false);
    setShowPaymentCont(false);
  };
  const onPayWithWallet = async () => {
    setLoading(true);
    const transId = uuidv4();
    const transRef = "TRX" + uuidv4() + "REF";
    let payData = {
      userId: authUser?._id,
      desc: "Payment for Booking Taxi",
      transactionId: transId,
      transactionRef: transRef,
      amount: price,
      transType: "DEBIT",
      paymentMode: "WALLET",
    };
    let bookingData = {
      userId: authUser?._id,
      categoryId: selected?._id,
      transactionId: transId,
      transactionRef: transRef,
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
    console.log(bookingData, payData);
    if (price > walletBal) {
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
              .post(`${baseURL}/taxi/booking`, bookingData, config)
              .then((res) => {
                if (res.status == 201) {
                  Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "You have Successully booked a Car",
                    text2: "Please await our Confirmation mail",
                  });
                  axios
                    .get(`${baseURL}/wallet/user-transactions`, config)
                    .then((res) => {
                      setTransactions(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  navigation.navigate("ManageBooking");
                  setOrigin((prev) => ({
                    ...prev,
                    location: null,
                    description: null,
                  }));
                  setDestination((prev) => ({
                    ...prev,
                    location: null,
                    description: null,
                  }));
                  setPickupDate("Choose Date");
                  setPickupTime("Pickup Time");
                  setLoading(false);
                }
              })
              .catch((error) => {
                console.log(error);
                Toast.show({
                  topOffset: 60,
                  type: "error",
                  text1: "Something Went wrong with Booking",
                  text2: "Please Try Again",
                });
                setLoading(false);
              });
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something Went wrong, with Payment",
            text2: "Please Try Again",
          });
          setLoading(false);
        });
    }
  };
  const onPayWithPaypal = () => {
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Not Yet Available",
      text2: "Please Other Payment Method",
    });
  };
  if (loading) return <TransparentSpinner />;
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <Text
        style={{
          fontSize: SIZES.large,
          fontFamily: FONTS.semiBold,
          color: colors.primary,
          textAlign: "center",
          marginVertical: 20,
        }}
      >
        Select a Taxi
        {/* - {travelTimeInformation?.distance?.text} */}
      </Text>
      <FlatList
        data={rides}
        keyExtractor={(item) => item._id}
        renderItem={({
          item: { _id, catImg, categoryName, multiplier },
          item,
        }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              marginVertical: 5,
              backgroundColor: _id === selected?._id ? "#dee2e6" : "white",
              paddingVertical: 10,
            }}
          >
            <Image
              style={{
                width: 55,
                height: 55,
                borderRadius: 10,
                // resizeMode: "contain",
              }}
              source={{ uri: catImg }}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}
              >
                {categoryName}
              </Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <View>
              {getPrice(multiplier)}
              <FormatedNumber
                value={(
                  parseInt(travelTimeInformation?.distance?.text) *
                  multiplier *
                  pricePerMile
                ).toFixed(0)}
              />
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={{
          backgroundColor: !selected ? "#ced4da" : colors.darkPrimary,
          paddingVertical: 10,
          margin: 10,
        }}
        disabled={!selected}
        // onPress={() => navigation.navigate("TaxiPayment", { price, selected })}
        onPress={() => setShowPaymentCont(true)}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: SIZES.medium,
            fontFamily: FONTS.bold,
          }}
        >
          Proceed to Payment
        </Text>
      </TouchableOpacity>
      {/* Payment Container */}
      {showPaymentCont && (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "absolute",
            bottom: 0,
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 350,
              width: "80%",
              backgroundColor: "white",
              borderRadius: 15,
              paddingHorizontal: 20,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <View style={{ position: "absolute", right: 20, top: 20 }}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Wallet Bal.</Text>
                <FormatedNumber
                  value={walletBal}
                  color="green"
                  size={SIZES.medium}
                />
              </View>
            </View>
            <View style={{}}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: SIZES.medium,
                    fontFamily: FONTS.semiBold,
                    color: colors.darkPrimary,
                  }}
                >
                  Pay to Complete your Booking
                </Text>
                <FormatedNumber
                  value={price}
                  size={SIZES.large}
                  color={colors.primary}
                />
              </View>
              <PrimaryBtn text={"Pay With Card"} onBtnPress={onPayWithCard} />
              <SecBtn text={"Pay With Wallet"} onBtnPress={onPayWithWallet} />
              <OutlinedSecBtn
                text={"Pay With Paypal"}
                onBtnPress={onPayWithPaypal}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 20,
              left: "45%",
            }}
            onPress={() => setShowPaymentCont(false)}
          >
            <FontAwesome name="times-circle-o" size={40} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
