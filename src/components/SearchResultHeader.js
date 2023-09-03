import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { colors, FONTS, SHADOWS, SIZES } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const SearchResultHeader = ({ head, body }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderTopColor: "#a3d4fe",
        borderTopWidth: 1,
        ...SHADOWS.dark,
        marginTop: 18,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Icon */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={27} color={"white"} />
        </TouchableOpacity>

        <View
          style={{
            marginLeft: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: SIZES.medium,
              fontFamily: FONTS.semiBold,
            }}
          >
            {head}
          </Text>
          <Text style={{ color: "white", fontWeight: "500" }}>{body}</Text>
        </View>
      </View>
      <View>
        {/* <Ionicons name="share-outline" size={24} color="white" /> */}
        {/* <Text style={{ fontSize: 10, textAlign: "center", color: "white" }}>
          Share
        </Text> */}
      </View>
    </View>
  );
};

export default SearchResultHeader;
