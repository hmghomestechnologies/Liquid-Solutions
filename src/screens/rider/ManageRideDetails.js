import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  FormatedNumber,
  LineDivider,
  MapMarker,
  SubHeader,
  TransparentSpinner,
} from "../../components";
import { PrimaryBtn, SecBtn } from "../../components/Forms";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { containerLight } from "../../../constants/layouts";
import { getWordDate } from "../../../constants/functions";
import { BasketItem } from "../../components/restaurant-components";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";

const ManageRideDetails = () => {
  const [user, setUser] = useState(null);
  const route = useRoute();
  const { data, restaurant } = route?.params;
  const navigation = useNavigation();
  const { address, fImg, state, town, restaurantName } = restaurant;
  const {
    userId,
    amount,
    deliveryAddress,
    orderedItems,
    status,
    paymentMode,
    transactionId,
    transactionRef,
  } = data;
  const { authUser } = useAuthContext();
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  useEffect(() => {
    if (data) {
      axios
        .get(`${baseURL}/user/user/${userId}`, config)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return () => {
        setUser({});
      };
    }
  }, []);
  if (!data || !restaurant || !user) return <TransparentSpinner />;
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
          height: "100%",
          width: "100%",
          paddingHorizontal: 30,
        }}
      >
        {/* User Details */}
        <View
          style={[
            containerLight,

            {
              paddingVertical: 10,
              paddingHorizontal: 20,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.medium,
              color: colors.primary,
              paddingVertical: 10,
            }}
          >
            User's <AntDesign name="user" size={24} color={colors.secondary} />{" "}
            Details
          </Text>
          <LineDivider />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              // alignItems: "center",
            }}
          >
            <View>
              <View style={{ marginVertical: 2 }}>
                <Text style={styles.textTitle}>Name:</Text>
                <Text style={styles.textSub}>{user?.name}</Text>
              </View>
              <View style={{ marginVertical: 2 }}>
                <Text style={styles.textTitle}>Email:</Text>
                <Text style={styles.textSub}>{user?.email}</Text>
              </View>
              <View style={{ marginVertical: 2 }}>
                <Text style={styles.textTitle}>Phone No:</Text>
                <Text style={styles.textSub}>{user?.phoneNumber}</Text>
              </View>
            </View>
            <Image
              source={{ uri: user?.profileImg }}
              style={{ height: 120, width: 120, borderRadius: 999 }}
            />
          </View>
        </View>
        {/* Restaurant Details */}
        <View
          style={[
            containerLight,
            {
              paddingVertical: 10,
              paddingHorizontal: 20,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.medium,
              color: colors.primary,
              paddingVertical: 10,
            }}
          >
            Restaurant{" "}
            <Ionicons
              name="restaurant-outline"
              size={24}
              color={colors.secondary}
            />{" "}
            Details
          </Text>
          <LineDivider />
          <Image
            source={{ uri: fImg }}
            style={{
              height: 120,
              width: 120,
              borderRadius: 50,
              marginVertical: 10,
            }}
          />
          <SubHeader text={restaurantName} color={colors.primary} />
          <MapMarker location={`${address}, ${town}, ${state}.`} />
          <PrimaryBtn
            text={"More Info"}
            onBtnPress={() =>
              navigation.navigate("SingleRestaurant", { data: restaurant })
            }
          />
        </View>
        {/* Booking Details */}
        <View style={containerLight}>
          <SubHeader text={"Delivery Details"} />
          <LineDivider />
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: SIZES.medium,
                fontFamily: FONTS.medium,
                color: colors.primary,
                paddingVertical: 10,
              }}
            >
              Ordered Items
            </Text>
          </View>
          {/* Delivery Status */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                paddingVertical: 5,
                paddingHorizontal: 8,
                color: colors.primary,
                fontFamily: FONTS.bold,
              }}
            >
              Delivery Status
            </Text>
            <Text
              style={{
                paddingVertical: 5,
                paddingHorizontal: 8,
                backgroundColor:
                  status === "COMPLETED"
                    ? colors.successColor
                    : colors.secondary,
                borderRadius: 10,
                color: "white",
                fontFamily: FONTS.bold,
              }}
            >
              {status === "COMPLETED" ? "DELIVERED & RECIEVED" : status}
            </Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SubHeader text={"Delivery Fee"} color={colors.darkPrimary} />
              <FormatedNumber
                value={deliveryAddress.deliveryFee}
                size={SIZES.medium}
                color={colors.primary}
              />
            </View>
          </View>
          <View style={{ paddingBottom: 5 }}>
            <SubHeader text={"Delivery Address"} color={colors.darkPrimary} />
            <MapMarker location={`${deliveryAddress?.description}`} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ManageRideDetails;
const styles = StyleSheet.create({});
