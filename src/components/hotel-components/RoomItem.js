import { View, Text } from "react-native";
import React from "react";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import { OutlinedSecBtn } from "../Forms";
import { useNavigation } from "@react-navigation/native";
import LineDivider from "../LineDivider";
import FormatedNumber from "../FormatedNumber";

const RoomItem = ({ category, searchedData, calDays }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: colors.veryFaintGray,
        borderRadius: 15,
        width: "100%",
        borderColor: colors.secondary,
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.medium,
            color: colors.primary,
          }}
        >
          {category?.categoryName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <Text style={{ marginRight: 4 }}>Max of {category?.maxPersons}</Text>
          <Fontisto name="persons" size={18} color={colors.secondary} />
          <Text style={{ marginLeft: 4 }}> Per Room</Text>
        </View>
      </View>
      {/* Features Container */}
      {/* <View>
        {category?.features.map((item, index) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
            }}
            key={index}
          >
            <FontAwesome5 name="angellist" size={24} color={colors.secondary} />
            <Text
              style={{
                fontFamily: FONTS.medium,
                fontSize: SIZES.small,
                marginLeft: 10,
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View> */}
      {category?.description && (
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: "600" }}>
            About {category?.categoryName}
          </Text>
          <Text style={{ fontSize: SIZES.small, color: colors.darkPrimary }}>
            {category?.description}
          </Text>
        </View>
      )}
      <LineDivider />
      <View>
        <Text>Price for {`${calDays} Nights.`}</Text>
        <FormatedNumber
          value={category?.price * calDays}
          color={colors.secondary}
          size={SIZES.extraLarge}
        />
        <Text style={{ fontSize: SIZES.small, color: colors.gray }}>
          Includes tax and fees
        </Text>
      </View>
      <OutlinedSecBtn
        text={"Select"}
        onBtnPress={() =>
          navigation.navigate("HotelBookingScreen", {
            category,
            searchedData,
            calDays,
          })
        }
      />
    </View>
  );
};

export default RoomItem;
