import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, FONTS, SIZES } from "../../constants/theme";

export default function TransparentSpinner() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
        position: "absolute",
        bottom: 0,
        height: "100%",
        width: "100%",
        zIndex: 10000,
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          width: 120,
          borderRadius: 15,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 120,
        }}
      >
        <ActivityIndicator size={"large"} color={"white"} />
        <Text
          style={{
            color: "white",
            fontSize: SIZES.large,
            fontFamily: FONTS.bold,
            paddingVertical: 15,
          }}
        >
          Loading...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
