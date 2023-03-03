import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DateInput, DropDownInput, SecondDateInput } from "../../components";
import { SecBtn } from "../../components/Forms";
import { GOOGLE_MAPS_APIKEY } from "../../../constants/ApiKeys";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useCarContext } from "../../../context/CarContext";
import { CarMapContainer } from "../../components/car-components";
import Toast from "react-native-toast-message";

const CarSearchScreen = () => {
  const [activeSame, setActiveSame] = useState(true);
  const [activeDiff, setActiveDiff] = useState(false);
  const [showPickupLocation, setShowPickupLocation] = useState(false);
  const [showDropOffLocation, setShowDropOffLocation] = useState(false);
  const navigation = useNavigation();
  const {
    pickupLocation,
    setPickupLocation,
    pickupCity,
    setPickupCity,
    dropOff,
    setDropOff,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    availableCars,
  } = useCarContext();
  const onSameTab = () => {
    setActiveSame(true);
    setActiveDiff(false);
  };
  const onDiffTab = () => {
    setActiveSame(false);
    setActiveDiff(true);
  };

  const onSearchCar = () => {
    if (pickupDate === "Choose Date") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Pickup Date is required",
        text2: "Please Choose your Pick Up Date",
      });
    } else if (returnDate === "Choose Date") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Return Date is required",
        text2: "Please Choose your Return Date",
      });
    } else if (!pickupLocation?.location?.lng) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Pickup Address is Required",
        text2: "Please Enter your Pickup Address",
      });
    } else {
      const tempCars = availableCars?.filter((i) => i.rideCity === pickupCity);
      if (tempCars.length === 0) {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "No Cars Available in your location",
          text2: "Please Try Again with another Address",
        });
      } else {
        navigation.navigate("CarSearchResult");
      }
    }
  };

  return (
    <View>
      <View
        style={{
          width: "100%",
          backgroundColor: colors.secondary,
          backgroundColor: "red",
          height: 123,
          zIndex: 100,
        }}
      >
        {/* Header  tab*/}
        <View
          style={{
            width: "100%",
            backgroundColor: colors.secondary,
            paddingHorizontal: 20,
            borderTopColor: "#a3d4fe",
            borderTopWidth: 1,
            ...SHADOWS.dark,
            paddingTop: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Icon */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={27} color={"white"} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 5,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.medium,
                color: "white",
              }}
            >
              Car
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 23,
            }}
          >
            <TouchableOpacity
              style={activeSame ? styles.activeTab : styles.Tab}
              onPress={onSameTab}
            >
              <Text style={activeSame ? styles.actTabText : styles.TabText}>
                same drop-off
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={activeDiff ? styles.activeTab : styles.Tab}
              onPress={onDiffTab}
            >
              <Text style={activeDiff ? styles.actTabText : styles.TabText}>
                different drop-off
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <View style={{}}>
          {/* map Tab */}
          <View style={{ width: "100%", height: 300 }}>
            <CarMapContainer />
          </View>

          {/* Search Tab */}
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 15,
              flexDirection: "column",
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.gray,
                paddingVertical: 5,
                paddingHorizontal: 8,
                borderRadius: 10,
              }}
            >
              {/* Same Pickup, Same Drop off */}
              <View>
                {pickupLocation?.description ? (
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
                        {pickupLocation?.description}
                      </Text>
                    </View>
                    <View style={{ width: "10%" }}>
                      <FontAwesome
                        name={"times-circle"}
                        size={24}
                        color={"gray"}
                        onPress={() => {
                          setPickupLocation((prev) => ({
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
                      onPress={() => setShowPickupLocation(true)}
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
              </View>
              {/* Different Pickup and Drop off Loction */}
              {activeDiff && (
                <View>
                  {dropOff?.description ? (
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
                          {dropOff?.description}
                        </Text>
                      </View>
                      <View style={{ width: "10%" }}>
                        <FontAwesome
                          name={"times-circle"}
                          size={24}
                          color={"gray"}
                          onPress={() => {
                            setDropOff((prev) => ({
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
                        onPress={() => setShowDropOffLocation(true)}
                      >
                        <Text
                          style={{
                            fontFamily: FONTS.medium,
                            color: colors.secondary,
                            fontWeight: "600",
                            fontSize: SIZES.medium,
                          }}
                        >
                          Enter Your Drop Off Address
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
                </View>
              )}

              <View>
                <View style={{ marginVertical: 10 }}>
                  <DateInput
                    dateInput={pickupDate}
                    setDateInput={setPickupDate}
                    title={"Pickup Date"}
                    width={"100%"}
                  />
                </View>
                <View>
                  <SecondDateInput
                    dateInput={returnDate}
                    setDateInput={setReturnDate}
                    title={"Return Date"}
                    width={"100%"}
                  />
                </View>
              </View>
              <View>
                <SecBtn text={"Search Cars"} onBtnPress={onSearchCar} />
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: 150 }} />
      </ScrollView>
      {showPickupLocation && (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            position: "absolute",
            top: 120,
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
            onPress={() => setShowPickupLocation(false)}
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
                  const tempPickupCity = data.description.split(",");
                  const length = tempPickupCity.length - 2;
                  const pickup_city = tempPickupCity[length].replace(
                    /\s+/g,
                    ""
                  );
                  setPickupCity(pickup_city);
                  setPickupLocation((prev) => ({
                    ...prev,
                    location: details.geometry.location,
                    description: data.description,
                  }));
                  setShowPickupLocation(false);
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                  components: "country:ng",
                }}
              />
            </View>
          </View>
        </View>
      )}
      {showDropOffLocation && (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            position: "absolute",
            top: 120,
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
            onPress={() => setShowDropOffLocation(false)}
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
                placeholder="Enter Your Drop Off Location"
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
                  setDropOff((prev) => ({
                    ...prev,
                    location: details.geometry.location,
                    description: data.description,
                  }));
                  setShowDropOffLocation(false);
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                  components: "country:ng",
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CarSearchScreen;

const styles = StyleSheet.create({
  activeTab: {
    width: "50%",
    borderBottomColor: colors.darkPrimary,
    borderBottomWidth: 5,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
  },
  Tab: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
  },
  TabText: {
    textTransform: "uppercase",
    fontFamily: FONTS.medium,
    color: "white",
  },
  actTabText: {
    textTransform: "uppercase",
    fontFamily: FONTS.bold,
    color: colors.darkPrimary,
  },
});
