import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { colors, homeImg, SHADOWS } from "../../../constants/theme";
import {
  Ionicons,
  Entypo,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ placeholder, active, searchPath }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: colors.secondary,
        paddingTop: 40,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Image */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://stockphoto.com/samples/MzQyNTI0MjUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/happy-smiling--man-with-glasses-leaning-against-brick-wall-.jpg&size=1024",
              }}
              style={{ height: 45, width: 45, borderRadius: 100 }}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "OpenSansBold",
                color: colors.primary,
                marginLeft: 8,
              }}
            >
              Hi, Stella
            </Text>
          </View>
          {/* Icon */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={{ position: "relative" }}
          >
            <Entypo
              name="dot-single"
              size={40}
              color="red"
              style={{ position: "absolute", right: -3, top: -12, zIndex: 1 }}
            />
            <Ionicons name="notifications-outline" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "white", marginVertical: 5 }}>
          What do you want to do today?
        </Text>
      </View>
      <ImageBackground
        source={{
          uri: "https://stockphoto.com/samples/NjkwNTc5NDE0MDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/giraffe-walking-on-the-plains-of-the-masai-mara-national-park-in-kenya.jpg&size=1024",
        }}
        style={{
          height: 100,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 10,
              ...SHADOWS.dark,
            }}
            onPress={() => navigation.navigate(searchPath)}
          >
            <Ionicons
              name="md-search-circle-sharp"
              size={30}
              color={colors.darkSecondary}
            />
            <Text style={{ color: "gray", marginLeft: 5 }}>{placeholder}</Text>
          </TouchableOpacity>
          {/* <InputField
            // value={email}
            placeholder={placeholder}
            Icon={AntDesign}
            iconName="search1"
            // setInput={setEmail}
            background="white"
            noBorder
          /> */}
        </View>
      </ImageBackground>
      {/* Icons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          marginVertical: 2,
        }}
      >
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("FlightHome")}
        >
          <MaterialIcons
            name="flight"
            size={30}
            color={active === "flight" ? colors.primary : "white"}
          />
          <Text
            style={[
              styles.text,
              { color: active === "flight" ? colors.primary : "white" },
            ]}
          >
            Flights
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("HotelHome")}
        >
          <FontAwesome5
            name="hotel"
            size={30}
            color={active === "hotel" ? colors.primary : "white"}
          />
          <Text
            style={[
              styles.text,
              { color: active === "hotel" ? colors.primary : "white" },
            ]}
          >
            Hotels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("CarHome")}
        >
          <AntDesign
            name="car"
            size={30}
            color={active === "car" ? colors.primary : "white"}
          />
          <Text
            style={[
              styles.text,
              { color: active === "car" ? colors.primary : "white" },
            ]}
          >
            Car Rental
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("TaxiSearchScreen")}
        >
          <FontAwesome
            name="taxi"
            size={30}
            color={active === "taxi" ? colors.primary : "white"}
          />
          <Text
            style={[
              styles.text,
              { color: active === "taxi" ? colors.primary : "white" },
            ]}
          >
            Taxi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("RestaurantHome")}
        >
          <Ionicons
            name="restaurant"
            size={30}
            color={active === "restaurants" ? colors.primary : "white"}
          />
          <Text
            style={[
              styles.text,
              { color: active === "restaurants" ? colors.primary : "white" },
            ]}
          >
            Restaurants
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: "white",
    marginVertical: 5,
  },
});
