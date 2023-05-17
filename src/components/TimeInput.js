import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors, SIZES } from "../../constants/theme";
import { Feather } from "@expo/vector-icons";

const TimeInput = ({ timeInput, setTimeInput, title, width }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [show, setShow] = useState(false);
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let tempHours =
      tempDate.getHours() <= 9
        ? "0" + tempDate.getHours()
        : tempDate.getHours();
    let tempMins =
      tempDate.getMinutes() <= 9
        ? "0" + tempDate.getMinutes()
        : tempDate.getMinutes();
    let fTime = tempHours + ":" + tempMins;
    setTimeInput(fTime);
    // console.log(fTime);
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
        <Feather name="clock" size={24} color={colors.secondary} />
        <Text
          style={{
            fontSize: SIZES.medium,
            fontWeight: "600",
            color: colors.primary,
            paddingVertical: 5,
            marginLeft: 8,
          }}
        >
          {timeInput}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={"time"}
          display="default"
          is24Hour={true}
          onChange={onChangeTime}
        />
      )}
    </View>
  );
};

export default TimeInput;
