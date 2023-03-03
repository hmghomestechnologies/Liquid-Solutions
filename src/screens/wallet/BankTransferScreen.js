import { View, Text } from "react-native";
import React from "react";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { useRoute } from "@react-navigation/native";
import { FormatedNumber } from "../../components";

const BankTransferScreen = () => {
  const route = useRoute();
  const { amount } = route?.params;
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Text>Amount to be Funded</Text>
        <FormatedNumber
          value={amount}
          size={SIZES.extraLarge}
          color={colors.primary}
        />
      </View>
      <View
        style={{
          width: "80%",
          backgroundColor: "white",
          padding: 12,
          borderRadius: 10,
          marginVertical: 10,
          ...SHADOWS.medium,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONTS.bold,
            color: colors.secondary,
          }}
        >
          Wema Bank
        </Text>
        <Text
          style={{
            fontSize: SIZES.extraLarge,
            fontFamily: FONTS.extraBold,
            color: colors.darkPrimary,
            paddingVertical: 8,
          }}
        >
          059488545
        </Text>
        <Text
          style={{
            fontSize: SIZES.medium,
            fontFamily: FONTS.semiBold,
            color: colors.primary,
          }}
        >
          Triluxy Int'l Limited
        </Text>
      </View>
      <Text
        style={{
          textAlign: "justify",
          paddingHorizontal: 30,
          fontFamily: FONTS.medium,
          paddingVertical: 10,
        }}
      >
        Once you have send the Money, kindly send us email
        <Text
          style={{
            fontSize: SIZES.medium,
            fontFamily: FONTS.bold,
            color: colors.primary,
          }}
        >
          {" "}
          triluxylife@gmail.com
        </Text>{" "}
        including the amount transfered, name, triluxy registered Email and
        attached the payment reciept, After which we confirm your payment and
        Fund your Wallet.
      </Text>
    </View>
  );
};

export default BankTransferScreen;
