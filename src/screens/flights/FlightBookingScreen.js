import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TIQWA_API_TOKEN } from "../../../constants/ApiKeys";
import axios from "axios";
import {
  FormatedNumber,
  LineDivider,
  SubHeader,
  TransparentSpinner,
} from "../../components";
import { containerDark } from "../../../constants/layouts";
import { Picker } from "@react-native-picker/picker";
import { FONTS, SIZES, colors, fonts } from "../../../constants/theme";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import { countries } from "../../../constants/allCountries";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  getAirportWithCode,
  getCityWithCode,
  getCountryWithCode,
  getSplitedTime,
  getWordDate,
} from "../../../constants/functions";
import { SecBtn } from "../../components/Forms";
import {
  daysList,
  expiryYearList,
  monthsList,
  recentYearList,
  yearList,
} from "../../../constants/yearmonthday";
import Spinner from "react-native-loading-spinner-overlay";

const FlightBookingScreen = () => {
  const [formData, setFormData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [customInput, setCustomInput] = useState({
    passenger_type: "",
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    title: "",
    email: "",
    phone_number: "",
    country_code: "+234",
    temp_number: "",
    year: "",
    month: "",
    day: "",
    documents: {
      number: "",
      issuing_date: "",
      expiry_date: "",
      issuing_country: "",
      nationality_country: "",
      document_type: "passport",
      holder: true,
      isYear: "",
      isMonth: "",
      isDay: "",
      exYear: "",
      exMonth: "",
      exDay: "",
    },
  });
  const [details, setDetails] = useState(null);
  const [onLoading, setOnLoading] = useState(false);
  const [numberOfForms, setNumberOfForms] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmCountryCode, setConfirmCountryCode] = useState("+234");
  const [confirmNumber, setConfirmNumber] = useState("");
  const [formCont, setFormCont] = useState([]);
  const [passengerInfo, setPassengerInfo] = useState({});
  const route = useRoute();
  const navigation = useNavigation();
  const { flight_id } = route?.params;
  const titleItems = [
    "Mr",
    "Ms",
    "Mrs",
    "Sir",
    "Dr",
    "HRH",
    "Hon",
    "Pst",
    "Sen",
    "Mallam",
    "Mallama",
  ];
  const getFlightDetails = async () => {
    const options = {
      method: "GET",
      url: `https://sandbox.tiqwa.com/v1/flight/confirm_price/${flight_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TIQWA_API_TOKEN}`,
      },
    };
    setOnLoading(true);
    axios
      .request(options)
      .then(function (response) {
        setDetails(response.data);
        setNumberOfForms(response?.data?.travelers_price?.length);
        setFormCont(response?.data?.travelers_price);
        setOnLoading(false);
      })
      .catch(function (error) {
        console.error(error.message);
        setOnLoading(false);
        navigation.goBack();
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Error Occured while getting Flight Details",
          text2: "Please Try Again",
        });
      });
  };
  useEffect(() => {
    getFlightDetails();
  }, []);
  useEffect(() => {
    const newArray = formCont?.map((item) => ({
      ...item,
      ...customInput,
    }));
    setFormData(newArray);
  }, [formCont]);

  const handleInputChange = (value, index, field) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };
  const handleDocumentInputChange = (value, index, field, subField) => {
    const newFormData = JSON.parse(JSON.stringify(formData));
    newFormData[index][field][subField] = value;
    setFormData(newFormData);
  };

  const handlePickerChange = (itemValue, index, field, subField = null) => {
    const newFormData = JSON.parse(JSON.stringify(formData));

    if (subField) {
      newFormData[index][field][subField] = itemValue;
    } else {
      newFormData[index][field] = itemValue;
    }
    setFormData(newFormData);
  };
  const handleDocumentPickerChange = (value, index, field, subField) => {
    const newFormData = [...formData];
    if (!newFormData[index][field]) {
      newFormData[index][field] = {};
    }
    newFormData[index][field][subField] = value;
    setFormData(newFormData);
    console.log(newFormData);
  };
  useEffect(() => {}, [details]);
  function getSplitedDate(timeStamp) {
    const tempDate = timeStamp?.split("T");
    return tempDate[0];
  }
  const renderForm = (index, item) => {
    const {
      passenger_type,
      first_name,
      last_name,
      dob,
      gender,
      title,
      email,
      phone_number,
      country_code,
      temp_number,
      year,
      month,
      day,
    } = item;
    // const { isMonth, isYear, isDay, exMonth, exYear, exDay } = item?.documents
    let tempPassengerType = "";
    if (item !== undefined) {
      tempPassengerType = Object.keys(item)[0];
    }
    item.passenger_type = tempPassengerType;
    if (year && month && day) {
      let tempDate = `${year}-${month}-${day}`;
      item.dob = tempDate;
    }

    if (
      details?.document_required &&
      item?.documents?.isYear &&
      item?.documents?.isMonth &&
      item?.documents?.isDay
    ) {
      let tempDate = `${item?.documents?.isYear}-${item?.documents?.isMonth}-${item?.documents?.isDay}`;
      item.documents.issuing_date = tempDate;
    }
    if (
      details?.document_required &&
      item?.documents?.exYear &&
      item?.documents?.exMonth &&
      item?.documents?.exDay
    ) {
      let tempDate = `${item?.documents?.exYear}-${item?.documents?.exMonth}-${item?.documents?.exDay}`;
      item.documents.expiry_date = tempDate;
    }

    if (temp_number?.length === 10 && country_code) {
      let tempPhoneNumber = `${country_code}${temp_number}`;
      item.phone_number = tempPhoneNumber;
    }
    return (
      <View>
        <Text
          style={{
            textTransform: "capitalize",
            fontSize: 18,
            color: colors.primary,
            paddingVertical: 10,
            fontWeight: 500,
          }}
        >
          passenger {index + 1} ({tempPassengerType})
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: colors.darkSecondary,
              borderRadius: 10,
              // marginVertical: 4,
              // paddingHorizontal: 4,
              width: "40%",
              borderTopEndRadius: 0,
              borderBottomEndRadius: 0,
            }}
          >
            <Picker
              style={{
                height: 50,
                width: "100%",
                fontSize: 12,
              }}
              selectedValue={item.title}
              onValueChange={(value) =>
                handleInputChange(value, index, "title")
              }
            >
              <Picker.Item label="Title" value="" style={{ fontSize: 12 }} />
              {titleItems.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item}
                  value={item}
                  style={{ fontSize: 12 }}
                />
              ))}
            </Picker>
          </View>
          <TextInput
            placeholder="First Name as on Int'l Passport"
            value={item.first_name}
            onChangeText={(text) =>
              handleInputChange(text, index, "first_name")
            }
            style={{
              color: colors.secondary,
              width: "60%",
              paddingHorizontal: 15,
              paddingVertical: 11,
              borderColor: colors.darkSecondary,
              borderWidth: 1,
              fontWeight: "600",
              borderRadius: 10,
              backgroundColor: "white",
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              marginVertical: 10,
            }}
          />
        </View>
        <TextInput
          placeholder="Last Name as on Int'l Passport"
          value={item.last_name}
          onChangeText={(text) => handleInputChange(text, index, "last_name")}
          style={{
            color: colors.secondary,
            width: "100%",
            paddingHorizontal: 15,
            paddingVertical: 11,
            borderColor: colors.darkSecondary,
            borderWidth: 1,
            fontWeight: "600",
            borderRadius: 10,
            backgroundColor: "white",
            marginVertical: 10,
          }}
        />
        <TextInput
          placeholder="Email Address"
          value={item.email}
          onChangeText={(text) => handleInputChange(text, index, "email")}
          style={{
            color: colors.secondary,
            width: "100%",
            paddingHorizontal: 15,
            paddingVertical: 11,
            borderColor: colors.darkSecondary,
            borderWidth: 1,
            fontWeight: "600",
            borderRadius: 10,
            backgroundColor: "white",
            marginVertical: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: colors.darkSecondary,
              borderRadius: 10,
              // marginVertical: 4,
              // paddingHorizontal: 4,
              width: "40%",
              borderTopEndRadius: 0,
              borderBottomEndRadius: 0,
              borderRightWidth: 0,
            }}
          >
            <Picker
              style={{
                height: 50,
                width: "100%",
                fontSize: 16,
              }}
              selectedValue={item.country_code}
              onValueChange={(value) =>
                handleInputChange(value, index, "country_code")
              }
            >
              <Picker.Item label="+234" value="+234" style={{ fontSize: 16 }} />
              {countries.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.dial_code}
                  value={item.dial_code}
                  style={{ fontSize: 16 }}
                />
              ))}
            </Picker>
          </View>
          <TextInput
            value={item.temp_number}
            placeholder="Phone Number"
            onChangeText={(text) =>
              handleInputChange(text, index, "temp_number")
            }
            maxLength={10}
            keyboardType="numeric"
            style={{
              color: colors.secondary,
              width: "60%",
              paddingHorizontal: 15,
              paddingVertical: 11,
              borderColor: colors.darkSecondary,
              borderWidth: 1,
              fontWeight: "600",
              borderRadius: 10,
              backgroundColor: "white",
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              marginVertical: 10,
              borderLeftWidth: 0,
            }}
          />
        </View>
        {/* Date Picker */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginVertical: 15,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.darkSecondary,
          }}
        >
          {/* Year */}
          <View
            style={{
              width: "35%",
            }}
          >
            <Picker
              style={{
                height: 50,
                width: "100%",
                fontSize: 12,
              }}
              selectedValue={item.year}
              onValueChange={(value) =>
                handlePickerChange(value, index, "year")
              }
            >
              <Picker.Item label="Year" value="" style={{ fontSize: 12 }} />
              {yearList.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item}
                  value={item}
                  style={{ fontSize: 16 }}
                />
              ))}
            </Picker>
          </View>
          {/* Month */}
          <View
            style={{
              width: "35%",
            }}
          >
            <Picker
              style={{
                height: 50,
                width: "100%",
                fontSize: 12,
              }}
              selectedValue={item.month}
              onValueChange={(value) =>
                handlePickerChange(value, index, "month")
              }
            >
              <Picker.Item label="Month" value="" style={{ fontSize: 12 }} />
              {monthsList.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item}
                  value={item}
                  style={{ fontSize: 16 }}
                />
              ))}
            </Picker>
          </View>
          {/* Day */}
          <View
            style={{
              width: "30%",
            }}
          >
            <Picker
              style={{
                height: 50,
                width: "100%",
                fontSize: 12,
              }}
              selectedValue={item.day}
              onValueChange={(value) => handlePickerChange(value, index, "day")}
            >
              <Picker.Item label="Day" value="" style={{ fontSize: 10 }} />
              {daysList.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item}
                  value={item}
                  style={{ fontSize: 12 }}
                />
              ))}
            </Picker>
          </View>
        </View>
        {/* Gender */}
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: colors.darkSecondary,
            borderRadius: 10,
            // marginVertical: 4,
            // paddingHorizontal: 4,
            width: "100%",
          }}
        >
          <Picker
            style={{
              height: 50,
              width: "100%",
              fontSize: 14,
            }}
            selectedValue={item.gender}
            onValueChange={(value) =>
              handlePickerChange(value, index, "gender")
            }
          >
            <Picker.Item label="Gender" value="" style={{ fontSize: 14 }} />
            <Picker.Item label="Male" value="male" style={{ fontSize: 14 }} />
            <Picker.Item
              label="Female"
              value="female"
              style={{ fontSize: 14 }}
            />
          </Picker>
        </View>
        {/* Document Required */}
        {details?.document_required && (
          <View>
            <Text
              style={{
                textTransform: "capitalize",
                fontSize: 20,
                color: colors.primary,
                paddingVertical: 20,
                fontWeight: 500,
              }}
            >
              Int'l Passport Details
            </Text>
            {/* Passport Number */}
            <TextInput
              value={item?.documents?.number}
              placeholder="Passport Number"
              onChangeText={(text) =>
                handleDocumentInputChange(text, index, "documents", "number")
              }
              keyboardType="numeric"
              style={{
                color: colors.secondary,
                width: "100%",
                paddingHorizontal: 15,
                paddingVertical: 11,
                borderColor: colors.darkSecondary,
                borderWidth: 1,
                fontWeight: "600",
                borderRadius: 10,
                backgroundColor: "white",
                marginVertical: 10,
              }}
            />
            {/* Issued Date Picker */}
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              Passport Issued Date
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginVertical: 15,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.darkSecondary,
              }}
            >
              {/* Year */}
              <View
                style={{
                  width: "35%",
                }}
              >
                <Picker
                  style={{
                    height: 50,
                    width: "100%",
                    fontSize: 12,
                  }}
                  selectedValue={item?.documents?.isYear}
                  onValueChange={(value) =>
                    handlePickerChange(value, index, "documents", "isYear")
                  }
                >
                  <Picker.Item label="Year" value="" style={{ fontSize: 12 }} />
                  {recentYearList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item}
                      value={item}
                      style={{ fontSize: 16 }}
                    />
                  ))}
                </Picker>
              </View>
              {/* Month */}
              <View
                style={{
                  width: "35%",
                }}
              >
                <Picker
                  style={{
                    height: 50,
                    width: "100%",
                    fontSize: 12,
                  }}
                  selectedValue={item?.documents?.isMonth}
                  onValueChange={(value) =>
                    handlePickerChange(value, index, "documents", "isMonth")
                  }
                >
                  <Picker.Item
                    label="Month"
                    value=""
                    style={{ fontSize: 12 }}
                  />
                  {monthsList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item}
                      value={item}
                      style={{ fontSize: 16 }}
                    />
                  ))}
                </Picker>
              </View>
              {/* Day */}
              <View
                style={{
                  width: "30%",
                }}
              >
                <Picker
                  style={{
                    height: 50,
                    width: "100%",
                    fontSize: 12,
                  }}
                  selectedValue={item?.documents?.isDay}
                  onValueChange={(value) =>
                    handlePickerChange(value, index, "documents", "isDay")
                  }
                >
                  <Picker.Item label="Day" value="" style={{ fontSize: 10 }} />
                  {daysList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item}
                      value={item}
                      style={{ fontSize: 12 }}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            {/* expired Date Picker */}
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              Passport Expiry Date
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginVertical: 15,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.darkSecondary,
              }}
            >
              {/* Year */}
              <View
                style={{
                  width: "35%",
                }}
              >
                <Picker
                  style={{
                    height: 50,
                    width: "100%",
                    fontSize: 12,
                  }}
                  selectedValue={item?.documents?.exYear}
                  onValueChange={(value) =>
                    handlePickerChange(value, index, "documents", "exYear")
                  }
                >
                  <Picker.Item label="Year" value="" style={{ fontSize: 12 }} />
                  {expiryYearList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item}
                      value={item}
                      style={{ fontSize: 16 }}
                    />
                  ))}
                </Picker>
              </View>
              {/* Month */}
              <View
                style={{
                  width: "35%",
                }}
              >
                <Picker
                  style={{
                    height: 50,
                    width: "100%",
                    fontSize: 12,
                  }}
                  selectedValue={item?.documents?.exMonth}
                  onValueChange={(value) =>
                    handlePickerChange(value, index, "documents", "exMonth")
                  }
                >
                  <Picker.Item
                    label="Month"
                    value=""
                    style={{ fontSize: 12 }}
                  />
                  {monthsList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item}
                      value={item}
                      style={{ fontSize: 16 }}
                    />
                  ))}
                </Picker>
              </View>
              {/* Day */}
              <View
                style={{
                  width: "30%",
                }}
              >
                <Picker
                  style={{
                    height: 50,
                    width: "100%",
                    fontSize: 12,
                  }}
                  selectedValue={item?.documents?.exDay}
                  onValueChange={(value) =>
                    handlePickerChange(value, index, "documents", "exDay")
                  }
                >
                  <Picker.Item label="Day" value="" style={{ fontSize: 10 }} />
                  {daysList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item}
                      value={item}
                      style={{ fontSize: 12 }}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            {/* Issuing Country */}
            <Text
              style={{
                fontWeight: "500",
                fontSize: 15,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Passport Issued Country
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: colors.darkSecondary,
                borderRadius: 10,
                // marginVertical: 4,
                // paddingHorizontal: 4,
                width: "100%",
              }}
            >
              <Picker
                style={{
                  height: 50,
                  width: "100%",
                  fontSize: 14,
                }}
                selectedValue={item?.documents?.issuing_country}
                onValueChange={(value) =>
                  handlePickerChange(
                    value,
                    index,
                    "documents",
                    "issuing_country"
                  )
                }
              >
                <Picker.Item
                  label="Issuing Country"
                  value=""
                  style={{ fontSize: 16 }}
                />
                {countries.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.name}
                    value={item.code}
                    style={{ fontSize: 16 }}
                  />
                ))}
              </Picker>
            </View>
            {/* Nationality */}
            <Text
              style={{ fontWeight: "500", fontSize: 15, marginVertical: 10 }}
            >
              Nationality
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: colors.darkSecondary,
                borderRadius: 10,
                // marginVertical: 4,
                // paddingHorizontal: 4,
                width: "100%",
              }}
            >
              <Picker
                style={{
                  height: 50,
                  width: "100%",
                  fontSize: 14,
                }}
                selectedValue={item?.documents?.nationality_country}
                onValueChange={(value) =>
                  handlePickerChange(
                    value,
                    index,
                    "documents",
                    "nationality_country"
                  )
                }
              >
                <Picker.Item
                  label="Nationality"
                  value=""
                  style={{ fontSize: 16 }}
                />
                {countries.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.name}
                    value={item.code}
                    style={{ fontSize: 16 }}
                  />
                ))}
              </Picker>
            </View>
          </View>
        )}
      </View>
    );
  };
  const completeFlightBooking = async () => {
    // if (!confirmEmail || !confirmNumber || !confirmCountryCode) {
    //   Toast.show({
    //     topOffset: 60,
    //     type: "error",
    //     text1: "Confirmation Email and Number are required",
    //     text2: "Please fill in the confirmation fields",
    //   });
    // } else {
    console.log(formData);
    // }
  };
  const onHandleSubmit = async () => {
    let hasEmptyInputs;
    // Check If Its International or Local
    if (details?.document_required === true) {
      // Check if any inputs are empty
      hasEmptyInputs = formData.some(
        (item) =>
          item.passenger_type === "" ||
          item.first_name === "" ||
          item.last_name === "" ||
          item.dob === "" ||
          item.gender === "" ||
          item.title === "" ||
          item.email === "" ||
          item.phone_number === "" ||
          item.year === "" ||
          item.month === "" ||
          item.day === "" ||
          item.country_code === "" ||
          item?.documents?.number === "" ||
          // item?.documents?.issuing_date === "" ||
          item?.documents?.expiry_date === "" ||
          item?.documents?.issuing_country === "" ||
          item?.documents?.nationality_country === "" ||
          item?.documents?.isYear === "" ||
          item?.documents?.isMonth === "" ||
          item?.documents?.isDay === "" ||
          item?.documents?.exYear === "" ||
          item?.documents?.exMonth === "" ||
          item?.documents?.exDay === ""
      );
    } else {
      // Check if any inputs are empty
      hasEmptyInputs = formData.some(
        (item) =>
          item.passenger_type === "" ||
          item.first_name === "" ||
          item.last_name === "" ||
          item.dob === "" ||
          item.gender === "" ||
          item.title === "" ||
          item.email === "" ||
          item.phone_number === "" ||
          item.year === "" ||
          item.month === "" ||
          item.day === "" ||
          item.country_code === ""
      );
    }

    // If any inputs are empty, set the submitted state to true
    if (hasEmptyInputs) {
      setSubmitted(true);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "All Fields are required",
        text2: "Please fill in all Fields",
      });
    } else {
      // Remove some Properties
      formData.forEach((form, i) => {
        const propsToRemove = [
          "adult",
          "day",
          "month",
          "year",
          "country_code",
          "temp_number",
        ];
        for (let prop of propsToRemove) {
          delete form[prop];
        }
        const docsPropsToRemove = [
          "isDay",
          "isMonth",
          "isYear",
          "exDay",
          "exMonth",
          "exYear",
        ];
        for (let prop of docsPropsToRemove) {
          delete form.documents[prop];
        }
        if (details?.document_required === false) {
          delete form.documents;
        }
      });
      // Otherwise, submit the form
      let tempPassenger = {};
      tempPassenger.passengers = formData;
      console.log(tempPassenger);
      console.log("form Data", formData);
      const options = {
        method: "POST",
        url: `https://sandbox.tiqwa.com/v1/flight/book/${flight_id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${TIQWA_API_TOKEN}`,
        },
        data: tempPassenger,
      };
      // TODO: Handle form submission logic
      console.log(options.data);
      setOnLoading(true);
      await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setOnLoading(false);
          if (response.status === 200) {
            navigation.navigate("FlightPaymentSelectorScreen", {
              bookingDetails: response.data,
            });
          } else {
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Ops, No Flight Details for your Searched Details",
              text2: "Please Try Again",
            });
          }
        })
        .catch(function (error) {
          console.error(error.data);
          console.error(error);
          console.error("error Message", error.message);
          console.log(error.response.data);
          setOnLoading(false);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error Occured while Booking Flights",
            text2: "Please Try Again",
          });
        });
    }
  };

  if (details === null) return <TransparentSpinner />;
  console.log("New", details);
  return (
    <View style={{ height: "100%", width: "100%", paddingHorizontal: 10 }}>
      <Spinner visible={onLoading} />
      <ScrollView style={{ height: "100%", width: "100%" }}>
        <View style={[containerDark, {}]}>
          {/* {submitted && (
            <Text style={{ color: "red" }}>Please fill out all fields</Text>
          )} */}
          <SubHeader text={"Who's Travelling"} />
          {formData?.map((item, index) => (
            <View
              key={index}
              style={{
                borderTopWidth: index !== 0 ? 1 : 0,
                borderTopColor: colors.bgGray,
                paddingVertical: 10,
                marginVertical: 10,
              }}
            >
              {renderForm(index, item)}
            </View>
          ))}
        </View>
        {/* Confirmation Container */}
        {/* <View style={[containerDark, {}]}>
          <SubHeader text={"Where should we send your confirmation?"} />
          <View>
            <TextInput
              placeholder="Email Address"
              onChangeText={(text) => setConfirmEmail(text)}
              style={{
                color: colors.secondary,
                width: "100%",
                paddingHorizontal: 15,
                paddingVertical: 11,
                borderColor: colors.darkSecondary,
                borderWidth: 1,
                fontWeight: "600",
                borderRadius: 10,
                backgroundColor: "white",
                marginVertical: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: colors.darkSecondary,
                  borderRadius: 10,
                  // marginVertical: 4,
                  // paddingHorizontal: 4,
                  width: "40%",
                  borderTopEndRadius: 0,
                  borderBottomEndRadius: 0,
                  borderRightWidth: 0,
                }}
              >
                <Picker
                  style={{
                    height: 50,
                    width: "100%",
                    fontSize: 16,
                  }}
                  selectedValue={confirmCountryCode}
                  onValueChange={(value) => setConfirmCountryCode(value)}
                >
                  <Picker.Item
                    label="+234"
                    value="+234"
                    style={{ fontSize: 16 }}
                  />
                  {countries.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.dial_code}
                      value={item.dial_code}
                      style={{ fontSize: 16 }}
                    />
                  ))}
                </Picker>
              </View>
              <TextInput
                placeholder="Phone Number"
                onChangeText={(text) => setConfirmNumber(text)}
                keyboardType="numeric"
                style={{
                  color: colors.secondary,
                  width: "60%",
                  paddingHorizontal: 15,
                  paddingVertical: 11,
                  borderColor: colors.darkSecondary,
                  borderWidth: 1,
                  fontWeight: "600",
                  borderRadius: 10,
                  backgroundColor: "white",
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                  marginVertical: 10,
                  borderLeftWidth: 0,
                }}
              />
            </View>
          </View>
        </View> */}
        {/* Order Summary Container */}
        <View style={containerDark}>
          <Text
            style={{
              color: colors.secondary,
              fontSize: 20,
              fontWeight: "500",
              paddingBottom: 20,
            }}
          >
            Booking Summary
          </Text>
          <LineDivider />
          {/* Departure Details */}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <SubHeader text={"Departure:"} />
              <Text
                style={{
                  color: colors.gray,
                  fontSize: SIZES.medium,
                  fontWeight: "500",
                }}
              >
                {getWordDate(
                  getSplitedDate(details?.outbound[0]?.departure_time)
                )}{" "}
                - {details?.outbound_stops} Stops
              </Text>
            </View>
            <View>
              <Text style={styles.subTitle}>
                <Text style={{ color: "black" }}>
                  {getSplitedTime(details?.outbound[0]?.departure_time)}
                </Text>
                {` [${details?.outbound[0]?.airport_from}]`}
              </Text>
              <Text style={styles.subDesc}>
                {getAirportWithCode(details?.outbound[0]?.airport_from)}{" "}
                Airport, {getCityWithCode(details?.outbound[0]?.airport_from)},
                {getCountryWithCode(details?.outbound[0]?.airport_from)}
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="flight"
                size={30}
                color={"orange"}
                style={{
                  transform: [{ rotateX: "180deg" }],
                  marginVertical: 10,
                  textAlign: "center",
                }}
              />
            </View>
            <View>
              <Text style={styles.subTitle}>
                <Text style={{ color: "black" }}>
                  {getSplitedTime(
                    details?.outbound[details?.outbound?.length - 1]
                      ?.arrival_time
                  )}
                </Text>{" "}
                {"["}
                {details?.outbound[details?.outbound?.length - 1]?.airport_to}
                {"]"}
              </Text>
              <Text style={styles.subDesc}>
                {getAirportWithCode(
                  details?.outbound[details?.outbound?.length - 1]?.airport_to
                )}{" "}
                Airport,{" "}
                {getCityWithCode(
                  details?.outbound[details?.outbound?.length - 1]?.airport_to
                )}
                ,
                {getCountryWithCode(
                  details?.outbound[details?.outbound?.length - 1]?.airport_to
                )}
              </Text>
            </View>
          </View>
          <LineDivider isVertical />
          {/* Return Details, if there's */}
          {details?.inbound?.length !== 0 && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <SubHeader text={"Return:"} />
                <Text
                  style={{
                    color: colors.gray,
                    fontSize: SIZES.medium,
                    fontWeight: "500",
                  }}
                >
                  {getWordDate(
                    getSplitedDate(details?.inbound[0]?.departure_time)
                  )}{" "}
                  - {details?.inbound_stops} Stops
                </Text>
              </View>
              <View>
                <Text style={styles.subTitle}>
                  <Text style={{ color: "black" }}>
                    {getSplitedTime(details?.inbound[0]?.departure_time)}
                  </Text>
                  {` [${details?.inbound[0]?.airport_from}]`}
                </Text>
                <Text style={styles.subDesc}>
                  {getAirportWithCode(details?.inbound[0]?.airport_from)}{" "}
                  Airport, {getCityWithCode(details?.inbound[0]?.airport_from)},
                  {getCountryWithCode(details?.inbound[0]?.airport_from)}
                </Text>
              </View>
              <View>
                <MaterialIcons
                  name="flight"
                  size={30}
                  color={"orange"}
                  style={{
                    transform: [{ rotateX: "180deg" }],
                    marginVertical: 10,
                    textAlign: "center",
                  }}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>
                  <Text style={{ color: "black" }}>
                    {getSplitedTime(
                      details?.inbound[details?.inbound?.length - 1]
                        ?.arrival_time
                    )}
                  </Text>
                  {` [${
                    details?.inbound[details?.inbound?.length - 1]?.airport_to
                  }]`}
                </Text>
                <Text style={styles.subDesc}>
                  {getAirportWithCode(
                    details?.inbound[details?.inbound?.length - 1]?.airport_to
                  )}{" "}
                  Airport,{" "}
                  {getCityWithCode(
                    details?.inbound[details?.inbound?.length - 1]?.airport_to
                  )}
                  ,
                  {getCountryWithCode(
                    details?.inbound[details?.inbound?.length - 1]?.airport_to
                  )}
                </Text>
              </View>
              <LineDivider isVertical />
            </View>
          )}

          {/* Flight Base Fare */}
          <View>
            <SubHeader text={"Flight Base Fare"} />
            <View>
              {details?.price_summary?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textTransform: "capitalize",
                      fontSize: SIZES.large,
                      color: colors.gray,
                      fontWeight: "500",
                    }}
                  >
                    {item?.passenger_type}
                    {"    "}
                    <Text
                      style={{ fontSize: SIZES.small, marginHorizontal: 20 }}
                    >
                      x
                    </Text>{" "}
                    {item?.quantity}
                  </Text>
                  {/* <FormatedNumber
                    value={item?.total_price * item?.quantity}
                    size={20}
                  /> */}
                </View>
              ))}
            </View>
            <LineDivider isVertical={true} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.extraLarge,
                  color: colors.gray,
                  fontWeight: "500",
                }}
              >
                Total:
              </Text>
              <FormatedNumber
                value={details?.amount}
                size={25}
                color={colors.secondary}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Ionicons
              name="trending-up-outline"
              size={28}
              color={colors.errorColor}
            />
            <Text
              style={{ color: colors.errorColor, fontSize: 16, marginLeft: 4 }}
            >
              This Price may increase if you book later.
            </Text>
          </View>
        </View>
        <Text style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          By proceeding, I acknowledge that i have read and agree to Triluxy's
          Flight booking
        </Text>
        <View style={{ height: 100 }} />
        <View></View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <SecBtn text={`Continue `} onBtnPress={onHandleSubmit} />
      </View>
    </View>
  );
};

export default FlightBookingScreen;

const styles = StyleSheet.create({
  subTitle: {
    color: "gray",
    fontSize: SIZES.extraLarge,
    fontWeight: "500",
    textAlign: "center",
  },
  subDesc: {
    color: colors.primary,
    fontWeight: "300",
    fontSize: SIZES.large,
    textAlign: "center",
  },
});
