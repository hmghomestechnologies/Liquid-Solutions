import { View, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { Storage } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../context/AuthContext";
import { containerMedium } from "../../../constants/layouts";
import { colors } from "../../../constants/theme";
import { InputField, PrimaryBtn } from "../Forms";
import { useTaxiContext } from "../../../context/TaxiContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";

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

  const { config, userId } = useAuthContext();
  const { setDriver } = useTaxiContext();
  const navigation = useNavigation();

  const pickCarImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setCarImage(result.uri);
    } else {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something Went wrong, While uploading Car Image",
        text2: "Please Try Again",
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
    if (!result.cancelled) {
      setplateNumberImg(result.uri);
    } else {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something Went wrong, While uploading Car Plate Number",
        text2: "Please Try Again",
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
    if (!result.cancelled) {
      setLicenseImg(result.uri);
    } else {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something Went wrong, While uploading your License Photo",
        text2: "Please Try Again",
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
    // Upload Images
    carDetails.carImage = await uploadCarImage(carImage);
    carDetails.plateNumberImg = await uploadPlateNumberImage(plateNumberImg);
    carDetails.licenseImg = await uploadLicenseImg(licenseImg);
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
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something Went wrong",
          text2: "Please Try Again",
        });
        setOnLoading(false);
      });
  };
  // Car Image Upload Function

  const uploadCarImage = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png", // contentType is optional
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  };

  // Plate Number Image Upload Function
  const uploadPlateNumberImage = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png", // contentType is optional
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  };
  const uploadLicenseImg = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png", // contentType is optional
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  };
  return (
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
        value={carModel}
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
      <InputField
        value={rideCity}
        placeholder="Residence City"
        Icon={Ionicons}
        iconName="color-filter-outline"
        setInput={setRideCity}
      />
      <InputField
        value={rideState}
        placeholder="Residence State"
        Icon={Ionicons}
        iconName="color-filter-outline"
        setInput={setRideState}
      />
      <InputField
        value={carDesc}
        placeholder="Car Description"
        Icon={Ionicons}
        iconName="color-filter-outline"
        setInput={setCarDesc}
      />
      <InputField
        value={plateNumber}
        placeholder="Plate Number"
        Icon={Ionicons}
        iconName="color-filter-outline"
        setInput={setPlateNumber}
      />
      {/* Car Plate Number Images*/}
      <View
        style={{
          width: "100%",
          height: 250,
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
        value={licenseNumber}
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
  );
};

export default AddTaxiDetails;
