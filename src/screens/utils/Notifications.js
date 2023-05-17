import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import baseURL from "../../../constants/baseURL";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import { NotificationItem, TransparentSpinner } from "../../components";

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId, config } = useAuthContext();
  const onMountFunction = async () => {
    setIsLoading(true);
    axios
      .get(`${baseURL}/notifications/${userId}`, config)
      .then(async (res) => {
        setNotifications(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setNotifications([]);
      });
  };
  useEffect(() => {
    onMountFunction();
  }, []);
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      onMountFunction();
    });
    return focusHandler;
  }, [navigation]);
  if (isLoading) return <TransparentSpinner />;
  return (
    <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <NotificationItem data={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 40, width: "100%" }} />}
      />
    </View>
  );
};

export default Notifications;
