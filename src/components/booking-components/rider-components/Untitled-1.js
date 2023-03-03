<View style={[containerDark, {}]}>
  <Text>Restaurant Name</Text>
  <Text>{restaurantName}</Text>
  <View>
    <Text
      style={{
        color: colors.primary,
        fontFamily: FONTS.semiBold,
        //   fontSize: SIZES.medium,
      }}
    >
      {`${address}`}
    </Text>
    <View style={{ width: "100%", alignItems: "center" }}>
      <FontAwesome name="angle-double-down" size={24} color="red" />
    </View>
    <Text
      style={{
        color: colors.primary,
        fontFamily: FONTS.semiBold,
        //   fontSize: SIZES.medium,
      }}
    >
      {`${deliveryAddress?.description}`}
    </Text>
  </View>
</View>;
