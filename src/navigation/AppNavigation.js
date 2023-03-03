import { View, Text } from "react-native";
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import AppStack from "./AppStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import NewAuthStack from "./NewAuthStack";

const AppNavigation = () => {
  const { authUser, splashLoading } = useAuthContext();
  const Stack = createNativeStackNavigator();
  return (
    <>
      {splashLoading ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : authUser ? (
        <AppStack />
      ) : (
        <NewAuthStack />
      )}
    </>
  );
};

export default AppNavigation;
