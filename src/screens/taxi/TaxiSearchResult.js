import { View, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SecBtn } from "../../components/Forms";
import { TaxiTypeItem } from "../../components/taxi-component";
import { BackButton } from "../../components";
const TaxiSearchResult = () => {
  const [selected, setSelected] = useState("Standard");
  const [activeStandard, setActiveStandard] = useState(true);
  const [activeLuxury, setActiveLuxury] = useState(false);
  const [activeExecutive, setActiveExecutive] = useState(false);
  const navigation = useNavigation();
  const onStandard = () => {
    setSelected("Standard");
    setActiveStandard(true);
    setActiveExecutive(false);
    setActiveLuxury(false);
  };
  const onLuxury = () => {
    setSelected("Luxury");
    setActiveStandard(false);
    setActiveExecutive(false);
    setActiveLuxury(true);
  };
  const onExecutive = () => {
    setSelected("Executive");
    setActiveStandard(false);
    setActiveExecutive(true);
    setActiveLuxury(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "white" }}
    >
      <View style={{}}>
        {/* map Tab */}
        <View
          style={{
            width: "100%",
            height: 400,
            position: "relative",
          }}
        >
          <BackButton />
          <Image
            source={{
              uri: "https://stockphoto.com/samples/MTk0MjQ5OTEwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/navigation.jpg&size=1024",
            }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>

        {/* Description Tab */}
        <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
          <TaxiTypeItem
            value={"Standard"}
            image={
              "https://stockphoto.com/samples/Nzc1MDc0MjUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/red-car--on-white-background.jpg&size=1024"
            }
            onPress={onStandard}
            active={activeStandard}
          />
          <TaxiTypeItem
            value={"Executive"}
            image={
              "https://stockphoto.com/samples/Nzc1MDc0MjUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/red-car--on-white-background.jpg&size=1024"
            }
            onPress={onExecutive}
            active={activeExecutive}
          />
          <TaxiTypeItem
            value={"Luxury"}
            image={
              "https://stockphoto.com/samples/Nzc1MDc0MjUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/red-car--on-white-background.jpg&size=1024"
            }
            onPress={onLuxury}
            active={activeLuxury}
          />
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <SecBtn
            text={selected}
            onBtnPress={() =>
              navigation.navigate("TaxiDetailsScreen", { selected })
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TaxiSearchResult;
