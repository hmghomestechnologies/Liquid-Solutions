import React from 'react'
import { Image, Text, View } from 'react-native'
import { colors, FONTS } from '../../../constants/theme'

function SearchedHotelItem({city}) {
  return (
    <div>
        <View>
            <Image
              source={{
                uri: "https://stockphoto.com/samples/MzU4Njc5NDFmNWJjZmIwZWQ=/MjIxMWY1YmNmYjBlZA==/dubai-downtown-night-scene.jpg&size=1024",
              }}
              style={{ width: 40, height: 40, borderRadius: 5 }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontFamily: FONTS.bold, color: colors.primary }}>
              {city}
            </Text>
            <Text style={{ fontSize: 11 }}>City in {city}</Text>
          </View>
    </div>
  )
}

export default SearchedHotelItem