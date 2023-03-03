import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors, FONTS } from "../../constants/theme";

const NewPreviousTab = ({
  onNew,
  setOnNew,
  onPrevious,
  setOnPrevious,
  newTabText,
  prevTabText,
}) => {
  const onNewTab = () => {
    setOnNew(true);
    setOnPrevious(false);
  };
  const onPreviousTab = () => {
    setOnNew(false);
    setOnPrevious(true);
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
        style={onNew ? styles.activeTab : styles.Tab}
        onPress={onNewTab}
      >
        <Text style={onNew ? styles.actTabText : styles.TabText}>
          {newTabText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={onPrevious ? styles.activeTab : styles.Tab}
        onPress={onPreviousTab}
      >
        <Text style={onPrevious ? styles.actTabText : styles.TabText}>
          {prevTabText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPreviousTab;

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
