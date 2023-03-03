import { View, Text } from "react-native";
import React from "react";
import { colors, SIZES } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { SecBtn } from "./Forms";

const NoResult = ({ text }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: "100%",
        marginHorizontal: 40,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Entypo name="emoji-sad" size={40} color="red" />
      <Text
        style={{
          marginVertical: 20,
          color: colors.darkPrimary,
          fontSize: SIZES.medium,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
      <View style={{ width: "100%" }}>
        <SecBtn onBtnPress={() => navigation.goBack()} text={"Go Back"} />
      </View>
    </View>
  );
};

export default NoResult;
