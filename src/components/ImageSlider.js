import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import ImageCont from "./ImageCont";

const ImageSlider = ({ images }) => {
  const [activeImg, setActiveImg] = useState(0);
  const { width } = Dimensions.get("screen");
  const onChange = (nativeEvent) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide != activeImg) {
      setActiveImg(slide);
    }
  };
  console.log(images);
  return (
    <View style={{ height: 280 }}>
      <ScrollView
        onScroll={({ nativeEvent }) => onChange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
      >
        {images.map((e, index) => (
          <View style={{ height: 250, width: width - 50 }} key={index}>
            {/* <Image
              style={{
                height: 250,
                width: width - 50,
                borderRadius: 10,
                marginHorizontal: 25,
              }}
              source={{ uri: e }}
              resizeMode="contain"
            /> */}
            <ImageCont source={e} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {images.map((e, index) => (
          <Image
            key={e}
            style={activeImg == index ? styles.activeDot : styles.dot}
            source={{ uri: e }}
          />
        ))}
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          width: width - 60,
          marginHorizontal: 28,
          top: 80,
        }}
      >
        <FontAwesome name="angle-left" size={40} color={colors.darkSecondary} />
        <FontAwesome
          name="angle-right"
          size={40}
          color={colors.darkSecondary}
        />
      </View> */}
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  wrap: { width: "100%", height: 300 },
  wrapDot: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    alignSelf: "center",
  },
  activeDot: {
    borderColor: colors.secondary,
    borderWidth: 2,
    height: 30,
    width: 33,
    borderRadius: 5,
    marginHorizontal: 3,
    padding: 4,
  },
  dot: {
    height: 30,
    width: 33,
    borderRadius: 5,
    marginHorizontal: 3,
    padding: 4,
  },
});
