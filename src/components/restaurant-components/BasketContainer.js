import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import { useRestaurantContext } from "../../../context/RestaurantContext";
import { useWalletContext } from "../../../context/WalletContext";
import { generateUniqueId } from "../../../constants/functions";
import baseURL from "../../../constants/baseURL";
import TransparentSpinner from "../TransparentSpinner";
import FormatedNumber from "../FormatedNumber";
import { OutlinedSecBtn, PrimaryBtn, SecBtn } from "../Forms";
import { GOOGLE_MAPS_APIKEY } from "../../../constants/ApiKeys";
import { FONTS, SHADOWS, SIZES, colors } from "../../../constants/theme";
import BasketItem from "./BasketItem";

const BasketContainer = ({ data }) => {
  const [currentBasket, setCurrentBasket] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState({
    location: null,
    description: null,
    deliveryFee: 2000,
    deliveryCity: null,
  });
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [showPaymentCont, setShowPaymentCont] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { authUser, userId } = useAuthContext();
  const { basket, setBasket, restaurants } = useRestaurantContext();
  const { walletBal, setTransactions } = useWalletContext();
  const { restaurantId, items } = data;

  useEffect(() => {
    const foundItem = restaurants.find(
      (element) => element._id === restaurantId
    );
    if (foundItem) setRestaurant(foundItem);
  }, []);
  const { restaurantName } = restaurant;
  const sumTotal = () => {
    let cal_Total = 0;
    items.forEach((number) => {
      cal_Total += number.price * number.qty;
    });
    return cal_Total;
  };
  let newOrder = {
    userId: userId,
    restaurantId: restaurantId,
    status: "NEW",
    total: sumTotal(),
  };
  const onPayWithCard = () => {
    setLoading(true);
    if (!deliveryAddress?.location?.lng || !deliveryAddress?.description) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Delivery Address is required",
        text2: "Please Enter your Delivery Address",
      });
    } else {
      const tempRideCity = deliveryAddress.description.split(",");
      const length = tempRideCity.length - 2;
      const ride_city = tempRideCity[length].replace(/\s+/g, "");
      deliveryAddress.deliveryCity = ride_city;
      navigation.navigate("BasketPaymentScreen", {
        newOrder,
        currentBasket,
        deliveryAddress,
        restaurantName,
      });
    }
    setLoading(false);
    setShowPaymentCont(false);
  };
  const onPayWithWallet = async () => {
    setLoading(true);
    const transId = generateUniqueId();
    const transRef = generateUniqueId() + "-REF";
    let payData = {
      userId: authUser?._id,
      desc: `Payment for Odering Dish from ${restaurantName}`,
      transactionId: transId,
      transactionRef: transRef,
      amount: sumTotal(),
      transType: "DEBIT",
      paymentMode: "WALLET",
      notDesc: `Your wallet have been Debit with sum of ${sumTotal()} with transactional ID ${transId} and reference ${transRef}. Payment for your Ordering Food at ${restaurantName} Restaurant, Plese await our email as we process your order.`,
      notTitle: "Alert!!!, Wallet Debited",
      notType: "Wallet",
    };
    if (
      deliveryAddress?.location === null ||
      deliveryAddress?.description === null
    ) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Delivery Address is required",
        text2: "Please Enter your Delivery Address",
      });
      setLoading(false);
    } else if (sumTotal() > walletBal) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Insufficient Fund in Your Wallet",
        text2: "Please Fund your Wallet or use another mode of Payment",
      });
      setLoading(false);
    } else {
      const tempRideCity = deliveryAddress.description.split(",");
      const length = tempRideCity.length - 2;
      const ride_city = tempRideCity[length].replace(/\s+/g, "");
      deliveryAddress.deliveryCity = ride_city;
      let orderData = {
        userId: userId,
        restaurantId: restaurantId,
        transactionId: transId,
        transactionRef: transRef,
        amount: sumTotal(),
        orderedItems: currentBasket,
        status: "NEW",
        isPaid: true,
        deliveryAddress: deliveryAddress,
        paymentMode: "WALLET",
      };
      const config = {
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      };
      await axios
        .post(`${baseURL}/wallet`, payData, config)
        .then((res) => {
          if (res.status == 201) {
            axios
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
                  axios
                    .get(`${baseURL}/wallet/user-transactions`, config)
                    .then((res) => {
                      setTransactions(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setBasket([]);
                  navigation.navigate("ManageBooking");
                  // navigation.navigate("MenuOrderDetails", {
                  //   orderDetails: res.data,
                  // });
                  setLoading(false);
                }
              })
              .catch((error) => {
                console.log(error);
                Toast.show({
                  topOffset: 60,
                  type: "error",
                  text1: "Something Went wrong while Placing Your Order",
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
            text1: "Something Went wrong, while making payment",
            text2: "Please Try Again",
          });
          setLoading(false);
          navigation.navigate("WalletIndexScreen");
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
    <SafeAreaView
      style={{
        // height: "100%",
        width: "100%",
        backgroundColor: "white",
        // paddingHorizontal: 25,
        // paddingVertical: 30,
        marginVertical: 20,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          // height: "100%",
          width: "100%",
          // backgroundColor: "white",
          paddingHorizontal: 25,
          paddingVertical: 30,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONTS.extraBold,
            color: colors.secondary,
            paddingVertical: 10,
          }}
        >
          {restaurantName}
        </Text>
        <Text
          style={{
            fontSize: SIZES.medium,
            fontFamily: FONTS.medium,
            color: colors.primary,
            paddingVertical: 10,
          }}
        >
          Your Items
        </Text>
        {items.length > 0 ? (
          <View style={{}}>
            <FlatList
              data={items}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => <BasketItem data={item} />}
              showsVerticalScrollIndicator={false}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text>Total</Text>
              <FormatedNumber
                value={sumTotal()}
                size={SIZES.large}
                color={colors.primary}
              />
            </View>
            <View>
              <SecBtn
                text={"Proceed to Checkout"}
                onBtnPress={() =>
                  navigation.navigate("BasketCheckout", { data })
                }
              />
            </View>
          </View>
        ) : (
          <View>
            <Text>No Item in Your Basket </Text>
          </View>
        )}
      </View>
      {/* Payment Container */}
      <Modal visible={false}>
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 400,
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
            {/* <View style={{ position: "absolute", right: 20, top: 20 }}>
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
            </View> */}
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
                  value={sumTotal()}
                  size={SIZES.large}
                  color={colors.primary}
                />
              </View>
              <PrimaryBtn text={"Pay With Card"} onBtnPress={onPayWithCard} />
              {/* <SecBtn text={"Pay With Wallet"} onBtnPress={onPayWithWallet} /> */}
              <OutlinedSecBtn
                text={"Pay With Paypal"}
                onBtnPress={onPayWithPaypal}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 50,
              left: "48%",
            }}
            onPress={() => setShowPaymentCont(false)}
          >
            <FontAwesome name="times-circle-o" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BasketContainer;
