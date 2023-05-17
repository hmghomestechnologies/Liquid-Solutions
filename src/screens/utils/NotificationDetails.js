import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { SubHeader } from "../../components";
import { containerDark } from "../../../constants/layouts";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { useAuthContext } from "../../../context/AuthContext";

const NotificationDetails = () => {
  const route = useRoute();
  const data = route.params;
  const temp = data?.createdAt.split("T");
  return (
    <View style={{ margin: 20 }}>
      <View
        style={[containerDark, { paddingVertical: 20, paddingHorizontal: 25 }]}
      >
        <SubHeader text={data?.title} />
        <Text
          style={{
            textAlign: "justify",
            fontSize: SIZES.medium,
            lineHeight: 22,
            marginTop: 10,
          }}
        >
          {data?.desc}
        </Text>
        <Text
          style={{
            textAlign: "right",
            fontFamily: FONTS.bold,
            color: colors.secondary,
          }}
        >
          {temp[0]}
        </Text>
        <Text
          style={{
            textAlign: "right",
            textAlign: "right",
            fontFamily: FONTS.bold,
            color: colors.secondary,
          }}
        >
          {temp[1].substring(0, 8)}
        </Text>
      </View>
    </View>
  );
};

export default NotificationDetails;
