import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { WelcomeScreen } from "../screens";
import {
  ForgetPassword,
  LoginScreen,
  OTPScreen,
  RegisterScreen,
  UserSelectorScreen,
  VerificationScreen,
} from "../screens/auth";
import { HotelHome } from "../screens/hotels";

const NewAuthStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={LoginScreen}
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="UserSelectorScreen" component={UserSelectorScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="HotelHome" component={HotelHome} />
    </Stack.Navigator>
  );
};

export default NewAuthStack;
