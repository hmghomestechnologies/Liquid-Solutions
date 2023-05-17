import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Octicons,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Storage } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { InputField, PrimaryBtn } from "../../../components/Forms";
import baseURL from "../../../../constants/baseURL";
import { useAuthContext } from "../../../../context/AuthContext";
import { containerMedium } from "../../../../constants/layouts";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { SearchedHotel } from "../../../components/hotel-components";
import { cities } from "../../../../constants/cities";
import { useRestaurantContext } from "../../../../context/RestaurantContext";
import { TransparentSpinner } from "../../../components";
import { Picker } from "@react-native-picker/picker";
import { states } from "../../../../constants/states";

const AddRestaurantDetails = () => {
  const [screenLoading, setScreenLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");
  const [fImg, setFImg] = useState("");
  const [address, setAddress] = useState(0);
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [lat, setLat] = useState("");
  const [openDaysStart, setOpenDaysStart] = useState("");
  const [openDaysEnd, setOpenDaysEnd] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState("");
  const [onLoading, setOnLoading] = useState(false);
  const [citySelected, setCitySelected] = useState(false);
  const [showLocationCont, setShowLocationCont] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [focus, setFocus] = useState(false);

  const navigation = useNavigation();
  const { userId, config } = useAuthContext();
  const { currentRestaurant, setCurrentRestaurant } = useRestaurantContext();
  const pickRestaurantImg = async () => {
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
        name: "Restaurant.jpg",
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
          setFImg(data?.secure_url);
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
      restaurantName === "" ||
      fImg === "" ||
      address === "" ||
      state === "" ||
      town === "" ||
      openDaysStart === "" ||
      openDaysEnd === "" ||
      description === ""
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
    let restaurantDetails = {
      restaurantName,
      fImg,
      address,
      state,
      town,
      lat,
      lng,
      openDaysStart,
      openDaysEnd,
      description,
      terms,
      user: userId,
    };
    console.log(restaurantDetails);
    // Save to db
    await axios
      .post(`${baseURL}/restaurant/admin`, restaurantDetails, config)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Restaurant Details Added Succesfully",
            text2: "You can now Manage Restaurant Details",
          });
          setOnLoading(false);
          setCurrentRestaurant(res.data);
          navigation.navigate("RestaurantAdminHome");
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
    <>
      <ScrollView
        style={{ paddingHorizontal: 40, paddingVertical: 50, width: "100%" }}
        showsHorizontalScrollIndicator={false}
      >
        <Spinner visible={onLoading} />
        {/* Restaurant Image */}
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
            onPress={pickRestaurantImg}
          >
            {fImg ? (
              <Image
                source={{ uri: fImg }}
                style={{ height: "100%", width: "80%" }}
              />
            ) : (
              <>
                <Ionicons name="images" size={80} color={colors.secondary} />
                <Text>Upload Restaurant Featured Image</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <InputField
          value={restaurantName}
          placeholder="Enter Restaurant Name"
          Icon={Ionicons}
          iconName="restaurant-outline"
          setInput={setRestaurantName}
        />
        <InputField
          value={address}
          placeholder="Restaurant Address"
          Icon={FontAwesome}
          iconName="opencart"
          setInput={setAddress}
        />
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
                Enter Restaurant City
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
        <InputField
          value={openDaysStart}
          placeholder="Restaurant Opening Day"
          Icon={MaterialCommunityIcons}
          iconName="open-source-initiative"
          setInput={setOpenDaysStart}
        />
        <InputField
          value={openDaysEnd}
          placeholder="Restaurant Closing Day"
          Icon={MaterialCommunityIcons}
          iconName="close-circle-multiple"
          setInput={setOpenDaysEnd}
        />
        <InputField
          value={description}
          placeholder="More Info About Restaurant"
          Icon={Entypo}
          iconName="info-with-circle"
          setInput={setDescription}
        />
        <InputField
          value={terms}
          placeholder="Terms and Conditions (Optional)"
          Icon={MaterialIcons}
          iconName="description"
          setInput={setTerms}
        />
        <View style={{ height: 20, width: "100%" }} />
        {/* Submit Btn */}
        <PrimaryBtn text={"Add Restaurant Details"} onBtnPress={onSubmitForm} />
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
                placeholder={"Enter Restaurant City"}
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

export default AddRestaurantDetails;
