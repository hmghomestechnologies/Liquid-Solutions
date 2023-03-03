import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors, fonts, image1 } from "../../constants/theme";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { SecBtn } from "../components/Forms";
import { useNavigation } from "@react-navigation/native";
import { MainHeading } from "../components/Typography";
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <Image
        source={image1}
        style={{
          height: 266,
          width: "100%",
          resizeMode: "cover",
        }}
      />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 35,
        }}
      >
        <View style={{}}>
          <MainHeading
            title={"Let’s Get That Onboard Feeling!"}
            marginVertical={40}
          />
        </View>
        <View style={{ width: "100%" }}>
          <TouchableOpacity style={styles.socialbutton}>
            <Entypo name="facebook" size={24} color={colors.secondary} />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialbutton}>
            <AntDesign name="apple1" size={24} color="black" />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialbutton}>
            <AntDesign name="googleplus" size={24} color={"red"} />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>
          <View>
            <SecBtn
              text={"Sign Up with Email"}
              onBtnPress={() => navigation.navigate("UserSelectorScreen")}
            />
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
    marginVertical: 5,
  },
  socialText: {
    color: colors.primary,
    fontSize: 15,
    fontFamily: "OpenSansRegular",
    fontWeight: "800",
    marginLeft: 20,
  },
});
