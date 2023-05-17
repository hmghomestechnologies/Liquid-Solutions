import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../../../context/AuthContext";
import { containerMedium } from "../../../constants/layouts";
import { FONTS, SIZES, colors } from "../../../constants/theme";
import { InputField, PrimaryBtn } from "../Forms";
import { useTaxiContext } from "../../../context/TaxiContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { cities } from "../../../constants/cities";
import { Picker } from "@react-native-picker/picker";
import { states } from "../../../constants/states";
import { SearchedHotel } from "../hotel-components";

const AddTaxiDetails = () => {
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [rideCity, setRideCity] = useState("");
  const [rideState, setRideState] = useState("");
  const [carDesc, setCarDesc] = useState("");
  const [carImage, setCarImage] = useState("");
  const [plateNumberImg, setplateNumberImg] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseImg, setLicenseImg] = useState("");
  const [onLoading, setOnLoading] = useState(false);
  const [citySelected, setCitySelected] = useState(false);
  const [showLocationCont, setShowLocationCont] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [focus, setFocus] = useState(false);

  const { config, userId } = useAuthContext();
  const { setDriver } = useTaxiContext();
  const searchRestaunts = async (text) => {
    setCityLoading(true);
    if (text.length > 1) {
      setCityLoading(false);
      const filtered = await cities.filter((i) =>
        i.toLowerCase().includes(text.toLowerCase())
      );
      await setFilteredCities(filtered);
      setCityLoading(false);
    }
  };
  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  const pickCarImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setOnLoading(true);
      const source = {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "carImage.jpg",
      };
      const data = new FormData();
      data.append("file", source);
      data.append("upload_preset", "triluxyapp");
      data.append("cloud_name", "dc5ulgooc");
      fetch("https://api.cloudinary.com/v1_1/dc5ulgooc/image/upload", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Image Uploaded Successfully",
            text2: "You can now Proceed",
          });
          setCarImage(data?.secure_url);
          setOnLoading(false);
        })
        .catch((err) => {
          setOnLoading(false);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error Occured, Couldn't Image",
            text2: "Please Try Again",
          });
          console.log(err);
        });
    }
  };
  const pickPlateNumberImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setOnLoading(true);
      const source = {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "carPlateNumberImage.jpg",
      };
      const data = new FormData();
      data.append("file", source);
      data.append("upload_preset", "triluxyapp");
      data.append("cloud_name", "dc5ulgooc");
      fetch("https://api.cloudinary.com/v1_1/dc5ulgooc/image/upload", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Image Uploaded Successfully",
            text2: "You can now Proceed",
          });
          setplateNumberImg(data?.secure_url);
          setOnLoading(false);
        })
        .catch((err) => {
          setOnLoading(false);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error Occured, Couldn't Image",
            text2: "Please Try Again",
          });
          console.log(err);
        });
    }
  };
  const pickLicenseImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setOnLoading(true);
      const source = {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "carPlateNumberImage.jpg",
      };
      const data = new FormData();
      data.append("file", source);
      data.append("upload_preset", "triluxyapp");
      data.append("cloud_name", "dc5ulgooc");
      fetch("https://api.cloudinary.com/v1_1/dc5ulgooc/image/upload", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "License Image Uploaded Successfully",
            text2: "You can now Proceed",
          });
          setLicenseImg(data?.secure_url);
          setOnLoading(false);
        })
        .catch((err) => {
          setOnLoading(false);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error Occured, Couldn't Image",
            text2: "Please Try Again",
          });
          console.log(err);
        });
    }
  };

  const onSubmitForm = async () => {
    setOnLoading(true);
    // Validation
    if (
      carName === "" ||
      carColor === "" ||
      carModel === "" ||
      carColor === "" ||
      rideCity === "" ||
      rideState === "" ||
      carDesc === "" ||
      plateNumber === "" ||
      plateNumberImg === "" ||
      carImage === "" ||
      licenseNumber === "" ||
      licenseImg === ""
    ) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Empty Fields",
        text2: "Please Fill all Fields",
      });
      setOnLoading(false);
    }
    // Get and Arrange Data
    let carDetails = {
      carName,
      carModel,
      carColor,
      plateNumber,
      plateNumberImg,
      carImage,
      licenseNumber,
      licenseImg,
      rideCity,
      rideState,
      carDesc,
      userId: userId,
    };
    // Save to db
    await axios
      .post(`${baseURL}/taxi/add-driver-details`, carDetails, config)
      .then((res) => {
        if (res.status == 201) {
          setDriver(res.data);
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Car Details Added Succesfully",
            text2: "You can now Manage Car Details",
          });
          setOnLoading(false);
          //   setTimeout(() => {
          //     navigation.navigate("ProfileScreen");
          //   }, 500);
        } else {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something Went wrong",
            text2: "Please Try Again",
          });
          setOnLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setOnLoading(false);
        if (error?.response?.data?.message === undefined) {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: `${error?.message}`,
            text2: "Please Try Again",
          });
        } else {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: `${error?.response?.data?.message}`,
            text2: "Please Try Again",
          });
        }
      });
  };
  return (
    <View>
      <ScrollView
        style={{ paddingHorizontal: 40, paddingVertical: 50, width: "100%" }}
        showsHorizontalScrollIndicator={false}
      >
        <Spinner visible={onLoading} />
        {/* Car Image */}
        <View
          style={{
            width: "100%",
            height: 250,
            marginVertical: 10,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={[
              containerMedium,
              {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // paddingVertical: 40,
                height: "100%",
              },
            ]}
            onPress={pickCarImage}
          >
            {carImage ? (
              <Image
                source={{ uri: carImage }}
                style={{ height: "100%", width: "80%" }}
              />
            ) : (
              <>
                <Ionicons name="images" size={80} color={colors.secondary} />
                <Text>Upload Car Image</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <InputField
          value={carName}
          placeholder="Enter Car Name"
          Icon={FontAwesome}
          iconName="car"
          setInput={setCarName}
        />
        <InputField
          value={carModel.toUpperCase().trimEnd()}
          placeholder="Enter Car Model"
          Icon={FontAwesome}
          iconName="opencart"
          setInput={setCarModel}
        />
        <InputField
          value={carColor}
          placeholder="Enter Car Color"
          Icon={Ionicons}
          iconName="color-filter-outline"
          setInput={setCarColor}
        />
        {/* State Picker */}
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: colors.darkSecondary,
            borderRadius: 10,
            marginVertical: 5,
            paddingHorizontal: 4,
          }}
        >
          <Picker
            selectedValue={rideState}
            style={{
              height: 50,
              width: "100%",
            }}
            onValueChange={(itemValue) => setRideState(itemValue)}
          >
            <Picker.Item label="Choose State" value="" />
            {states.map((item, index) => (
              <Picker.Item key={index} label={item.state} value={item.state} />
            ))}
          </Picker>
        </View>
        {/* Town  Input Container*/}
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
                fontSize: SIZES.medium,
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
              {rideCity}
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
                Enter City
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
              onPress={onBlur}
            />
          </View>
        )}
        <InputField
          value={carDesc}
          placeholder="Car Description"
          Icon={Ionicons}
          iconName="color-filter-outline"
          setInput={setCarDesc}
        />
        <InputField
          value={plateNumber.toUpperCase().trimEnd()}
          placeholder="Plate Number"
          Icon={Ionicons}
          iconName="color-filter-outline"
          setInput={setPlateNumber}
        />
        {/* Car Plate Number Images*/}
        <View
          style={{
            width: "100%",
            height: 120,
            marginVertical: 20,
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            style={[
              containerMedium,
              {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // paddingVertical: 40,
                height: "100%",
              },
            ]}
            onPress={pickPlateNumberImage}
          >
            {plateNumberImg ? (
              <Image
                source={{ uri: plateNumberImg }}
                style={{ height: "100%", width: "80%" }}
              />
            ) : (
              <>
                <Ionicons name="images" size={80} color={colors.secondary} />
                <Text>Upload Your Plate Number Photo</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <InputField
          value={licenseNumber.toUpperCase().trimEnd()}
          placeholder="License Number"
          Icon={Ionicons}
          iconName="color-filter-outline"
          setInput={setLicenseNumber}
        />
        {/* Car License Images*/}
        <View
          style={{
            width: "100%",
            height: 250,
            //   marginVertical: 20,
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            style={[
              containerMedium,
              {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // paddingVertical: 40,
                height: "100%",
              },
            ]}
            onPress={pickLicenseImage}
          >
            {licenseImg ? (
              <Image
                source={{ uri: licenseImg }}
                style={{ height: "100%", width: "80%" }}
              />
            ) : (
              <>
                <Ionicons name="images" size={80} color={colors.secondary} />
                <Text>Upload Your License Photo</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        {/* Submit Btn */}
        <PrimaryBtn text={"Add Car Details"} onBtnPress={onSubmitForm} />
        <View style={{ height: 80, width: "100%" }} />
      </ScrollView>
      {showLocationCont && (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            position: "absolute",
            top: 0,
            paddingVertical: 80,
            paddingHorizontal: 20,
          }}
        >
          <FontAwesome5
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
          />

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
                placeholder={"Enter City"}
                onChangeText={(text) => searchRestaunts(text)}
                onFocus={openList}
                style={{
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
                onPress={onBlur}
              />
            </View>
            {focus ? (
              <View>
                {cityLoading ? (
                  <Text
                    style={{
                      fontFamily: FONTS.extraBold,
                      fontStyle: "italic",
                      fontSize: SIZES.extraLarge,
                      color: colors.primary,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                    }}
                  >
                    Loading ...
                  </Text>
                ) : (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: 20 }}
                    // style={{ position: "absolute", width: "100%", top: 65 }}
                  >
                    {filteredCities.length > 0 ? (
                      <SearchedHotel
                        data={filteredCities}
                        setCity={setRideCity}
                        setCitySelected={setCitySelected}
                        setFocus={setFocus}
                        setShowContainer={setShowLocationCont}
                      />
                    ) : (
                      <Text>No Search City</Text>
                    )}
                    <View style={{ height: 30, width: "100%" }} />
                  </ScrollView>
                )}
              </View>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
};

export default AddTaxiDetails;
