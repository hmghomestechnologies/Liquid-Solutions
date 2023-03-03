import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import baseURL from "../constants/baseURL";
import { useAuthContext } from "./AuthContext";
const RiderContext = createContext({});

const RiderContextProvider = ({ children }) => {
  const [riderBookings, setRiderBookings] = useState(null);
  const [rider, setRider] = useState(null);
  return (
    <RiderContext.Provider
      value={{
        rider,
        setRider,
        riderBookings,
        setRiderBookings,
      }}
    >
      {children}
    </RiderContext.Provider>
  );
};

export default RiderContextProvider;

export const useRiderContext = () => useContext(RiderContext);
