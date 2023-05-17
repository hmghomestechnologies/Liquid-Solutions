import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  FormatedNumber,
  ImageCont,
  ImageSlider,
  LineDivider,
  MapMarker,
  SearchResultHeader,
  SubHeader,
  TransparentSpinner,
} from "../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { OutlinedSecBtn, PrimaryBtn, SecBtn } from "../../components/Forms";
import { CarMapContainer } from "../../components/car-components";
import { useCarContext } from "../../../context/CarContext";
import { generateUniqueId, getWordDate } from "../../../constants/functions";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import Toast from "react-native-toast-message";
import { useWalletContext } from "../../../context/WalletContext";
import { v4 as uuidv4 } from "uuid";

const CarDetailsScreen = () => {
  const [calDays, setCalDays] = useState(null);
  const [carOwner, setCarOwner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentCont, setShowPaymentCont] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route?.params;
  const { authUser } = useAuthContext();
  const { walletBal, setTransactions } = useWalletContext();
  const {
    pickupLocation,
    dropOff,
    pickupDate,
    returnDate,
    setDropOff,
    setPickupLocation,
    setPickupDate,
    setReturnDate,
  } = useCarContext();
  console.log(dropOff);
  const {
    _id,
    carName,
    carColor,
    carDesc,
    carImage,
    carModel,
    plateNumber,
    plateNumberImg,
    pricePerDay,
    rideCity,
    rideState,
    userId,
  } = data;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const calDate = () => {
    const date1 = new Date(pickupDate);
    const date2 = new Date(returnDate);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setCalDays(diffDays);
  };
  const amount = pricePerDay * calDays;
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  useEffect(() => {
    (async () => {
      if (authUser) {
        const config = {
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        };
        await axios
          .get(`${baseURL}/user/user/${userId}`, config)
          .then((res) => {
            setCarOwner(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        return () => {
          setCarOwner({});
        };
      }
    })();
    calDate();
  }, [authUser]);
  const onPayWithCard = () => {
    setLoading(true);
    navigation.navigate("CarPaymentScreen", {
      data,
      amount,
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
      desc: "Payment for Renting Car",
      transactionId: transId,
      transactionRef: transRef,
      amount: amount,
      transType: "DEBIT",
      paymentMode: "WALLET",
      notDesc: `Your wallet have been Debit with sum of ${amount} with transactional ID ${transId} and reference ${transRef}. Payment for your Booking ${carColor}, ${carName} car.`,
      notTitle: "Alert!!!, Wallet Debited",
      notType: "Wallet",
    };
    let bookingData = {
      userId: authUser?._id,
      carId: _id,
      transactionId: transId,
      transactionRef: transRef,
      amount: amount.toFixed(0),
      days: calDays,
      pickupDate: pickupDate,
      returnDate: returnDate,
      pickupLat: pickupLocation?.location?.lat,
      pickupLng: pickupLocation?.location?.lng,
      pickupDesc: pickupLocation?.description,
      // destLat: dropOff?.location?.lat,
      // destLng: dropOff?.location?.lng,
      // destDesc: dropOff?.description,
      returntLat: dropOff?.location?.lat ? dropOff?.location?.lat : null,
      returntLng: dropOff?.location?.lng ? dropOff?.location?.lng : null,
      returntDesc: dropOff?.description ? dropOff?.description : "",
      isPaid: true,
      status: "BOOKED",
      carOwnerId: userId,
    };
    if (amount > walletBal) {
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
              .post(`${baseURL}/car/booking`, bookingData, config)
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
                  text1: "Something Went wrong",
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
            text1: "Something Went wrong",
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
  if (loading || !carOwner) return <TransparentSpinner />;
  return (
    <View style={{}}>
      <ScrollView style={{ marginTop: 20 }}>
        <View style={{ width: "100%", height: 250, paddingHorizontal: 30 }}>
          <ImageCont source={carImage} />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                marginVertical: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: SIZES.large,
                  color: colors.darkSecondary,
                }}
              >
                {carName}
              </Text>
              <Text style={{ color: "gray", fontSize: SIZES.small }}>
                or Similar Compact
              </Text>
            </View>
            {/* Pricing Tab */}
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <FormatedNumber
                value={pricePerDay}
                color={colors.darkPrimary}
                size={SIZES.large}
              />
              <Text style={{ color: "gray", fontSize: SIZES.small }}>
                Per day
              </Text>
            </View>
          </View>
          {/* Car Details */}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 2,
              }}
            >
              <Text style={styles.textTitle}>Model:</Text>
              <Text style={styles.textSub}>{carModel}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 2,
              }}
            >
              <Text style={styles.textTitle}>Color:</Text>
              <Text style={styles.textSub}>{carColor}</Text>
            </View>
          </View>
          {/* Pickup and Return Date */}
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <LineDivider />
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                justifyContent: "space-around",
              }}
            >
              <View style={{ paddingVertical: 5 }}>
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    color: colors.darkPrimary,
                  }}
                >
                  Pickup Date
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.small,
                    color: colors.primary,
                  }}
                >
                  {getWordDate(pickupDate)}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    color: colors.darkPrimary,
                  }}
                >
                  Return Date
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.small,
                    color: colors.primary,
                  }}
                >
                  {getWordDate(returnDate)}
                </Text>
              </View>
              <View style={{ paddingVertical: 5 }}>
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    color: colors.darkPrimary,
                  }}
                >
                  Days
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.small,
                    color: colors.primary,
                    paddingVertical: 2,
                  }}
                >
                  {`${calDays} Days`}
                </Text>
              </View>
            </View>
            <LineDivider />
          </View>
          {/* Pricing */}
          <View style={styles.miniCont}>
            <Text style={{}}>Price for {`${calDays} Days`}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FormatedNumber
                value={pricePerDay * calDays}
                color={colors.secondary}
                size={SIZES.extraLarge}
              />
            </View>
            <Text style={{ fontSize: SIZES.small, color: colors.gray }}>
              Includes tax and fees
            </Text>
          </View>
          <View style={{ marginVertical: 15 }}>
            <SubHeader text={"Description"} color={colors.secondary} />
            <View style={styles.miniCont}>
              <Text
                style={{
                  fontSize: SIZES.medium,
                  textAlign: "justify",
                  color: "gray",
                }}
              >
                {carDesc}
              </Text>
            </View>
            {/* <View style={{ marginTop: 5 }}>
              {carSpecs.map((e, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 3,
                  }}
                >
                  <AntDesign name="API" size={15} color={colors.secondary} />
                  <Text style={{ marginLeft: 5, color: "gray" }}>{e}</Text>
                </View>
              ))}
            </View> */}
          </View>
          {/* Car Owner Info */}
          <View style={styles.miniCont}>
            <SubHeader text={"Car Owner Details"} />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                // alignItems: "center",
              }}
            >
              <View>
                <View style={{ marginVertical: 2 }}>
                  <Text style={styles.textTitle}>Name:</Text>
                  <Text style={styles.textSub}>{carOwner?.name}</Text>
                </View>
                <View style={{ marginVertical: 2 }}>
                  <Text style={styles.textTitle}>Email:</Text>
                  <Text style={styles.textSub}>{carOwner?.email}</Text>
                </View>
                <View style={{ marginVertical: 2 }}>
                  <Text style={styles.textTitle}>Phone No:</Text>
                  <Text style={styles.textSub}>{carOwner?.phoneNumber}</Text>
                </View>
              </View>
              <View style={{ height: 120, width: 120, borderRadius: 999 }}>
                <ImageCont source={carOwner?.profileImg} />
              </View>
            </View>
          </View>
          {/* map Section */}
          <View
            style={[
              styles.miniCont,
              { width: "100%", height: 200, marginVertical: 10 },
            ]}
          >
            <View style={{ marginVertical: 8 }}>
              <MapMarker location={`${rideCity}, ${rideState}`} />
            </View>
            <CarMapContainer />
          </View>
          {/* Plate Number Details */}
          <View>
            <Text
              style={{
                fontSize: SIZES.medium,
                color: colors.darkPrimary,
                marginVertical: 5,
              }}
            >
              Plate Number: {plateNumber}
            </Text>
            <View style={{ height: 100, width: "100%" }}>
              <ImageCont source={plateNumberImg} />
            </View>
          </View>
        </View>
        <View style={{ height: 125, width: "100%" }} />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <SecBtn text={"Book"} onBtnPress={() => setShowPaymentCont(true)} />
      </View>
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
                  value={amount}
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

export default CarDetailsScreen;

const styles = StyleSheet.create({
  miniCont: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    ...SHADOWS.medium,
  },
  textTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: colors.darkSecondary,
  },
  textSub: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.small,
    color: "gray",
  },
});
