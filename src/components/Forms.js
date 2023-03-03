import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { colors, SIZES } from "../../constants/theme";
export const CustomInput = () => {
  return <View></View>;
};
export const PrimaryBtn = ({ text, onBtnPress }) => {
  return (
    <TouchableOpacity
      style={{
        // width: "100%",
        backgroundColor: colors.darkPrimary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        borderRadius: 15,
        marginVertical: 10,
        fontFamily: "OpenSansExtraBold",
      }}
      onPress={onBtnPress}
    >
      <Text
        style={{
          color: "white",
          fontSize: 15,
          fontWeight: "700",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export const SecBtn = ({ text, onBtnPress }) => {
  return (
    <TouchableOpacity
      style={{
        // width: "100%",
        backgroundColor: colors.secondary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        borderRadius: 15,
        marginVertical: 10,
        fontFamily: "OpenSansExtraBold",
      }}
      onPress={onBtnPress}
    >
      <Text
        style={{
          color: "white",
          fontSize: 15,
          fontWeight: "700",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export const OutlinedSecBtn = ({ text, onBtnPress }) => {
  return (
    <TouchableOpacity
      style={{
        // width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        borderRadius: 15,
        marginVertical: 10,
        fontFamily: "OpenSansExtraBold",
        backgroundColor: "white",
        borderColor: colors.secondary,
        borderWidth: 1,
      }}
      onPress={onBtnPress}
    >
      <Text
        style={{
          color: colors.secondary,
          fontSize: 16,
          fontWeight: "800",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export const LoadingBtn = () => {
  return (
    <TouchableOpacity
      style={{
        // width: "100%",
        backgroundColor: colors.secondary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        borderRadius: 15,
        marginVertical: 10,
        fontFamily: "OpenSansExtraBold",
      }}
      disabled
    >
      {/* <Text
        style={{
          color: "white",
          fontSize: 15,
          fontWeight: "700",
        }}
      > */}
      <ActivityIndicator color={"white"} />
      {/* </Text> */}
    </TouchableOpacity>
  );
};

export const InputField = ({
  value,
  placeholder,
  setInput,
  Icon,
  iconName,
  type,
  noBorder,
  color,
  password,
}) => {
  return (
    <View style={{ width: "100%", position: "relative", marginVertical: 10 }}>
      <Icon
        name={iconName}
        size={24}
        color={color ? color : "gray"}
        style={{ position: "absolute", left: 10, top: 10, zIndex: 1 }}
      />
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => setInput(text)}
        style={{
          fontFamily: "OpenSansMedium",
          color: colors.secondary,
          width: "100%",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderColor: colors.darkSecondary,
          borderWidth: noBorder ? 0 : 1,
          fontWeight: "600",
          paddingLeft: 55,
          borderRadius: 10,
          backgroundColor: "white",
        }}
        keyboardType={type ? type : "default"}
        secureTextEntry={password ? true : false}
      />
    </View>
  );
};
