import { View, Text, FlatList } from "react-native";
import { colors, FONTS, SIZES } from "../../../constants/theme";
import NoResult from "../NoResult";
import { BookingItem } from "./";

const BookingContainer = ({ data, tab, isLoading, setIsLoading }) => {
  const bookings =
    tab === "new"
      ? data?.filter((item) => item.status === "BOOKED")
      : data?.filter((item) => item.status === "CHECKEDOUT");
  console.log(data);
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      {bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <BookingItem
              data={item}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.large,
              }}
            >
              Reservations
            </Text>
          }
          style={{ marginHorizontal: 10, marginVertical: 25 }}
          ListFooterComponent={<View style={{ height: 100, width: "100%" }} />}
        />
      ) : (
        <NoResult
          text={`${
            tab === "new"
              ? "You Have No New Request"
              : "You Have No Previous Requests"
          }`}
        />
      )}
    </View>
  );
};

export default BookingContainer;
