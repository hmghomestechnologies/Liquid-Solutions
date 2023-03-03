import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import baseURL from "../constants/baseURL";
import { useAuthContext } from "./AuthContext";
const TaxiContext = createContext({});

const TaxiContextProvider = ({ children }) => {
  const [rides, setRides] = useState(null);
  const [destination, setDestination] = useState({
    location: null,
    description: null,
  });
  const [origin, setOrigin] = useState({
    location: null,
    description: null,
  });
  const [pickupDate, setPickupDate] = useState("Choose Date");
  const [pickupTime, setPickupTime] = useState("Pickup Time");
  const [travelTimeInformation, setTravelTimeInformation] = useState(null);
  const [travelPrice, setTravelPrice] = useState(null);
  const [availableDrivers, setAvailableDrivers] = useState(null);
  const [driverBookings, setDriverBookings] = useState(null);
  const [rideCity, setRideCity] = useState(null);
  const [driver, setDriver] = useState(null);
  const { authUser } = useAuthContext();
  useEffect(() => {
    (async () => {
      if (authUser) {
        const config = {
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        };
        await axios
          .get(`${baseURL}/taxi/rides`, config)
          .then((res) => {
            setRides(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        await axios
          .get(`${baseURL}/taxi/drivers-available`, config)
          .then((res) => {
            setAvailableDrivers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        return () => {
          setRides([]);
          setAvailableDrivers([]);
        };
      }
    })();
  }, [authUser]);
  return (
    <TaxiContext.Provider
      value={{
        rides,
        availableDrivers,
        origin,
        setOrigin,
        destination,
        setDestination,
        pickupDate,
        setPickupDate,
        pickupTime,
        setPickupTime,
        travelTimeInformation,
        setTravelTimeInformation,
        travelPrice,
        setTravelPrice,
        rideCity,
        setRideCity,
        driverBookings,
        setDriverBookings,
        driver,
        setDriver,
      }}
    >
      {children}
    </TaxiContext.Provider>
  );
};

export default TaxiContextProvider;

export const useTaxiContext = () => useContext(TaxiContext);
