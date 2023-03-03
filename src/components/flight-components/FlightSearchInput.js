import { View, Text, TextInput } from "react-native";
import { colors, SIZES } from "../../../constants/theme";

export const FlightSearchInput = ({
  placeholder,
  desc,
  type,
  width,
  setInput,
  value,
}) => {
  return (
    <View
      style={{
        borderColor: colors.darkSecondary,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginVertical: 5,
        backgroundColor: "white",
        width: width ? width : "100%",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: "gray",
        }}
      >
        {desc}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.primary}
          style={{
            color: colors.primary,
            fontSize: SIZES.font,
            marginLeft: 5,
            width: "100%",
          }}
          keyboardType={type ? type : "default"}
          value={value}
          onChangeText={(text) => setInput(text)}
        />
      </View>
    </View>
  );
};
