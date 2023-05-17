import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors, FONTS, fonts, SIZES } from "../../constants/theme";
import { containerDark } from "../../constants/layouts";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import axios from "axios";
import baseURL from "../../constants/baseURL";
import { useAuthContext } from "../../context/AuthContext";

const NotificationItem = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { title, desc, status } = data;
  const navigation = useNavigation();
  const { authUser } = useAuthContext();

  const onNext = async () => {
    setIsLoading(true);
    await axios
      .put(`${baseURL}/notifications/${data?._id}`, {
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        navigation.navigate("NotificationDetails", data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoading(false);
      });
  };
  return (
    <TouchableOpacity
      style={[
        containerDark,
        {
          backgroundColor: status === "unread" ? "#DBF9E5" : "white",
          padding: 15,
          marginVertical: 10,
        },
      ]}
      onPress={onNext}
    >
      <Spinner visible={isLoading} />
      <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.large }}>
        {title}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.small,
          textAlign: "justify",
          marginTop: 4,
          //   fontStyle: "italic",
        }}
      >
        {desc.substring(0, 50)}...
      </Text>
    </TouchableOpacity>
  );
};

export default NotificationItem;
