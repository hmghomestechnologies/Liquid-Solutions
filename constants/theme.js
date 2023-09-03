import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");
export const colors = {
  primary: "#015479",
  secondary: "#1BC0DE",
  darkPrimary: "#002835",
  gray: "#74858C",
  darkSecondary: "#1D97C1",
  bgGray: "#e6e6e6",
  darkGray: "#c4c2c2",
  successColor: "#01DB73",
  errorColor: "#bf0603",
  veryFaintGray: "#F7F7F7",
};

export const fonts = {
  normal: 14,
  mainHeading: 25,
};
export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

export const spaces = {
  top: 23,
};

export const FONTS = {
  extraBold: "OpenSansExtraBold",
  bold: "OpenSansBold",
  semiBold: "OpenSansSemiBold",
  medium: "OpenSansMedium",
  regular: "OpenSansRegular",
  light: "OpenSansLight",
};

export const SHADOWS = {
  light: {
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};

import image1 from "./images/image1.png";
import logo from "./images/logo.png";
import gettingstarted from "./images/gettingstarted.png";
import homeImg from "./images/homeImg.png";
import OnBoardImg from "../assets/images/OnBoard.jpg";
import Logo from "../assets/images/Logo.png";
export { image1, logo, gettingstarted, homeImg, OnBoardImg, Logo };

export const CustomInput = {
  width: "100%",
  borderWidth: 0.5,
  borderColor: colors.primary,
  marginVertical: 10,
  paddingVertical: 5,
  fontSize: 16,
  paddingHorizontal: 10,
  borderRadius: 10,
  fontFamily: "OpenSansMedium",
};
export const subHeading = {
  color: colors.primary,
  fontWeight: "600",
  fontSize: 30,
  marginVertical: 10,
};
