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
import { useNavigation, useRoute } from "@react-navigation/native";
import { InputField, PrimaryBtn } from "../../../components/Forms";
import baseURL from "../../../../constants/baseURL";
import { useAuthContext } from "../../../../context/AuthContext";
import { containerMedium } from "../../../../constants/layouts";
import { colors, FONTS, SIZES } from "../../../../constants/theme";
import { SearchedHotel } from "../../../components/hotel-components";
import { cities } from "../../../../constants/cities";
import { useRestaurantContext } from "../../../../context/RestaurantContext";
import { TransparentSpinner } from "../../../components";

const AddMenuItemScreen = () => {
  const [onLoading, setOnLoading] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuImg, setMenuImg] = useState("");
  const [menuType, setMenuType] = useState("");
  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [description, setDescription] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route?.params;
  const { userId, config } = useAuthContext();
  const { currentRestaurant } = useRestaurantContext();
  console.log(currentRestaurant);
  const pickMenuImg = async () => {
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
          setMenuImg(data?.secure_url);
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
    // Get and Arrange Data
    let menuDetails = {
      menuName,
      menuImg,
      menuType: params,
      description,
      discountedPrice,
      price,
      location: currentRestaurant?.town,
      restaurantId: currentRestaurant?._id,
    };
    console.log(menuDetails);
    setOnLoading(true);
    // Validation
    if (menuName === "" || menuImg === "" || price === "") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Empty Fields",
        text2: "Please Filled all Fields",
      });
      setOnLoading(false);
    } else {
      // Save to db
      await axios
        .post(`${baseURL}/restaurant/add-menu`, menuDetails, config)
        .then((res) => {
          if (res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Menu Details Added Succesfully",
              text2: "You can now Manage Menu Item",
            });
            setOnLoading(false);
            navigation.navigate("ProfileScreen");
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
    }
  };
  return (
    <>
      <ScrollView
        style={{ paddingHorizontal: 40, paddingVertical: 50, width: "100%" }}
        showsHorizontalScrollIndicator={false}
      >
        <Spinner visible={onLoading} />
        {/* Menu Image */}
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
            onPress={pickMenuImg}
          >
            {menuImg ? (
              <Image
                source={{ uri: menuImg }}
                style={{ height: "100%", width: "100%", borderRadius: 10 }}
              />
            ) : (
              <>
                <Ionicons name="images" size={80} color={colors.secondary} />
                <Text>Upload Dish Image</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <InputField
          value={menuName}
          placeholder="Enter Menu Name"
          Icon={Ionicons}
          iconName="restaurant-outline"
          setInput={setMenuName}
        />
        <InputField
          value={price}
          placeholder="Price"
          Icon={FontAwesome5}
          iconName="money-bill-wave"
          setInput={setPrice}
          type="numeric"
        />
        <InputField
          value={discountedPrice}
          placeholder="Discounted Price(optional)"
          Icon={FontAwesome}
          iconName="opencart"
          setInput={setDiscountedPrice}
          type="numeric"
        />
        <InputField
          value={description}
          placeholder="Description (Optional)"
          Icon={Entypo}
          iconName="info-with-circle"
          setInput={setDescription}
        />
        <View style={{ height: 20, width: "100%" }} />
        {/* Submit Btn */}
        <PrimaryBtn text={"Add Menu Item"} onBtnPress={onSubmitForm} />
        <View style={{ height: 80, width: "100%" }} />
      </ScrollView>
    </>
  );
};

export default AddMenuItemScreen;
