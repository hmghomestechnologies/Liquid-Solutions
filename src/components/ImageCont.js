import { View, Text, Image } from "react-native";
import React from "react";

const ImageCont = ({ source, radius }) => {
  return (
    <Image
      source={{ uri: source }}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: radius ? radius : 10,
      }}
      resizeMode="contain"
    />
  );
};

export default ImageCont;
