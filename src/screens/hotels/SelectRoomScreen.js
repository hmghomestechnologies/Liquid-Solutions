import { View, FlatList } from "react-native";
import React from "react";
import { SearchResultHeader, WarningText } from "../../components";
import { RoomItem } from "../../components/hotel-components";
import { useRoute } from "@react-navigation/native";

const SelectRoomScreen = () => {
  const route = useRoute();
  const { searchedData, categories, calDays } = route?.params;
  return (
    <View style={{ backgroundColor: "white" }}>
      <SearchResultHeader
        head="Select Rooms"
        body={`${searchedData?.checkInDate} |-| ${searchedData?.checkOutDate} `}
      />
      <WarningText text={"Find a cancellation policy that works for you"} />
      <View style={{ marginVertical: 40, marginHorizontal: 20 }}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RoomItem
              category={item}
              searchedData={searchedData}
              calDays={calDays}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 200, width: "100%" }} />}
        />
      </View>
    </View>
  );
};

export default SelectRoomScreen;
