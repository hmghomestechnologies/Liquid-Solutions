import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../constants/theme";

const FlightSearchTabTiltle = ({ title, active, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          textTransform: "uppercase",
          color: active ? colors.primary : "gray",
        }}
      >
        {title}
      </Text>
      {active && (
        <View
          style={{
            height: 3,
            width: "100%",
            backgroundColor: "orange",
            borderRadius: 10,
            marginVertical: 2,
          }}
        ></View>
      )}
    </TouchableOpacity>
  );
};

export default FlightSearchTabTiltle;
// {
//   active === true ? (
//     <View>
//       <Text
//         style={{
//           fontWeight: "700",
//           fontFamily: "OpenSansRegular",
//           color: colors.darkPrimary,
//         }}
//       >
//         {title}
//       </Text>
//       <View
//         style={{
//           height: 5,
//           width: 30,
//           backgroundColor: colors.secondary,
//           borderRadius: 20,
//         }}
//       ></View>
//     </View>
//   ) : (
//     <Text
//       style={{
//         fontWeight: "500",
//         fontFamily: "OpenSansRegular",
//         color: colors.primary,
//       }}
//     >
//       {title}
//     </Text>
//   );
// }
