import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  BackButton,
  CheckBox,
  DateInput,
  DropDownInput,
  SubHeader,
  TimeInput,
} from "../../components";
import { SecBtn } from "../../components/Forms";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "../../../constants/ApiKeys";
import MapContainer from "../../components/Layouts/MapContainer";
import Toast from "react-native-toast-message";
import { useTaxiContext } from "../../../context/TaxiContext";

const TaxiSearchScreen = () => {
  const navigation = useNavigation();
  const [citySelected, setCitySelected] = useState(false);
  const [showLocationCont, setShowLocationCont] = useState(false);
  const [showDestinationLocationCont, setShowDestinationLocationCont] =
    useState(false);
  const {
    availableDrivers,
    origin,
    setOrigin,
    destination,
    setDestination,
    pickupDate,
    setPickupDate,
    pickupTime,
    setPickupTime,
    rideCity,
    setRideCity,
  } = useTaxiContext();

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
      const tempDrivers = availableDrivers?.filter(
        (i) => i.rideCity === rideCity
      );
      if (tempDrivers?.length === 0) {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "No Drivers Available in your location",
          text2: "Please Try Again with another Address",
        });
      } else {
        navigation.navigate("ChooseRide");
      }
    }
  };

  return (
    <SafeAreaView
      // showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "white", width: "100%", height: "100%" }}
    >
      <View style={{}}>
        {/* map Tab */}
        <View style={{ width: "100%", height: "50%" }}>
          <MapContainer />
        </View>
        <View style={{ width: "100%", height: "50%" }}>
          <View
            style={{ width: "100%", paddingHorizontal: 20, paddingTop: 20 }}
          >
            {origin?.description ? (
              <View
                style={{
                  width: "100%",
                  position: "relative",
                  marginVertical: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderColor: colors.darkSecondary,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingVertical: 10,
                }}
              >
                <View style={{ width: "10%" }}>
                  <MaterialCommunityIcons
                    name={"google-maps"}
                    size={24}
                    color={"red"}
                  />
                </View>
                <View style={{ width: "80%" }}>
                  <Text
                    style={{
                      marginHorizontal: 2,
                    }}
                  >
                    {origin?.description}
                  </Text>
                </View>
                <View style={{ width: "10%" }}>
                  <FontAwesome
                    name={"times-circle"}
                    size={24}
                    color={"gray"}
                    onPress={() => {
                      setOrigin((prev) => ({
                        ...prev,
                        location: null,
                        description: null,
                      }));
                    }}
                  />
                </View>
              </View>
            ) : (
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
                  }}
                />
              </View>
            )}
            {destination?.description ? (
              <View
                style={{
                  width: "100%",
                  position: "relative",
                  marginVertical: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderColor: colors.darkSecondary,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingVertical: 10,
                }}
              >
                <View style={{ width: "10%" }}>
                  <MaterialCommunityIcons
                    name={"google-maps"}
                    size={24}
                    color={"red"}
                  />
                </View>
                <View style={{ width: "80%" }}>
                  <Text
                    style={{
                      marginHorizontal: 2,
                    }}
                  >
                    {destination?.description}
                  </Text>
                </View>
                <View style={{ width: "10%" }}>
                  <FontAwesome
                    name={"times-circle"}
                    size={24}
                    color={"gray"}
                    onPress={() => {
                      setDestination((prev) => ({
                        ...prev,
                        location: null,
                        description: null,
                      }));
                    }}
                  />
                </View>
              </View>
            ) : (
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
                  onPress={() => setShowDestinationLocationCont(true)}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      color: colors.secondary,
                      fontWeight: "600",
                      fontSize: SIZES.medium,
                    }}
                  >
                    Enter Your Destination Address
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
              paddingHorizontal: 20,
            }}
          >
            <SecBtn text={"Find Taxi"} onBtnPress={onFindTaxi} />
          </View>
        </View>
      </View>
      {showLocationCont && (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            position: "absolute",
            top: 30,
            paddingHorizontal: 20,
          }}
        >
          <FontAwesome5
            name={"times"}
            size={30}
            color={"red"}
            style={{
              position: "absolute",
              right: 20,
              top: 15,
              zIndex: 1,
            }}
            onPress={() => setShowLocationCont(false)}
          />
          <View>
            <View
              style={{
                width: "100%",
                position: "relative",
                marginTop: 50,
              }}
            >
              <GooglePlacesAutocomplete
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
                  const tempRideCity = data.description.split(",");
                  const length = tempRideCity.length - 2;
                  const ride_city = tempRideCity[length].replace(/\s+/g, "");
                  setRideCity(ride_city);
                  setOrigin((prev) => ({
                    ...prev,
                    location: details.geometry.location,
                    description: data.description,
                  }));
                  setShowLocationCont(false);
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                }}
              />
            </View>
          </View>
        </View>
      )}
      {showDestinationLocationCont && (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            position: "absolute",
            top: 30,
            paddingHorizontal: 20,
          }}
        >
          <FontAwesome5
            name={"times"}
            size={30}
            color={"red"}
            style={{
              position: "absolute",
              right: 20,
              top: 15,
              zIndex: 1,
            }}
            onPress={() => setShowDestinationLocationCont(false)}
          />
          <View>
            <View
              style={{
                width: "100%",
                position: "relative",
                marginTop: 50,
              }}
            >
              <GooglePlacesAutocomplete
                placeholder="Enter Your Destination Location"
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
                  setDestination((prev) => ({
                    ...prev,
                    location: details.geometry.location,
                    description: data.description,
                  }));
                  setShowDestinationLocationCont(false);
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                }}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TaxiSearchScreen;
