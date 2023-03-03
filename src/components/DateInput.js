import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors, SIZES } from "../../constants/theme";
import { Fontisto } from "@expo/vector-icons";

const DateInput = ({ dateInput, setDateInput, title, width }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const getTDate = () => {
    let tempToday = new Date();
    const today =
      tempToday.getFullYear() +
      "-" +
      (tempToday.getMonth() + 1) +
      "-" +
      tempToday.getDate();
    return today;
  };
  // console.log(date.setDate(date.getDate() - 1));
  const onChangeIncomeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    setDateInput(fDate);
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: width ? width : "100%",
        borderColor: colors.darkSecondary,
        borderWidth: 1,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "gray" }}>{title}</Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 2,
        }}
      >
        <Fontisto name="date" size={26} color={colors.secondary} />
        <Text
          style={{
            fontSize: SIZES.medium,
            fontWeight: "600",
            color: colors.primary,
            paddingVertical: 5,
            marginLeft: 8,
          }}
        >
          {dateInput}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="default"
          onChange={onChangeIncomeDate}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

export default DateInput;
