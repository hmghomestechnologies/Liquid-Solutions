import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../../constants/theme";
import {
  BookedCarDetails,
  ManageBooking,
  ManageCarRentals,
  ManageDishesOrders,
  ManageHotelReservations,
  ManageRestaurantReservations,
  ManageTaxiBookings,
  MenuOrderDetails,
  OrdersDetails,
  RestaurantBookingDetails,
  TaxiBookingDetails,
} from "../screens/Bookings";
import {
  FlightDetailsScreen,
  FlightHome,
  FlightSearchResult,
  FlightSearchScreen,
} from "../screens/flights";
import {
  HotelBookingScreen,
  HotelDetailsScreen,
  HotelHome,
  HotelPaymentScreen,
  HotelSearchScreen,
  SearchResult,
  SelectRoomScreen,
} from "../screens/hotels";
import {
  AddCarDetails,
  CarDetailsScreen,
  CarHome,
  CarInfoScreen,
  CarManageBookings,
  CarPaymentScreen,
  CarSearchResult,
  CarSearchScreen,
  FilterCarBooking,
  RentorCarDetails,
  RentorHome,
  UserManageCars,
} from "../screens/cars";
import {
  BankTransferScreen,
  PaymentScreen,
  PaypalScreen,
  UseCardScreen,
  WalletIndexScreen,
} from "../screens/wallet";
import {
  ChooseRide,
  DriverManageBooking,
  FilterTaxiBooking,
  TaxiDetailsScreen,
  TaxiDriverHome,
  TaxiHome,
  TaxiManageCar,
  TaxiPayment,
  TaxiSearchResult,
  TaxiSearchScreen,
} from "../screens/taxi";
import { useAuthContext } from "../../context/AuthContext";
import {
  BasketPaymentScreen,
  BasketScreen,
  FoodMenuIndexScreen,
  ResSearchResult,
  RestaurantDetails,
  RestaurantHome,
  SingleRestaurant,
} from "../screens/restaurants";
import { ProfileScreen } from "../screens/auth";
import {
  FilterReservations,
  ManageReservations,
  RestaurantAdminHome,
  ManageOrders,
  FilteredOrders,
  AddMenuItemScreen,
} from "../screens/restaurants/restaurant-owner";
import {
  FilterDeliveries,
  ManageRideDetails,
  ManageRiderRequest,
  RiderHome,
} from "../screens/rider";
import {
  ManageAccount,
  Notifications,
  PrivacyPolicy,
  Settings,
} from "../screens/utils";
import TermsAndConditions from "../screens/utils/TermsAndConditions";
import {
  AddHotelDetails,
  AdminHotelDetails,
  FilterBookings,
  HotelAdminHome,
  ManageBookings,
  ManageMyHotels,
} from "../screens/hotels/hotel-admin";

const Stack = createStackNavigator();
const AppStack = () => {
  const { authUser } = useAuthContext();
  console.log(authUser);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        authUser?.userRole === "User"
          ? "HotelHome"
          : authUser?.userRole === "carRentor"
          ? "CarRentorHome"
          : authUser?.userRole === "taxiDriver"
          ? "TaxiDriverHome"
          : authUser?.userRole === "rider"
          ? "RiderHome"
          : authUser?.userRole === "hotelAdmin"
          ? "HotelAdminHome"
          : "RestaurantAdminHome"
      }
    >
      {/* Flight Screens Ends Here */}
      <Stack.Screen name="FlightHome" component={FlightHome} />
      <Stack.Screen name="FlightSearchScreen" component={FlightSearchScreen} />
      <Stack.Screen name="FlightSearchResult" component={FlightSearchResult} />
      <Stack.Screen
        name="FlightDetailsScreen"
        component={FlightDetailsScreen}
      />
      {/* Flights Screen Ends HEre*/}
      {/* Hotel Screens Screens Ends Here */}
      <Stack.Screen name="HotelHome" component={HotelHome} />
      <Stack.Screen name="HotelSearchScreen" component={HotelSearchScreen} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="HotelDetailsScreen" component={HotelDetailsScreen} />
      <Stack.Screen name="SelectRoomScreen" component={SelectRoomScreen} />
      <Stack.Screen
        name="HotelBookingScreen"
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Booking Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
          headerBackTitleVisible: false,
        }}
        component={HotelBookingScreen}
      />
      <Stack.Screen name="HotelPaymentScreen" component={HotelPaymentScreen} />
      <Stack.Screen
        name="HotelAdminHome"
        component={HotelAdminHome}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Reservation Requests",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AddHotelDetails"
        component={AddHotelDetails}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Add Hotel Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="ManageMyHotels"
        component={ManageMyHotels}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage My Hotels",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="ManageHotelReservations"
        component={ManageHotelReservations}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Reservations",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="AdminHotelDetails"
        component={AdminHotelDetails}
        options={{
          headerShown: true,
          headerTitle: "Hotel Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="ManageBookings"
        component={ManageBookings}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Bookings",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="FilterBookings"
        component={FilterBookings}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Bookings",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      {/* Hotel Screenss Screen Ends HEre*/}
      {/* Car Screens Screens Ends Here */}
      <Stack.Screen name="CarHome" component={CarHome} />
      <Stack.Screen name="CarSearchScreen" component={CarSearchScreen} />
      <Stack.Screen name="CarSearchResult" component={CarSearchResult} />
      <Stack.Screen name="CarDetailsScreen" component={CarDetailsScreen} />
      <Stack.Screen name="CarPaymentScreen" component={CarPaymentScreen} />
      <Stack.Screen
        name="CarInfoScreen"
        component={CarInfoScreen}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Car Info",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="CarRentorHome"
        component={RentorHome}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Car Requests",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="CarManageBookings"
        component={CarManageBookings}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Bookings",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="FilterCarBooking"
        component={FilterCarBooking}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Bookings",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="AddCarDetails"
        component={AddCarDetails}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Add Car Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="UserManageCars"
        component={UserManageCars}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Your Cars",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="RentorCarDetails"
        component={RentorCarDetails}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Car Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      {/* Car Screenss Screen Ends HEre*/}
      {/* Taxi Screens Screens Ends Here */}
      <Stack.Screen name="TaxiHome" component={TaxiHome} />
      <Stack.Screen name="TaxiSearchScreen" component={TaxiSearchScreen} />
      <Stack.Screen name="ChooseRide" component={ChooseRide} />
      <Stack.Screen name="TaxiSearchResult" component={TaxiSearchResult} />
      <Stack.Screen name="TaxiDetailsScreen" component={TaxiDetailsScreen} />
      <Stack.Screen name="TaxiPayment" component={TaxiPayment} />
      <Stack.Screen
        name="TaxiDriverHome"
        component={TaxiDriverHome}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Request",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="DriverManageBooking"
        component={DriverManageBooking}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Bookings",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="FilterTaxiBooking"
        component={FilterTaxiBooking}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Bookings",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="TaxiManageCar"
        component={TaxiManageCar}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Taxi",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      {/* Taxi Screenss Screen Ends HEre*/}
      {/* Wallet Screens Screens Ends Here */}
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      {/* Wallet Screenss Screen Ends HEre*/}
      {/* Wallet Screens Screens Ends Here */}
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* Wallet Screenss Screen Ends HEre*/}
      {/* Bookings Screens Screens Ends Here */}
      <Stack.Screen
        name="ManageBooking"
        component={ManageBooking}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Bookings",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="ManageRestaurantReservations"
        component={ManageRestaurantReservations}
        options={{
          headerShown: true,
          headerTitle: "Restaurant Reservations",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="ManageDishesOrders"
        component={ManageDishesOrders}
        options={{
          headerShown: true,
          headerTitle: "Dishes Orders",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="ManageCarRentals"
        component={ManageCarRentals}
        options={{
          headerShown: true,
          headerTitle: "Car Rentals",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="ManageTaxiBookings"
        component={ManageTaxiBookings}
        options={{
          headerShown: true,
          headerTitle: "Taxi Bookings",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="RestaurantBookingDetails"
        component={RestaurantBookingDetails}
        options={{
          headerShown: true,
          headerTitle: "Reservation Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="OrdersDetails"
        component={OrdersDetails}
        options={{
          headerShown: true,
          headerTitle: "Orders Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="BookedCarDetails"
        component={BookedCarDetails}
        options={{
          headerShown: true,
          headerTitle: "Booking Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="TaxiBookingDetails"
        component={TaxiBookingDetails}
        options={{
          headerShown: true,
          headerTitle: "Taxi Booking Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      {/* Bookings Screenss Screen Ends HEre*/}
      {/* Restaurants Screens Screens Ends Here */}
      <Stack.Screen name="RestaurantHome" component={RestaurantHome} />
      <Stack.Screen name="ResSearchResult" component={ResSearchResult} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen
        name="SingleRestaurant"
        component={SingleRestaurant}
        options={{
          headerShown: true,
          headerTitle: "Restaurant Details",
          headerTintColor: colors.secondary,
          // headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="FoodMenuIndexScreen"
        component={FoodMenuIndexScreen}
      />
      <Stack.Screen
        name="BasketScreen"
        component={BasketScreen}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: colors.secondary,
        }}
      />
      <Stack.Screen
        name="BasketPaymentScreen"
        component={BasketPaymentScreen}
      />
      <Stack.Screen name="MenuOrderDetails" component={MenuOrderDetails} />
      {/* //Restaurant Owners */}
      <Stack.Screen
        name="RestaurantAdminHome"
        component={RestaurantAdminHome}
        options={{
          headerShown: true,
          headerTitle: "My Restaurant",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="ManageReservations"
        component={ManageReservations}
        options={{
          headerShown: true,
          headerTitle: "Manage Reservations",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="FilterReservations"
        component={FilterReservations}
        options={{
          headerShown: true,
          headerTitle: "Manage Reservations",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ManageOrders"
        component={ManageOrders}
        options={{
          headerShown: true,
          headerTitle: "Manage Orders",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="FilteredOrders"
        component={FilteredOrders}
        options={{
          headerShown: true,
          headerTitle: "Manage Orders",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AddMenuItemScreen"
        component={AddMenuItemScreen}
        options={{
          headerShown: true,
          headerTitle: "Add Menu Item",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
          headerBackTitleVisible: false,
        }}
      />

      {/* Restaurants Screenss Screen Ends HEre*/}

      {/* Wallet Screens Starts Here */}
      <Stack.Screen name="WalletIndexScreen" component={WalletIndexScreen} />
      <Stack.Screen name="PaypalScreen" component={PaypalScreen} />
      <Stack.Screen name="UseCardScreen" component={UseCardScreen} />
      <Stack.Screen
        name="BankTransferScreen"
        component={BankTransferScreen}
        options={{
          headerShown: true,
          headerTitle: "Bank Transfer",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />

      {/* Rider Screens Starts Here */}
      <Stack.Screen
        name="RiderHome"
        component={RiderHome}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Rider Home",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ManageRiderRequest"
        component={ManageRiderRequest}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Deliveries",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="FilterDeliveries"
        component={FilterDeliveries}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Manage Deliveries",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ManageRideDetails"
        component={ManageRideDetails}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Delivery Details",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
          headerBackTitleVisible: false,
        }}
      />
      {/* Other Screens Starts Here */}
      <Stack.Screen
        name="ManageAccount"
        component={ManageAccount}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Profile Details",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Notifications",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Settings",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Privacy Policy",
          headerTintColor: colors.secondary,
          headerStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerTitle: "Terms & Conditions",
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
      {/* Other Screens Ends Here */}
    </Stack.Navigator>
  );
};

export default AppStack;
