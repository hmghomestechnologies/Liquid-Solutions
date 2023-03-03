import { View, Text, Image } from "react-native";
import React from "react";
import { colors, gettingstarted } from "../../constants/theme";
import { SecBtn } from "../components/Forms";
import { useNavigation } from "@react-navigation/native";

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        <Image
          source={gettingstarted}
          style={{ height: 400, width: "100%" }}
          resizeMode="cover"
        />
        <View
          style={{ width: "100%", alignItems: "center", paddingHorizontal: 20 }}
        >
          <Text
            style={{
              fontFamily: "OpenSansMedium",
              fontWeight: "900",
              fontSize: 25,
              textAlign: "center",
              color: colors.primary,
            }}
          >
            Exiciting Adventures Waiting for you
          </Text>
          <Text
            style={{
              fontFamily: "OpenSansMedium",

              color: colors.primary,
              textAlign: "center",
              marginTop: 15,
            }}
          >
            Lots of flights to various destinations and experience around the
            world.
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <SecBtn
            text={"Get Started"}
            onBtnPress={() => navigation.navigate("UserSelectorScreen")}
          />
          <Text
            style={{
              fontFamily: "OpenSansMedium",
              fontWeight: "600",
            }}
          >
            Already have an account?{" "}
            <Text
              style={{
                fontFamily: "OpenSansBold",
                color: colors.primary,
                fontSize: 16,
              }}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
