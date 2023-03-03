import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, FONTS, SHADOWS, SIZES } from "../../../constants/theme";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import {
  CheckBox,
  FilterContainer,
  SearchResultHeader,
  Spinner,
  SubHeader,
} from "../../components";
import { SecBtn } from "../../components/Forms";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRestaurantContext } from "../../../context/RestaurantContext";
import { RestaurantVerticalItem } from "../../components/restaurant-components";

const ResSearchResult = () => {
  const route = useRoute();
  const { restaurants } = useRestaurantContext();
  const { searchedData } = route?.params;
  const [cityRestaurants, setCityRestaurants] = useState(null);
  const [onFilter, setOnFilter] = useState(false);
  const [onFreeCancel, setOnFreeCancel] = useState(false);
  const [onHotel, setOnHotel] = useState(false);
  const navigate = useNavigation();
  const getSearchedCityRestaurants = async () => {
    const tempRestaurants = await restaurants.filter(
      (i) => i.town === searchedData.city
    );
    await setCityRestaurants(tempRestaurants);
  };

  useEffect(() => {
    getSearchedCityRestaurants();
  }, []);
  if (!cityRestaurants) return <Spinner />;
  console.log(cityRestaurants.length);
  return (
    <View>
      <View
        style={{
          position: "absolute",
          top: 17,
          width: "100%",
          backgroundColor: "white",
          paddingTop: 5,
          zIndex: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <SearchResultHeader
            head={searchedData?.city}
            body={`${searchedData?.checkInDate} | ${searchedData?.persons} Persons`}
          />
        </View>
        {/* <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 8,
            justifyContent: "space-between",
            ...SHADOWS.dark,
          }}
        >
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setOnFilter(!onFilter)}
            >
              <MaterialIcons name="sort" size={24} color="black" />
              <Text style={{ fontFamily: FONTS.semiBold, marginLeft: 5 }}>
                Sort By
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              placeholder="By Min Price"
              style={{
                borderWidth: 1,
                borderColor: colors.gray,
                width: 170,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              borderWidth: 1,
              borderColor: colors.darkPrimary,
              height: 40,
              width: 40,
            }}
          >
            <FontAwesome name="dollar" size={15} color="black" />
            <Text style={{ fontFamily: FONTS.semiBold }}>NGN</Text>
          </View>
        </View> */}
      </View>
      {cityRestaurants.length > 0 ? (
        <View>
          <FlatList
            data={cityRestaurants}
            keyExtractor={(item) => item._id}
            style={{
              marginTop: 80,
              marginHorizontal: 20,
              paddingTop: 20,
            }}
            ListHeaderComponent={
              <Text
                style={{
                  fontSize: 20,
                  color: colors.darkPrimary,
                  fontWeight: "700",
                  marginBottom: 20,
                }}
              >
                Results(S)
              </Text>
            }
            renderItem={({ item }) => (
              <RestaurantVerticalItem data={item} searchedData={searchedData} />
            )}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: 40, width: "100%" }} />}
          />
        </View>
      ) : (
        <View
          style={{
            height: "100%",
            marginHorizontal: 40,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="emoji-sad" size={40} color="red" />
          <Text
            style={{
              marginVertical: 20,
              color: colors.darkPrimary,
              fontSize: SIZES.medium,
              textAlign: "center",
            }}
          >
            We Don't Have Any Restaurants in Your Searched Location
          </Text>
          <View style={{ width: "100%" }}>
            <SecBtn onBtnPress={() => navigate.goBack()} text={"Go Back"} />
          </View>
        </View>
      )}
      {/* Filter Container */}
      {onFilter && (
        <FilterContainer filter={onFilter} setFilter={setOnFilter}>
          <View style={{ marginVertical: 15 }}>
            <SubHeader text={"Payment Type"} />
            <CheckBox
              label={"Free Cancelation"}
              activeChecked={onFreeCancel}
              setActiveChecked={setOnFreeCancel}
            />
            <CheckBox
              label={"Free Cancelation"}
              activeChecked={onFreeCancel}
              setActiveChecked={setOnFreeCancel}
            />
          </View>
          <View style={{ marginVertical: 15 }}>
            <SubHeader text={"Property Type"} />
            <CheckBox
              label={"Hotel"}
              activeChecked={onHotel}
              setActiveChecked={setOnHotel}
            />
            <CheckBox
              label={"Hotel Resort"}
              activeChecked={onHotel}
              setActiveChecked={setOnHotel}
            />
            <CheckBox
              label={"Private Vacation Home"}
              activeChecked={onHotel}
              setActiveChecked={setOnHotel}
            />
            <CheckBox
              label={"Condo"}
              activeChecked={onHotel}
              setActiveChecked={setOnHotel}
            />
            <CheckBox
              label={"Motel"}
              activeChecked={onHotel}
              setActiveChecked={setOnHotel}
            />
            <CheckBox
              label={"Villa"}
              activeChecked={onHotel}
              setActiveChecked={setOnHotel}
            />
          </View>
          <View style={{ marginVertical: 15 }}>
            <SubHeader text={"Neigboer"} />
            <CheckBox
              label={"las Vegas"}
              activeChecked={onHotel}
              setActiveChecked={setOnHotel}
            />
            <CheckBox
              label={"Las Vegas Strip"}
              activeChecked={onHotel}
              setActiveChecked={setOnHotel}
            />
          </View>
          <View style={{ marginVertical: 15 }}>
            <SecBtn text={"Apply"} />
          </View>
        </FilterContainer>
      )}
    </View>
  );
};

export default ResSearchResult;
