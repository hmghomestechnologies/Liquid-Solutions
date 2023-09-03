import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import { Logo, OnBoardImg, colors, fonts, image1 } from "../../constants/theme";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { SecBtn } from "../components/Forms";
import { useNavigation } from "@react-navigation/native";
import { MainHeading } from "../components/Typography";
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={OnBoardImg}
      style={{
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(20, 62, 100, 0.6)",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          // paddingBottom: 40,
          // paddingHorizontal: 40,
        }}
      >
        <View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={Logo} style={{ height: 80, width: 80 }} />
            <Text
              style={{
                fontSize: 50,
                fontWeight: "700",
                color: "white",
                marginBottom: 50,
              }}
            >
              Triluxy
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              paddingHorizontal: 5,
              marginTop: 35,
            }}
          >
            <View style={{}}>
              <MainHeading
                title={"Let’s Get That Onboard Feeling!"}
                marginVertical={30}
              />
            </View>
            <View style={{ width: "100%" }}>
              <View>
                <SecBtn
                  text={"Register"}
                  onBtnPress={() =>
                    navigation.navigate("RegisterScreen", { userType: "User" })
                  }
                />
                <TouchableOpacity
                  style={styles.socialbutton}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <AntDesign name="login" size={24} color={colors.secondary} />
                  <Text style={styles.socialText}>Login</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "OpenSansMedium",
                    color: colors.primary,
                    textAlign: "center",
                  }}
                >
                  By continuing you agree to our{" "}
                  <Text style={{ color: colors.secondary }}>Terms</Text> and{" "}
                  <Text style={{ color: colors.secondary }}>Conditions</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  socialbutton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#939090",
    borderWidth: 1,
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  socialText: {
    color: colors.primary,
    fontSize: 15,
    fontFamily: "OpenSansRegular",
    fontWeight: "800",
    marginLeft: 20,
  },
});
