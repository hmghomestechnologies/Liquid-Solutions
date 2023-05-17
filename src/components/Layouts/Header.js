import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  FONTS,
  homeImg,
  SHADOWS,
  SIZES,
} from "../../../constants/theme";
import {
  Ionicons,
  Entypo,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../context/AuthContext";

const Header = ({ placeholder, active, notLength }) => {
  const { authUser } = useAuthContext();
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={{
        uri: "https://res.cloudinary.com/dc5ulgooc/image/upload/v1679726548/homeBg_ppyljx.jpg",
      }}
      style={{
        width: "100%",
        backgroundColor: colors.secondary,
        paddingTop: 40,
        // height: 250,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Image */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: authUser?.profileImg,
              }}
              style={{ height: 45, width: 45, borderRadius: 100 }}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "OpenSansBold",
                color: colors.primary,
                marginLeft: 8,
              }}
            >
              Hi, {authUser?.name}
            </Text>
          </View>
          {/* Icon */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={{ position: "relative" }}
          >
            {/* <Entypo
              name="dot-single"
              size={40}
              color="red"
              
            /> */}
            {notLength > 0 && (
              <Text
                style={{
                  position: "absolute",
                  right: -8,
                  top: 2,
                  zIndex: 1,
                  backgroundColor: colors.errorColor,
                  borderRadius: 999,
                  color: "white",
                  paddingVertical: 2,
                  paddingHorizontal: 5,
                }}
              >
                {notLength <= 99 ? notLength : "99+"}
              </Text>
            )}
            <Ionicons
              name="notifications-circle"
              size={40}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: colors.secondary,
            marginVertical: 15,
            fontFamily: FONTS.bold,
            fontStyle: "italic",
            fontSize: SIZES.medium,
          }}
        >
          Where do you want to stay today?
        </Text>
      </View>
      <View
        style={{
          height: 100,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 10,
              ...SHADOWS.dark,
            }}
            onPress={() => navigation.navigate("HotelSearchScreen")}
          >
            <Ionicons
              name="md-search-circle-sharp"
              size={30}
              color={colors.darkSecondary}
            />
            <Text style={{ color: "gray", marginLeft: 5 }}>{placeholder}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Icons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          marginVertical: 2,
        }}
      >
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("FlightSearchScreen")}
        >
          <MaterialIcons
            name="flight"
            size={30}
            color={active === "flight" ? colors.primary : "white"}
          />
          <Text
            style={[
              styles.text,
              { color: active === "flight" ? colors.primary : "white" },
            ]}
          >
            Flights
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("HotelSearchScreen")}
        >
          <FontAwesome5
            name="hotel"
            size={30}
            color={active === "hotel" ? "white" : "white"}
          />
          <Text
            style={[
              styles.text,
              { color: active === "hotel" ? "white" : "white" },
            ]}
          >
            Hotels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("CarSearchScreen")}
        >
          <AntDesign
            name="car"
            size={30}
            color={active === "car" ? colors.primary : "white"}
          />
          <Text
            style={[
              styles.text,
              { color: active === "car" ? colors.primary : "white" },
            ]}
          >
            Car Rental
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("TaxiSearchScreen")}
        >
          <FontAwesome
            name="taxi"
            size={30}
            color={active === "taxi" ? colors.primary : "white"}
          />
          <Text
            style={[
              styles.text,
              { color: active === "taxi" ? colors.primary : "white" },
            ]}
          >
            Taxi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("RestaurantHome")}
        >
          <Ionicons
            name="restaurant"
            size={30}
            color={active === "restaurants" ? "white" : "white"}
          />
          <Text
            style={[
              styles.text,
              { color: active === "restaurants" ? "white" : "white" },
            ]}
          >
            Restaurants
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Header;
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: "white",
    marginVertical: 5,
  },
});
