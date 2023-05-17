import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import {
  FontAwesome,
  AntDesign,
  Ionicons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { colors, FONTS, SIZES, width } from "../../../../constants/theme";
import { InputField, SecBtn } from "../../../components/Forms";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import { useAuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../../constants/baseURL";
import { useRoute } from "@react-navigation/native";
import {
  FormatedNumber,
  ImageCont,
  MapMarker,
  SubHeader,
} from "../../../components";
import { containerLight } from "../../../../constants/layouts";

const AdminHotelDetails = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [maxPersons, setMaxPersons] = useState("");
  const [description, setDescription] = useState("");
  const [onLoading, setOnLoading] = useState(false);
  const route = useRoute();
  const { hotel } = route?.params;
  const { config } = useAuthContext();

  useEffect(() => {
    axios
      .get(`${baseURL}/category/hotel/categories/${hotel?._id}`, config)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [hotel]);
  const onSubmit = async () => {
    setOnLoading(true);
    // Validation
    if (
      categoryName === "" ||
      price === "" ||
      description === "" ||
      maxPersons === ""
    ) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Empty Fields",
        text2: "Please Filled all Fields",
      });
      setOnLoading(false);
    } else {
      // Get and Arrange Data
      let postData = {
        categoryName,
        features: "",
        price,
        discountedPrice,
        maxPersons,
        description,
        hotel: hotel?._id,
      };
      // Save to db
      console.log(postData);
      await axios
        .post(`${baseURL}/category`, postData, config)
        .then((res) => {
          if (res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Category Added Succesfully",
              text2: "You can now Manage Your Hotel Categories",
            });
            setOnLoading(false);
            const temp = res.data;
            setCategories([...categories, temp]);
            setShowForm(false);
            setCategoryName("");
            setDescription("");
            setPrice(0);
            setDiscountedPrice(0);
            setMaxPersons("");
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
    }
  };
  console.log(categories);
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Spinner visible={onLoading} />
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: colors.secondary,
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => setShowForm(true)}
      >
        <AntDesign name="plussquareo" size={30} color="white" />
      </TouchableOpacity>
      <View style={{ marginTop: 50, marginHorizontal: 30 }}>
        <View
          style={{
            height: 100,
            width: 100,
          }}
        >
          <ImageCont source={hotel?.fImg} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.medium,
              color: colors.darkSecondary,
            }}
          >
            {hotel?.hotelName}
          </Text>
        </View>
        <MapMarker
          location={`${hotel?.address}, ${hotel?.town}, ${hotel?.state} State.`}
        />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        style={{
          marginHorizontal: 20,
          paddingTop: 10,
        }}
        ListHeaderComponent={
          <Text
            style={{
              fontSize: 20,
              color: colors.darkPrimary,
              fontWeight: "700",
              marginVertical: 20,
            }}
          >
            Categories
          </Text>
        }
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={[
              containerLight,
              { paddingVertical: 15, paddingHorizontal: 25 },
            ]}
          >
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.medium,
                color: colors.primary,
              }}
            >
              {item?.categoryName}
            </Text>
            <View style={{ marginVertical: 3 }}>
              <FormatedNumber
                value={item?.price}
                color={colors.secondary}
                size={SIZES.large}
              />
            </View>
            <Text
              style={{
                fontSize: SIZES.small,
                fontFamily: FONTS.bold,
                color: colors.gray,
              }}
            >{`Maximum of ${item?.maxPersons} of Persons Per Room`}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 40, width: "100%" }} />}
      />

      {/* Form Conatiner Container */}
      {showForm && (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "absolute",
            bottom: 0,
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: 15,
              paddingHorizontal: 20,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              paddingVertical: 15,
            }}
          >
            {/* Form */}
            <View style={{ width: "100%", paddingHorizontal: 15 }}>
              <InputField
                value={categoryName}
                placeholder="Category Name"
                Icon={MaterialIcons}
                iconName="category"
                setInput={setCategoryName}
              />
              <InputField
                value={maxPersons}
                placeholder="Max Persons Per Room"
                Icon={FontAwesome}
                iconName="users"
                setInput={setMaxPersons}
              />
              <InputField
                value={discountedPrice}
                placeholder="Discounted Price"
                Icon={FontAwesome}
                iconName="money"
                setInput={setDiscountedPrice}
                type="numeric"
              />
              <InputField
                value={price}
                placeholder="Price"
                Icon={FontAwesome}
                iconName="money"
                setInput={setPrice}
                type="numeric"
              />
              <InputField
                value={description}
                placeholder="Category Description"
                Icon={Entypo}
                iconName="info-with-circle"
                setInput={setDescription}
              />

              <SecBtn text={"Submit"} onBtnPress={onSubmit} />
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 50,
              left: "48%",
            }}
            onPress={() => setShowForm(false)}
          >
            <FontAwesome name="times-circle-o" size={40} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AdminHotelDetails;
