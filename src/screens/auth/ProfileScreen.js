import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";
import Footer from "../../components/Layouts/Footer";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { useAuthContext } from "../../../context/AuthContext";
import { TransparentSpinner } from "../../components";
import { MenuItem } from "../../components/auth-components";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay/lib";
import axios from "axios";
import baseURL from "../../../constants/baseURL";

const ProfileScreen = ({ navigation }) => {
  const [notLength, setNotLength] = useState(0);
  const { authUser, onLogout, userId, config } = useAuthContext();
  const onMountFunction = async () => {
    await axios
      .get(`${baseURL}/notifications/unread-counts/${userId}`, config)
      .then(async (res) => {
        setNotLength(res?.data);
      })
      .catch((err) => {
        console.log(err);
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
  return (
    <View style={{ height: "100%" }}>
      <ScrollView>
        {/* Header */}
        <View style={{ position: "relative", alignItems: "center" }}>
          <View
            style={{
              height: 150,
              width: "100%",
              backgroundColor: colors.secondary,
            }}
          />
          <View>
            <Image
              source={{ uri: authUser?.profileImg }}
              style={{
                height: 150,
                width: 150,
                marginTop: -70,
                borderRadius: 100,
                borderColor: "white",
                borderWidth: 6,
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                color: colors.darkPrimary,
                fontSize: SIZES.large,
                fontFamily: FONTS.bold,
              }}
            >
              {authUser?.name}
            </Text>
            <Text
              style={{
                color: colors.darkPrimary,
                fontSize: SIZES.medium,
                fontFamily: FONTS.semiBold,
              }}
            >
              {authUser?.email}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "90%",
            marginHorizontal: 17,
            paddingHorizontal: 15,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            borderColor: colors.darkGray,
            borderWidth: 1,
          }}
        >
          <View style={{ width: "100%" }}>
            <MenuItem
              Icon={FontAwesome}
              iconName={"user-circle"}
              text={"Manage Account"}
              path={"ManageAccount"}
            />
            {authUser?.userRole === "carRentor" && (
              <>
                <MenuItem
                  Icon={MaterialCommunityIcons}
                  iconName={"car"}
                  text={"Manage Car Details"}
                  path={"UserManageCars"}
                />
                <MenuItem
                  Icon={MaterialCommunityIcons}
                  iconName={"car-2-plus"}
                  text={"Add New Car"}
                  path={"AddCarDetails"}
                />
              </>
            )}
            {authUser?.userRole === "hotelAdmin" && (
              <>
                <MenuItem
                  Icon={FontAwesome5}
                  iconName={"hotel"}
                  text={"Manage Hotels Details"}
                  path={"ManageMyHotels"}
                />
                <MenuItem
                  Icon={Fontisto}
                  iconName={"hotel"}
                  text={"Add New Hotel Details"}
                  path={"AddHotelDetails"}
                />
              </>
            )}
            {authUser?.userRole === "taxiDriver" && (
              <>
                <MenuItem
                  Icon={FontAwesome}
                  iconName={"taxi"}
                  text={"Manage Your Taxi"}
                  path={"TaxiManageCar"}
                />
              </>
            )}
            {authUser?.userRole === "resAdmin" && (
              <>
                <MenuItem
                  Icon={MaterialCommunityIcons}
                  iconName={"food-takeout-box-outline"}
                  text={"Add Dish to Menu"}
                  path={"AddMenuItemScreen"}
                  params={"FOOD"}
                />
                <MenuItem
                  Icon={Ionicons}
                  iconName={"md-fast-food-outline"}
                  text={"Add Drink to Menu"}
                  path={"AddMenuItemScreen"}
                  params={"DRINK"}
                />
              </>
            )}
            {authUser?.userRole === "User" && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <MenuItem
                    Icon={Ionicons}
                    iconName={"notifications-outline"}
                    text={"Notifications"}
                    path={"Notifications"}
                  />

                  {notLength > 0 && (
                    <Text
                      style={{
                        backgroundColor: colors.errorColor,
                        borderRadius: 999,
                        color: "white",
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                      }}
                    >
                      {notLength}
                    </Text>
                  )}
                </View>
                <MenuItem
                  Icon={FontAwesome}
                  iconName={"shopping-basket"}
                  text={"Basket"}
                  path={"BasketScreen"}
                />
                <MenuItem
                  Icon={AntDesign}
                  iconName={"dingding-o"}
                  text={"PrivacyPolicy"}
                  path={"PrivacyPolicy"}
                />
                <MenuItem
                  Icon={AntDesign}
                  iconName={"API"}
                  text={"Terms & Conditions"}
                  path={"TermsAndConditions"}
                />
                <MenuItem
                  Icon={Ionicons}
                  iconName={"ios-settings"}
                  text={"Settings"}
                  path={"Settings"}
                />
              </>
            )}

            {/* Logout */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                marginVertical: 5,
              }}
              onPress={onLogout}
            >
              <View>
                <AntDesign name={"logout"} color={colors.secondary} size={28} />
              </View>
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: SIZES.medium,
                  color: colors.primary,
                  fontFamily: FONTS.semiBold,
                }}
              >
                {"Logout"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100, width: "100%" }} />
      </ScrollView>
      <Footer active={"profile"} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
