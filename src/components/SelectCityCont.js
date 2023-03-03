import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SearchedHotel } from "./hotel-components";
import { colors, FONTS, SIZES } from "../../constants/theme";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { cities } from "../../constants/cities";
import { useState } from "react";
const SelectCityCont = ({ city, setCity }) => {
  const [citySelected, setCitySelected] = useState(false);
  const [showLocationCont, setShowLocationCont] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [focus, setFocus] = useState(false);

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
  return (
    <View>
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
            {city}
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
              Enter Your Location
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
            zIndex: 10000,
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
                placeholder={"Enter Your Location"}
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
                        setCity={setCity}
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

export default SelectCityCont;
