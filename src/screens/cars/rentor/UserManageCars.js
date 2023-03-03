import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../../constants/baseURL";
import Spinner from "react-native-loading-spinner-overlay";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { NoResult } from "../../../components";
import { containerMedium } from "../../../../constants/layouts";
import { S3Image } from "aws-amplify-react-native";
import { useNavigation } from "@react-navigation/native";

const UserManageCars = () => {
  const [cars, setCars] = useState(null);
  const [onLoading, setOnLoading] = useState(true);
  const { userId, config } = useAuthContext();
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get(`${baseURL}/car/user-cars/${userId}`, config)
      .then((res) => {
        setCars(res.data);
        console.log(res.data);
        setOnLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setCars([]);
      setOnLoading(false);
    };
  }, []);
  function renderCar(item) {
    return (
      <TouchableOpacity
        key={item._id}
        style={[
          containerMedium,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 15,
          },
        ]}
        onPress={() => navigation.navigate("RentorCarDetails", { data: item })}
      >
        <S3Image
          imgKey={item.carImage}
          style={{
            height: 80,
            width: 80,
            borderRadius: 20,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: SIZES.small,
              fontFamily: FONTS.bold,
              marginVertical: 3,
              color: colors.primary,
            }}
          >
            Name:{item.carName}
          </Text>
          <Text
            style={{
              fontSize: SIZES.small,
              fontFamily: FONTS.bold,
              marginVertical: 3,
              color: colors.primary,
            }}
          >
            Model:{item.carModel}
          </Text>
          <Text
            style={{
              fontSize: SIZES.small,
              fontFamily: FONTS.bold,
              marginVertical: 3,
              color: colors.primary,
            }}
          >
            Plate No.:{item.plateNumber}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        paddingHorizontal: 30,
      }}
    >
      <Spinner visible={onLoading} />
      {cars?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cars}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderCar(item)}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.large,
              }}
            >
              Your Car(s)
            </Text>
          }
          style={{ marginHorizontal: 10, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 100, width: "100%" }} />}
        />
      ) : (
        <NoResult text={`${"You Have No Car Added"}`} />
      )}
    </View>
  );
};

export default UserManageCars;
