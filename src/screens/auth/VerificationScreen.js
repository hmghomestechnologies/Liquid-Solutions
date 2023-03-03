import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { logo, colors, image1 } from "../../../constants/theme";
import { InputField, SecBtn } from "../../components/Forms";
import { MainHeading } from "../../components/Typography";

const OTPScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: "100%",
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ width: "100%", marginTop: 30 }}>
        <Image source={image1} style={{ height: 250, width: "100%" }} />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60%",
        }}
      >
        <View style={{ marginVertical: 20 }}>
          <MainHeading title={"Verification Successful!"} marginVertical={5} />
        </View>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 20 }}
        >
          <AntDesign name="checkcircle" size={120} color="green" />
        </View>
        <View style={{ width: "100%", paddingHorizontal: 30 }}>
          <View style={{ marginTop: 5 }}>
            <SecBtn
              text={"Continue"}
              // onBtnPress={onConfirmOTP}
              onBtnPress={() => navigation.navigate("FlightHome")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OTPScreen;

// import { StyleSheet, View, Image } from "react-native";
// import React from "react";
// import { logo } from "../../../constants/theme";

// import { SecBtn } from "../../components/Forms";
// import { AntDesign } from "@expo/vector-icons";

// const VerificationScreen = () => {
//   return (
//     <View
//       style={{
//         height: "100%",
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         width: "100%",
//         paddingHorizontal: 25,
//       }}
//     >
//       <View style={{ position: "absolute", top: 100, right: 20 }}>
//         <Image source={logo} style={{ height: 100, width: 100 }} />
//       </View>
//       <View style={{ backgroundColor: "white", padding: 20, borderRadius: 20 }}>
//         <AntDesign name="checkcircle" size={120} color="green" />
//       </View>
//       <View style={{ marginTop: 20, width: "100%" }}>
//         <SecBtn text={"Continue"} />
//       </View>
//     </View>
//   );
// };

// export default VerificationScreen;

// const styles = StyleSheet.create({});
