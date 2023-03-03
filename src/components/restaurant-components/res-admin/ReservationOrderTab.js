import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors, FONTS } from "../../../../constants/theme";

const ReservationOrderTab = ({
  onReservations,
  setOnReservations,
  onOrders,
  setOnOrders,
  newTabText,
  prevTabText,
}) => {
  const onReservationsTab = () => {
    setOnReservations(true);
    setOnOrders(false);
  };
  const onOrdersTab = () => {
    setOnReservations(false);
    setOnOrders(true);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={onReservations ? styles.activeTab : styles.Tab}
        onPress={onReservationsTab}
      >
        <Text style={onReservations ? styles.actTabText : styles.TabText}>
          {newTabText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={onOrders ? styles.activeTab : styles.Tab}
        onPress={onOrdersTab}
      >
        <Text style={onOrders ? styles.actTabText : styles.TabText}>
          {prevTabText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReservationOrderTab;

const styles = StyleSheet.create({
  activeTab: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    marginTop: -1,
  },
  Tab: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
  },
  TabText: {
    textTransform: "uppercase",
    fontFamily: FONTS.medium,
    color: colors.secondary,
  },
  actTabText: {
    textTransform: "uppercase",
    fontFamily: FONTS.bold,
    color: "white",
  },
});
