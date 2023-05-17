import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { GOOGLE_MAPS_APIKEY } from "../../../constants/ApiKeys";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { useTaxiContext } from "../../../context/TaxiContext";
import Toast from "react-native-toast-message";
import DateInput from "../DateInput";
import CheckBox from "../CheckBox";
import { SecBtn } from "../Forms";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../BackButton";
import TimeInput from "../TimeInput";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const NavigateCard = () => {
  const [citySelected, setCitySelected] = useState(false);
  const [showLocationCont, setShowLocationCont] = useState(false);

  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    pickupDate,
    setPickupDate,
    pickupTime,
    setPickupTime,
  } = useTaxiContext();

  const navigation = useNavigation();

  const onFindTaxi = () => {
    if (pickupDate === "Choose Date") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Pickup Date is required",
        text2: "Please Choose your Pick Up Date",
      });
    } else if (pickupDate === "PickUp Time") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Pickup Date is required",
        text2: "Please Choose your Pick Up Date",
      });
    } else if (!origin?.location?.lng || !destination?.location?.lng) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Destination is required",
        text2: "Please Enter your destination Address",
      });
    } else if (origin?.description === destination?.description) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Pickup and Destionation Location Can't be the same",
        text2: "Please Enter your destination Address",
      });
    } else {
      navigation.navigate("RideOptionsCard");
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        // paddingVertical: 50,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 25,
        paddingTop: 20,
      }}
    >
      <View style={{ width: "100%" }}>
        {citySelected ? (
          <View
            style={{
              width: "100%",
              position: "relative",
              marginVertical: 5,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name={"google-maps"}
              size={24}
              color={"red"}
              style={{
                position: "absolute",
                left: 10,
                top: 10,
                zIndex: 1,
              }}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: colors.darkPrimary,
                fontSize: SIZESZES.medium,
                width: "100%",
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderColor: colors.darkSecondary,
                borderWidth: 1,
                fontWeight: "600",
                paddingLeft: 40,
                borderRadius: 10,
                backgroundColor: "white",
              }}
            >
              {"city"}
            </Text>
            <FontAwesome
              name={"times-circle"}
              size={24}
              color={"gray"}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                zIndex: 1,
              }}
              onPress={() => {
                setCitySelected(false);
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              position: "relative",
              marginVertical: 5,
              //   flexDirection: "row",
              //   alignItems: "center",
              //   justifyContent: "space-between",
            }}
          >
            <Ionicons
              name={"md-search"}
              size={24}
              color={"gray"}
              style={{
                position: "absolute",
                left: 10,
                top: 10,
                zIndex: 1,
              }}
            />
            <TouchableOpacity
              style={{
                width: "100%",
                paddingHorizontal: 15,
                paddingVertical: 13,
                borderColor: colors.darkSecondary,
                borderWidth: 1,
                paddingLeft: 40,
                borderRadius: 10,
                backgroundColor: "white",
              }}
              onPress={() => setShowLocationCont(true)}
            >
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  color: colors.secondary,
                  fontWeight: "600",
                  fontSize: SIZES.medium,
                }}
              >
                Enter Your Pickup Address
              </Text>
            </TouchableOpacity>
            <FontAwesome
              name={"times-circle"}
              size={24}
              color={"gray"}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                zIndex: 1,
              }}
              // onPress={onBlur}
            />
          </View>
        )}
        {/* <GooglePlacesAutocomplete
          placeholder="Enter Your Pickup Location"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          styles={{
            container: { flex: 0 },
            textInput: {
              fontSize: 16,
              padding: 0,
              backgroundColor: "#f2f1f2",
            },
            textInputContainer: {
              // paddingHorizontal: 20,
              paddingVertical: 10,
            },
          }}
          onPress={(data, details = null) => {
            setOrigin((prev) => ({
              ...prev,
              location: details.geometry.location,
              description: data.description,
            }));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
            
          }}
        /> */}
        {/* <GooglePlacesAutocomplete
          placeholder="Destination Location"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          styles={{
            container: { flex: 0 },
            textInput: {
              fontSize: 16,
              padding: 0,
              backgroundColor: "#f2f1f2",
            },
            textInputContainer: {
              paddingVertical: 10,
            },
          }}
          onPress={(data, details = null) => {
            setDestination((prev) => ({
              ...prev,
              location: details.geometry.location,
              description: data.description,
            }));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
            
          }}
        /> */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <DateInput
            dateInput={pickupDate}
            setDateInput={setPickupDate}
            title={"Pickup Date"}
            width={"48%"}
          />
          <TimeInput
            timeInput={pickupTime}
            setTimeInput={setPickupTime}
            title={"Pickup Time"}
            width={"48%"}
          />
        </View>
      </View>
      {/* <View style={{ marginVertical: 15 }}>
        <Text
          style={{
            color: colors.secondary,
            fontFamily: FONTS.medium,
            marginBottom: 5,
          }}
        >
          Need a return taxi?
        </Text>
        <CheckBox
          label={"Yes"}
          activeChecked={onReturnYes}
          setActiveChecked={setOnReturnYes}
        />
        <CheckBox
          label={"No"}
          activeChecked={onReturnNo}
          setActiveChecked={setOnReturnNo}
        />
      </View> */}
      <View
        style={{
          width: "100%",
        }}
      >
        <SecBtn text={"Find Taxi"} onBtnPress={onFindTaxi} />
      </View>
      {showLocationCont && (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            position: "absolute",
            top: 0,
            paddingHorizontal: 20,
          }}
        >
          {/* <FontAwesome5
            name={"times"}
            size={30}
            color={"gray"}
            style={{
              position: "absolute",
              right: 20,
              top: 40,
              zIndex: 1,
            }}
            onPress={() => setShowLocationCont(false)}
          /> */}
          <View>
            <View
              style={{
                width: "100%",
                position: "relative",
                marginVertical: 5,
              }}
            >
              <Ionicons
                name={"md-search"}
                size={24}
                color={"gray"}
                style={{
                  position: "absolute",
                  left: 10,
                  top: 10,
                  zIndex: 1,
                }}
              />
              <TextInput
                // placeholder={"Destination"}
                // onChangeText={(text) => searchHotel(text)}
                // onFocus={openList}
                style={{
                  fontFamily: "OpenSansMedium",
                  color: colors.secondary,
                  width: "100%",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderColor: colors.darkSecondary,
                  borderWidth: 1,
                  fontWeight: "600",
                  paddingLeft: 40,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              />
              <FontAwesome
                name={"times-circle"}
                size={24}
                color={"gray"}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  zIndex: 1,
                }}
                // onPress={onBlur}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});
