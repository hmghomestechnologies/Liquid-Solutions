import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { colors } from "./constants/theme";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import "react-native-get-random-values";
import AuthContextProvider, { useAuthContext } from "./context/AuthContext";
import HotelContextProvider from "./context/HotelContext";
import WalletContextProvider from "./context/WalletContext";
import RestaurantContextProvider from "./context/RestaurantContext";
import TaxiContextProvider from "./context/TaxiContext";
import CarContextProvider from "./context/CarContext";
import RiderContextProvider from "./context/RiderContext";
import AppNavigation from "./src/navigation/AppNavigation";
import { Amplify } from "aws-amplify";

import awsconfig from "./src/aws-exports";
Amplify.configure(awsconfig);
export default function App() {
  const [loaded] = useFonts({
    OpenSansExtraBold: require("./assets/fonts/OpenSans-ExtraBold.ttf"),
    OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    OpenSansSemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
    OpenSansRegular: require("./assets/fonts/OpenSans-Regular.ttf"),
    OpenSansMedium: require("./assets/fonts/OpenSans-Medium.ttf"),
    OpenSansLight: require("./assets/fonts/OpenSans-Light.ttf"),
  });
  if (!loaded) return null;
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <WalletContextProvider>
          <HotelContextProvider>
            <RestaurantContextProvider>
              <TaxiContextProvider>
                <RiderContextProvider>
                  <CarContextProvider>
                    <StatusBar
                      backgroundColor={colors.secondary}
                      barStyle="light-content"
                    />
                    <AppNavigation />
                    <Toast />
                  </CarContextProvider>
                </RiderContextProvider>
              </TaxiContextProvider>
            </RestaurantContextProvider>
          </HotelContextProvider>
        </WalletContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
