import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Header, TransparentSpinner } from "../../components";
import { colors } from "../../../constants/theme";
import { CountryItem } from "../../components/flight-components";
import Footer from "../../components/Layouts/Footer";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FlightHome = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        if (!jsonValue) {
          navigation.navigate("LoginScreen");
        } else {
          // console.log(jsonValue);
        }
      } catch (e) {
        console.log(e);
        // error reading value
      }
    };
    getUser();
  }, []);

  const data = [
    {
      id: "hjsh7sshsh",
      image:
        "https://firebasestorage.googleapis.com/v0/b/house-marketplace-b3077.appspot.com/o/images%2FpwmIbFIX7sVRqpjnCSdqUlwgE5i1-earthy-home-decor-decorating-ideas_102915-840x450.jpg-36af6716-2e90-4421-a13c-6c2e8cb4fa08?alt=media&token=f4e17dfb-bb20-4040-8ca2-3fa79a89764a",
      name: "Turkey",
      desc: "COVID-19 test required",
      flagImg:
        "https://static.vecteezy.com/system/resources/previews/001/176/937/original/flag-of-turkey-background-vector.jpg",
    },
    {
      id: "hjshsh",
      image:
        "https://firebasestorage.googleapis.com/v0/b/house-marketplace-b3077.appspot.com/o/images%2FpwmIbFIX7sVRqpjnCSdqUlwgE5i1-earthy-home-decor-decorating-ideas_102915-840x450.jpg-36af6716-2e90-4421-a13c-6c2e8cb4fa08?alt=media&token=f4e17dfb-bb20-4040-8ca2-3fa79a89764a",
      name: "Mexico",
      desc: "COVID-19 test required",
      flagImg:
        "https://th.bing.com/th/id/R.91481f852f4a9987e91a48fba51b194d?rik=dy9JhvPldVx8IQ&riu=http%3a%2f%2fthelifenomadic.com%2fwp-content%2fuploads%2f2015%2f08%2fmexican-flag.jpg&ehk=MaBXGQbAG6n0oPtmfJ%2fb5NTsnPcqiP4AfOB2eklcVic%3d&risl=&pid=ImgRaw&r=0",
    },
  ];
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Header
        placeholder={"Fly anywhere with flexibility"}
        active={"flight"}
        searchPath={"FlightSearchScreen"}
      />
      <View
        style={{ width: "100%", paddingHorizontal: 10, marginVertical: 20 }}
      >
        <Text
          style={{
            color: colors.darkPrimary,
            fontFamily: "OpenSansBold",
            fontSize: 18,
          }}
        >
          Destinations you can travel to
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>
            Popular destinations you can explore from Nigeria
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              color: colors.primary,
              textDecorationLine: "underline",
            }}
          >
            See all
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: 0 }}>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <CountryItem country={item} index={index} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Footer active={"search"} searchPath={"FlightHome"} />
    </View>
  );
};

export default FlightHome;
