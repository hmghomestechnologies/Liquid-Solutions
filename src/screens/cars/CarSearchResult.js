import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FlightDetailsHeader } from "../../components/flight-components";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, FONTS, SHADOWS } from "../../../constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { CarResultItem } from "../../components/car-components";
import { cars } from "../../../constants/dummy";
import {
  CheckBox,
  FilterContainer,
  SearchResultHeader,
  SubHeader,
  TransparentSpinner,
} from "../../components";
import { SecBtn } from "../../components/Forms";
import { useCarContext } from "../../../context/CarContext";
import { useNavigation } from "@react-navigation/native";

const CarSearchResult = () => {
  const [cars, setCars] = useState([]);
  const [onFilter, setOnFilter] = useState(false);
  const [onFreeCancel, setOnFreeCancel] = useState(false);
  const [onHotel, setOnHotel] = useState(false);

  const navigate = useNavigation();
  const { pickupCity, availableCars, pickupDate, returnDate } = useCarContext();
  const getSearchedCars = async () => {
    const tempCars = await availableCars.filter(
      (i) => i.rideCity === pickupCity
    );
    await setCars(tempCars);
  };

  useEffect(() => {
    getSearchedCars();
  }, []);
  if (cars.length === 0) return <TransparentSpinner />;
  return (
    <View
    // style={{ marginBottom: 20 }}
    >
      <View
        style={{
          position: "absolute",
          top: 17,
          width: "100%",
          backgroundColor: "white",
          paddingTop: 5,
          // paddingHorizontal: 20,
          zIndex: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <SearchResultHeader
            head={pickupCity}
            body={`${pickupDate} - ${returnDate}`}
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
      <View style={{ backgroundColor: colors.bgGray }}>
        <FlatList
          data={cars}
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
              }}
            >
              {cars.length} Results(S)
            </Text>
          }
          renderItem={({ item }) => <CarResultItem data={item} />}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 50, width: "100%" }} />}
        />
      </View>
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

export default CarSearchResult;
