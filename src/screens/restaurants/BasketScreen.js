import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRestaurantContext } from "../../../context/RestaurantContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { BasketItem } from "../../components/restaurant-components";
import { FormatedNumber, TransparentSpinner } from "../../components";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { OutlinedSecBtn, PrimaryBtn, SecBtn } from "../../components/Forms";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { GOOGLE_MAPS_APIKEY } from "../../../constants/ApiKeys";
import { useWalletContext } from "../../../context/WalletContext";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";

const BasketScreen = () => {
  const [currentBasket, setCurrentBasket] = useState([]);
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
  const { authUser } = useAuthContext();
  const { basket, setBasket } = useRestaurantContext();
  const { walletBal, setTransactions } = useWalletContext();
  const { restaurantId, userId, restaurantName } = route?.params;

  useEffect(() => {
    if (restaurantId) {
      const tempBasket = basket.filter(
        (item) => item.restaurantId === restaurantId
      );
      setCurrentBasket(tempBasket);
    }
  }, [restaurantId]);

  const sumTotal = () => {
    let cal_Total = 0;
    basket.forEach((number) => {
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
    const transId = uuidv4();
    const transRef = "TRX" + uuidv4() + "REF";
    let payData = {
      userId: authUser?._id,
      desc: `Payment for Odering Dish from ${restaurantName}`,
      transactionId: transId,
      transactionRef: transRef,
      amount: sumTotal(),
      transType: "DEBIT",
      paymentMode: "WALLET",
    };
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
    if (!deliveryAddress?.location?.lng || !deliveryAddress?.description) {
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
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        // paddingHorizontal: 25,
        // paddingVertical: 30,
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
        {currentBasket.length > 0 ? (
          <View style={{}}>
            <FlatList
              data={currentBasket}
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
          </View>
        ) : (
          <View>
            <Text>No Item in Your Basket </Text>
          </View>
        )}
        {currentBasket.length > 0 && (
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
            <SecBtn
              text={"Proceed to Checkout"}
              onBtnPress={() => setShowPaymentCont(true)}
            />
          </View>
        )}
      </View>
      {/* Delivery Address Container */}
      {showDeliveryAddress && (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            position: "absolute",
            top: 0,
            paddingHorizontal: 20,
            borderWidth: 2,
            borderColor: colors.darkGray,
            ...SHADOWS.dark,
          }}
        >
          <FontAwesome5
            name={"times"}
            size={30}
            color={"red"}
            style={{
              position: "absolute",
              right: 20,
              top: 15,
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
                  setShowDeliveryAddress(false);
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                  components: "country:ng",
                }}
              />
            </View>
          </View>
        </View>
      )}

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
              bottom: 50,
              left: "48%",
            }}
            onPress={() => setShowPaymentCont(false)}
          >
            <FontAwesome name="times-circle-o" size={40} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BasketScreen;
