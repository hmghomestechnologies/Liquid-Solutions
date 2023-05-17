import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ScrollView,
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
import { deliveryPricePerKM } from "../../../constants/prices";

const BasketCheckout = () => {
  const [currentBasket, setCurrentBasket] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState({
    location: null,
    description: null,
    deliveryFee: "",
    deliveryCity: null,
  });
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [showPaymentCont, setShowPaymentCont] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempDelFee, setTempDelFee] = useState("");
  const [total, setTotal] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const { authUser, userId } = useAuthContext();
  const { setBasket, restaurants } = useRestaurantContext();
  const { walletBal, setTransactions } = useWalletContext();
  const { data } = route.params;
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
    total: parseInt(total),
  };
  console.log(typeof items);
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
        items,
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
      amount: parseInt(total),
      transType: "DEBIT",
      paymentMode: "WALLET",
      notDesc: `Your wallet have been Debit with sum of ${total} with transactional ID ${transId} and reference ${transRef}. Payment for your Ordering Food at ${restaurantName} Restaurant, Plese await our email as we process your order.`,
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
    } else if (total > walletBal) {
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
        amount: parseInt(total),
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
  // Function to calculate the distance between two coordinates using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c; // Distance in kilometers

    return distance;
  };

  // Function to convert degrees to radians
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  function getDeliveryDistance(delCordinate) {
    const lat1 = delCordinate.lat;
    const lon1 = delCordinate.lng;
    const lat2 = parseFloat(restaurant.lat);
    const lon2 = parseFloat(restaurant.lng);
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    let tempDel = distance * deliveryPricePerKM;

    setTempDelFee(tempDel.toFixed(0));
    setTotal(parseInt(tempDel) + parseInt(sumTotal()));
    setDeliveryAddress((prev) => ({
      ...prev,
      deliveryFee: tempDel.toFixed(0),
    }));
  }
  function onProceedToCheckout() {
    if (
      deliveryAddress?.location === null ||
      deliveryAddress?.description === null ||
      total == 0 ||
      tempDelFee === ""
    ) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Delivery Address Required",
        text2: "Please Try Again",
      });
    } else {
      setShowPaymentCont(true);
    }
  }
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
        {/* <Text
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
              <Text>Sub Total:</Text>
              <FormatedNumber
                value={sumTotal()}
                size={SIZES.large}
                color={colors.primary}
              />
            </View>
          </View>
        ) : (
          <View>
            <Text>No Item in Your Basket </Text>
          </View>
        )} */}
        {items.length > 0 && (
          <View
            style={{
              // position: "absolute",
              // bottom: 20,
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            {deliveryAddress?.description ? (
              <View
                style={{
                  width: "100%",
                  position: "relative",
                  marginVertical: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderColor: colors.darkSecondary,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingVertical: 10,
                }}
              >
                <View style={{ width: "10%" }}>
                  <MaterialCommunityIcons
                    name={"google-maps"}
                    size={24}
                    color={"red"}
                  />
                </View>
                <View style={{ width: "80%" }}>
                  <Text
                    style={{
                      marginHorizontal: 2,
                    }}
                  >
                    {deliveryAddress?.description}
                  </Text>
                </View>
                <View style={{ width: "10%" }}>
                  <FontAwesome
                    name={"times-circle"}
                    size={24}
                    color={"gray"}
                    onPress={() => {
                      setDeliveryAddress((prev) => ({
                        ...prev,
                        location: null,
                        description: null,
                      }));
                    }}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  position: "relative",
                  marginVertical: 5,
                }}
              >
                <Ionicons
                  name={"md-search"}
                  size={24}
                  color={"gray"}
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 10,
                  }}
                />
                <TouchableOpacity
                  style={{
                    width: "100%",
                    paddingHorizontal: 15,
                    paddingVertical: 13,
                    borderColor: colors.darkSecondary,
                    borderWidth: 1,
                    paddingLeft: 40,
                    borderRadius: 10,
                    backgroundColor: "white",
                  }}
                  onPress={() => setShowDeliveryAddress(true)}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      color: colors.secondary,
                      fontWeight: "600",
                      fontSize: SIZES.medium,
                    }}
                  >
                    Enter Your Delivery Address
                  </Text>
                </TouchableOpacity>
                <FontAwesome
                  name={"times-circle"}
                  size={24}
                  color={"gray"}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                  }}
                  // onPress={onBlur}
                />
              </View>
            )}
          </View>
        )}
        {tempDelFee && (
          <View style={{ marginVertical: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 4,
              }}
            >
              <Text>Sub Total (Dishes only):</Text>
              <FormatedNumber
                value={sumTotal()}
                size={SIZES.large}
                color={colors.primary}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 4,
              }}
            >
              <Text>Delivery Fee:</Text>
              <FormatedNumber
                value={tempDelFee}
                size={SIZES.large}
                color={colors.primary}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 4,
                marginTop: 4,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: SIZES.medium }}>
                Total:
              </Text>
              <FormatedNumber
                value={total}
                size={SIZES.large}
                color={colors.primary}
              />
            </View>
          </View>
        )}
        <SecBtn
          text={"Proceed to Checkout"}
          onBtnPress={() => {
            onProceedToCheckout();
          }}
        />
      </View>
      {/* Delivery Address Container */}
      <Modal visible={showDeliveryAddress}>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            paddingHorizontal: 20,
            paddingVertical: 40,
          }}
        >
          <FontAwesome5
            name={"times"}
            size={30}
            color={"red"}
            style={{
              position: "absolute",
              right: 20,
              top: 50,
              zIndex: 1,
            }}
            onPress={() => setShowDeliveryAddress(false)}
          />
          <View>
            <View
              style={{
                width: "100%",
                position: "relative",
                marginTop: 50,
              }}
            >
              <GooglePlacesAutocomplete
                placeholder="Enter Your Delivery Address"
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                styles={{
                  container: { flex: 0 },
                  textInput: {
                    fontSize: 16,
                    padding: 0,
                    backgroundColor: "#f2f1f2",
                  },
                  textInputContainer: {
                    // paddingHorizontal: 20,
                    paddingVertical: 10,
                  },
                }}
                onPress={(data, details = null) => {
                  setDeliveryAddress((prev) => ({
                    ...prev,
                    location: details.geometry.location,
                    description: data.description,
                  }));
                  getDeliveryDistance(details.geometry.location);
                  setShowDeliveryAddress(false);
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Payment Container */}
      <Modal visible={showPaymentCont}>
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5
            name={"times"}
            size={30}
            color={colors.primary}
            style={{
              position: "absolute",
              right: 20,
              top: 15,
              zIndex: 1,
            }}
            onPress={() => setShowPaymentCont(false)}
          />
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
                  value={total}
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

export default BasketCheckout;
