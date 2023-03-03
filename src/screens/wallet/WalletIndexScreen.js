import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useWalletContext } from "../../../context/WalletContext";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import {
  FormatedNumber,
  TransactionListItem,
  TransparentSpinner,
} from "../../components";
import Footer from "../../components/Layouts/Footer";
import Toast from "react-native-toast-message";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { OutlinedSecBtn, PrimaryBtn, SecBtn } from "../../components/Forms";
import { useNavigation } from "@react-navigation/native";

const WalletIndexScreen = () => {
  const [loading, setLoading] = useState(false);
  const [showPaymentCont, setShowPaymentCont] = useState(false);
  const [amount, setAmount] = useState(0);
  const { walletBal, transactions } = useWalletContext();

  const navigation = useNavigation();
  const onPayWithCard = () => {
    setLoading(true);
    if (amount === 0) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Amount is required",
        text2: "Please, Enter Amount",
      });
      setLoading(false);
    } else {
      setLoading(false);
      setShowPaymentCont(false);
      setAmount(0);
      navigation.navigate("UseCardScreen", { amount });
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
  const onBankTransfer = () => {
    setLoading(true);
    if (amount === 0) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Amount is required",
        text2: "Please, Enter Amount",
      });
      setLoading(false);
    } else {
      setLoading(false);
      setShowPaymentCont(false);
      setAmount(0);
      navigation.navigate("BankTransferScreen", { amount });
    }
  };
  if (loading || transactions?.length === null) {
    return <TransparentSpinner />;
  }
  return (
    <SafeAreaView
      style={{ width: "100%", backgroundColor: "white", height: "100%" }}
    >
      <View
        style={{
          height: 200,
          width: "100%",
          backgroundColor: colors.secondary,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            width: Dimensions.get("screen").width,
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop: 30,
            paddingRight: 15,
          }}
        >
          <TouchableOpacity style={{}} onPress={() => setShowPaymentCont(true)}>
            <AntDesign name="plussquare" size={40} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontFamily: FONTS.semiBold,
              }}
            >
              add Fund
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          <Text
            style={{
              color: "white",
              fontSize: SIZES.small,
              textAlign: "center",
            }}
          >
            Wallet Balance
          </Text>
          <FormatedNumber value={walletBal} color="white" size={40} />
        </View>
      </View>
      {transactions.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={transactions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TransactionListItem transaction={item} />}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.large,
              }}
            >
              Transactions
            </Text>
          }
          style={{ marginHorizontal: 20, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 50, width: "100%" }} />}
        />
      ) : (
        <View>
          <Text
            style={{
              color: colors.primary,
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.large,
            }}
          >
            You Have No Previous Transactions, Please add Fund to get Started
          </Text>
        </View>
      )}

      <Footer active={"WalletIndexScreen"} />
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
              height: 450,
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
            <View style={{ width: "100%", paddingHorizontal: 40 }}>
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
                  Add Fund to your Wallet
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <FormatedNumber
                  value={amount}
                  size={SIZES.large}
                  color={colors.primary}
                />
              </View>
              <TextInput
                style={{
                  width: "100%",
                  borderColor: colors.bgGray,
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                  fontSize: SIZES.medium,
                  paddingVertical: 5,
                }}
                keyboardType="number-pad"
                placeholder="Amount"
                onChangeText={(text) => setAmount(text)}
              />
              <SecBtn text={"Use Card"} onBtnPress={onPayWithCard} />
              <PrimaryBtn text={"Use PayPal"} onBtnPress={onPayWithPaypal} />
              <OutlinedSecBtn
                text={"Use Bank Transfer"}
                onBtnPress={onBankTransfer}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 15,
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

export default WalletIndexScreen;
