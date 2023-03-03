import { TouchableOpacity, Text, Image, View } from "react-native";
import React from "react";
import { colors, SIZES } from "../../../constants/theme";
import { EvilIcons } from "@expo/vector-icons";

const TaxiTypeItem = ({ value, image, onPress, active }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        borderWidth: active ? 2 : 1,
        borderColor: active ? colors.darkPrimary : colors.secondary,
        marginVertical: 7,
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
      }}
      onPress={onPress}
    >
      <Image source={{ uri: image }} style={{ height: 40, width: 40 }} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{}}>{value}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <EvilIcons name="user" size={20} color="gray" />
          <Text style={{ color: "gray", fontSize: SIZES.small }}>4 seats</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaxiTypeItem;
