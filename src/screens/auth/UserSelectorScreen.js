import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { image1 } from "../../../constants/theme";
import { SecBtn } from "../../components/Forms";
const UserSelectorScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const data = [
    { name: "User", type: "User" },
    { name: "Restaurant", type: "resAdmin" },
    { name: "Hotel", type: "hotelAdmin" },
    { name: "Car Owner", type: "carRentor" },
    { name: "Taxi Driver", type: "taxiDriver" },
    { name: "Dispatch Rider", type: "rider" },
  ];
  return (
    <View
      style={{
        height: "100%",
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <View style={{ width: "100%", marginTop: 20 }}>
        <Image source={image1} style={{ height: 250, width: "100%" }} />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          paddingHorizontal: 50,
          paddingVertical: 50,
        }}
      >
        {data.map((item, index) => (
          <View key={index}>
            <SecBtn
              text={`Register as ${item.name}`}
              onBtnPress={() =>
                navigation.navigate("RegisterScreen", { userType: item.type })
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default UserSelectorScreen;
