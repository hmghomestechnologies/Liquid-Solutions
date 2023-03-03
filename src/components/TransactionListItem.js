import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors, SHADOWS, SIZES } from "../../constants/theme";
import { getWordDate } from "../../constants/functions";
import FormatedNumber from "./FormatedNumber";

const TransactionListItem = ({ transaction }) => {
  const { amount, createdAt, desc, paymentMode, transType } = transaction;

  var dateArray = createdAt.split("T");
  var timeArray = dateArray[1].split(".");
  return (
    <View
      style={[
        styles.container,
        {
          borderColor:
            transType === "CREDIT" ? colors.successColor : colors.errorColor,
        },
      ]}
    >
      <View style={{ width: "70%" }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.subCont}>
            <Text style={styles.date}>Date:</Text>
            <Text style={styles.time}>{getWordDate(dateArray[0])}</Text>
          </View>
          <View style={styles.subCont}>
            <Text style={styles.date}>Time:</Text>
            <Text style={styles.time}>{timeArray[0]}</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            borderTopColor: colors.bgGray,
            borderTopWidth: 1,
            marginVertical: 3,
            paddingVertical: 3,
          }}
        >
          <Text>{desc}</Text>
        </View>
      </View>
      <View style={{}}>
        <FormatedNumber
          value={amount}
          color={
            transType === "CREDIT" ? colors.successColor : colors.errorColor
          }
          size={SIZES.large}
        />
      </View>
    </View>
  );
};

export default TransactionListItem;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 2,
    marginVertical: 10,
    ...SHADOWS.medium,
    borderLeftWidth: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subCont: {},
  date: {},
  time: {},
});
