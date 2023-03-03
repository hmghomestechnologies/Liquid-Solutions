import { Text } from "react-native";
import { colors } from "../../constants/theme";

export const MainHeading = ({ title, marginVertical }) => {
  return (
    <Text
      style={{
        fontFamily: "OpenSansRegular",
        fontWeight: "800",
        fontSize: 25,
        textAlign: "center",
        color: colors.primary,
        marginVertical: marginVertical,
      }}
    >
      {title}
    </Text>
  );
};
