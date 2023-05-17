import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Header,
  ListItem,
  SubHeader,
  TransparentSpinner,
} from "../../components";
import { FONTS, SIZES, colors } from "../../../constants/theme";
import { CountryItem } from "../../components/flight-components";
import Footer from "../../components/Layouts/Footer";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import { containerDark } from "../../../constants/layouts";

const HotelHome = ({ navigation }) => {
  const [notLength, setNotLength] = useState(0);
  const { userId, config } = useAuthContext();
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
  const data = [
    {
      _id: 1,
      title: "Hotels",
      Image:
        "https://res.cloudinary.com/dc5ulgooc/image/upload/v1680508006/hotel_esncln.jpg",
      pathURL: "",
    },
    {
      _id: 2,
      title: "Restaurants",
      Image:
        "https://res.cloudinary.com/dc5ulgooc/image/upload/v1680508354/restaurant-hall-with-blue-chairs-decors-wall_2_optimized_gayunr.jpg",
      pathURL: "",
    },
    {
      _id: 3,
      title: "Rent Cars",
      Image:
        "https://res.cloudinary.com/dc5ulgooc/image/upload/v1680509229/car-car-park_1_optimized_2_hq4ghl.jpg",
      pathURL: "",
    },
  ];
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Header
        placeholder={"Search For Some where to stay"}
        active={"hotel"}
        searchPath={"HotelSearchScreen"}
        notLength={notLength}
      />
      <ScrollView
        style={{ width: "100%", padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <TouchableOpacity key={index} style={[containerDark, {}]}>
            <ImageBackground
              source={{ uri: item.Image }}
              style={{
                height: 250,
                width: "100%",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: FONTS.light,
                    fontSize: SIZES.extraLarge,
                    textAlign: "center",
                  }}
                >
                  {`Explore ${item.title} within Your Reach`}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
      <Footer active={"home"} searchPath={"HotelSearchScreen"} />
    </View>
  );
};

export default HotelHome;
