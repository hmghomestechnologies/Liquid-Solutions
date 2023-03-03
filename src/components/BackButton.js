import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../constants/theme";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderColor: colors.secondary,
        borderWidth: 1,
        position: "absolute",
        top: 15,
        left: 20,
        zIndex: 1000,
        borderRadius: 100,
        padding: 6,
      }}
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="left" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
};

export default BackButton;
