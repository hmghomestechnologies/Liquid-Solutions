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
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { InputField, PrimaryBtn } from "../../../components/Forms";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { containerMedium } from "../../../../constants/layouts";
import axios from "axios";
import { useAuthContext } from "../../../../context/AuthContext";
import baseURL from "../../../../constants/baseURL";
import { Storage } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { cities } from "../../../../constants/cities";
import { SearchedHotel } from "../../../components/hotel-components";
import { Picker } from "@react-native-picker/picker";
import { states } from "../../../../constants/states";

const AddHotelDetails = () => {
  const [fImg, setFImg] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState("");
  const [onLoading, setOnLoading] = useState(false);
  const [citySelected, setCitySelected] = useState(false);
  const [showLocationCont, setShowLocationCont] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [focus, setFocus] = useState(false);

  const { authUser } = useAuthContext();
  const navigation = useNavigation();

  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };

  const pickFeaturedImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setFImg(result.uri);
    } else {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something Went wrong, While uploading Hotel Image",
        text2: "Please Try Again",
      });
    }
  };

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

  const onSubmitForm = async () => {
    setOnLoading(true);
    // Validation
    if (
      hotelName === "" ||
      address === "" ||
      address === "" ||
      town === "" ||
      state === "" ||
      description === "" ||
      fImg === ""
    ) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Empty Fields",
        text2: "Please Filled all Fields",
      });
      setOnLoading(false);
    }
    // Get and Arrange Data
    let hotelDetails = {
      hotelName,
      fImg,
      address,
      state,
      town,
      description,
      terms,
    };
    // Upload Images
    hotelDetails.fImg = await uploadfImg(fImg);
    console.log(hotelDetails);
    // Save to db
    await axios
      .post(`${baseURL}/hotel`, hotelDetails, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Hotel Details Added Succesfully",
            text2: "You can now Manage Your Hotels",
          });
          setOnLoading(false);
          setTimeout(() => {
            navigation.navigate("ManageMyHotels");
          }, 500);
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
  // Hotel Image Upload Function

  const uploadfImg = async (fileUri) => {
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
    <>
      <ScrollView
        style={{ paddingHorizontal: 40, paddingVertical: 50, width: "100%" }}
        showsHorizontalScrollIndicator={false}
      >
        <Spinner visible={onLoading} />
        {/* Hotel Image */}
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
            onPress={pickFeaturedImage}
          >
            {fImg ? (
              <Image
                source={{ uri: fImg }}
                style={{ height: "100%", width: "80%" }}
              />
            ) : (
              <>
                <Ionicons name="images" size={80} color={colors.secondary} />
                <Text>Upload Hotel Image</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <InputField
          value={hotelName}
          placeholder="Enter Hotel Name"
          Icon={FontAwesome5}
          iconName="hotel"
          setInput={setHotelName}
        />
        <InputField
          value={address}
          placeholder="Full Address"
          Icon={Ionicons}
          iconName="color-filter-outline"
          setInput={setAddress}
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
            selectedValue={state}
            style={{
              height: 50,
              width: "100%",
            }}
            onValueChange={(itemValue) => setState(itemValue)}
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
              {town}
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
                Enter Hotel City
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
          value={description}
          placeholder="Hotel Description"
          Icon={Ionicons}
          iconName="color-filter-outline"
          setInput={setDescription}
        />
        <InputField
          value={terms}
          placeholder="Hotel Terms and Condition (Optional)"
          Icon={Ionicons}
          iconName="color-filter-outline"
          setInput={setTerms}
        />
        {/* Submit Btn */}
        <PrimaryBtn text={"Add Hotel Details"} onBtnPress={onSubmitForm} />
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
                placeholder={"Enter Hotel City"}
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
                        setCity={setTown}
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
    </>
  );
};

export default AddHotelDetails;
