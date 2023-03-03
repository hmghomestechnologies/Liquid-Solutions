import { View, Text } from "react-native";
import React from "react";
import { S3Image } from "aws-amplify-react-native";

const ImageCont = ({ source, radius }) => {
  return (
    <S3Image
      imgKey={source}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: radius ? radius : 10,
      }}
      resizeMode="contain"
    ></S3Image>
  );
};

export default ImageCont;
