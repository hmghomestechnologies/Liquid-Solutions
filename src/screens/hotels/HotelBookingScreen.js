import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useHotelContext } from "../../../context/HotelContext";
import {
  FormatedNumber,
  ImageCont,
  LineDivider,
  MapMarker,
  SearchResultHeader,
  Spinner,
  TransparentSpinner,
} from "../../components";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { generateUniqueId, getWordDate } from "../../../constants/functions";
import {
  LoadingBtn,
  OutlinedSecBtn,
  PrimaryBtn,
  SecBtn,
} from "../../components/Forms";
import { useAuthContext } from "../../../context/AuthContext";
import { useWalletContext } from "../../../context/WalletContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";

const HotelBookingScreen = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentCont, setShowPaymentCont] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const { authUser } = useAuthContext();
  const { walletBal, setTransactions } = useWalletContext();
  const { hotels } = useHotelContext();

  const { searchedData, category, calDays } = route?.params;
  const getHotel = async () => {
    if (category || hotels) {
      const tempHotels = await hotels?.filter((i) => i._id === category.hotel);
      await setHotel(tempHotels[0]);
    }
  };
  useEffect(() => {
    getHotel();
  }, []);
  const totalPrice =
    category?.discountedPrice === 0
      ? category?.price * calDays
      : category?.discountedPrice * calDays;
  let reservationData = {
    userId: authUser?._id,
    userEmail: authUser?.email,
    hotelId: category?.hotel,
    hotelAdminId: hotel?.user,
    categoryId: category?._id,
    transId: generateUniqueId(),
    nights: calDays,
    amount: totalPrice,
    checkInDate: searchedData?.checkInDate,
    checkOutDate: searchedData?.checkOutDate,
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
    navigation.navigate("HotelPaymentScreen", {
      reservationData,
      searchedData,
      category,
      calDays,
    });
    setLoading(false);
    setShowPaymentCont(false);
  };
  const onPayWithWallet = async () => {
    setLoading(true);
    const transId = generateUniqueId();
    const transRef = generateUniqueId() + "-REF";
    let payData = {
      userId: authUser?._id,
      desc: `Payment for your Booking at ${hotel?.hotelName} hotel`,
      transactionId: transId,
      transactionRef: transRef,
      amount: totalPrice,
      transType: "DEBIT",
      paymentMode: "WALLET",
      notDesc: `Your wallet have been Debit with sum of ${totalPrice} with transactional ID ${transId} and reference ${transRef}. Payment for your Booking at ${hotel?.hotelName} hotel`,
      notTitle: "Alert!!!, Wallet Debited",
      notType: "Wallet",
    };
    if (totalPrice > walletBal) {
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
              .post(`${baseURL}/hotel/reservations`, reservationData, config)
              .then((res) => {
                if (res.status == 201) {
                  Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Hotel Booked Succesfully",
                    text2: "You can confirm your reservation",
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
                console.log(error);
                Toast.show({
                  topOffset: 60,
                  type: "error",
                  text1: "Something Went wrong while reserving your Hotel",
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
            text1: "Something Went wrong while Making Payment",
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
  if (loading || !hotel) return <TransparentSpinner />;
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ScrollView
        style={{
          width: "90%",
          marginHorizontal: 18,
          marginVertical: 20,
          //   borderColor: colors.secondary,
          //   borderWidth: 1,
          ...SHADOWS.medium,
          borderRadius: 10,
          backgroundColor: "white",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{}}>
          {/* <View style={{ height: 180 }}>
            <ImageCont source={hotel?.fImg} />
          </View> */}
          <View
            style={{
              width: "100%",
              paddingVertical: 15,
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.bold,
                fontSize: SIZES.large,
              }}
            >
              {hotel?.hotelName}
            </Text>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              <MapMarker
                location={`${hotel?.address}, ${hotel?.town}, ${hotel?.state} State, Nigeria.`}
              />
            </View>
            {/* Check In, Check Out, Selected Cat. */}
            <View style={{ marginVertical: 10 }}>
              <LineDivider />
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={{ paddingVertical: 5 }}>
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      color: colors.darkPrimary,
                    }}
                  >
                    Check In
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.bold,
                      fontSize: SIZES.small,
                      color: colors.primary,
                    }}
                  >
                    {getWordDate(searchedData?.checkInDate)}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 40,
                    borderLeftColor: colors.bgGray,
                    borderLeftWidth: 1,
                    paddingLeft: 15,
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      color: colors.darkPrimary,
                    }}
                  >
                    Check Out
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.bold,
                      fontSize: SIZES.small,
                      color: colors.primary,
                    }}
                  >
                    {getWordDate(searchedData?.checkOutDate)}
                  </Text>
                </View>
              </View>
              <LineDivider />
              <View style={{ marginTop: 5, paddingTop: 10 }}>
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    color: colors.darkPrimary,
                  }}
                >
                  You Selected
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    fontSize: SIZES.large,
                    color: colors.darkSecondary,
                    paddingVertical: 2,
                  }}
                >
                  {`${category?.categoryName}`}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.small,
                    color: colors.primary,
                    paddingVertical: 2,
                  }}
                >
                  {`${calDays} Nights, ${searchedData?.room} Rooms.`}
                </Text>
              </View>
            </View>

            {/*  */}
            <LineDivider />
            <View style={{ paddingVertical: 8 }}>
              <View style={styles.cont}>
                <Text style={styles.title}>Original Price</Text>
                <FormatedNumber
                  value={category?.price * calDays}
                  color="gray"
                  isStrike={category?.discountedPrice === 0 ? false : true}
                />
              </View>
              <View style={styles.cont}>
                <Text style={styles.title}>Discounted Price</Text>
                <FormatedNumber
                  value={category?.discountedPrice}
                  color="gray"
                />
              </View>
              {/* <View style={styles.cont}>
                <Text style={styles.title}>Total Payable</Text>
                <FormatedNumber
                  value={category?.price * calDays}
                  color="gray"
                />
              </View> */}
            </View>
            <LineDivider />
            <View style={{ marginVertical: 0 }}>
              <View style={[styles.cont, {}]}>
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.large,
                    color: colors.darkPrimary,
                  }}
                >
                  Total
                </Text>
                <View>
                  <FormatedNumber
                    value={
                      category?.discountedPrice === 0
                        ? category?.price * calDays
                        : category?.discountedPrice * calDays
                    }
                    color={colors.primary}
                    size={SIZES.extraLarge}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: FONTS.semiBold,
                      color: "gray",
                    }}
                  >
                    Includes Taxes and Fees
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 18 }}>
          <SecBtn
            text={"Book Now"}
            onBtnPress={() => setShowPaymentCont(true)}
          />
        </View>
      </ScrollView>
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
                  value={totalPrice}
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
    </View>
  );
};

export default HotelBookingScreen;

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  title: {},
  text: {},
});
