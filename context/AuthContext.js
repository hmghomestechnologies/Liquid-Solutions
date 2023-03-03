import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import baseURL from "../constants/baseURL";
import Toast from "react-native-toast-message";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const navigation = useNavigation();
  const saveUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
      if (value.userRole === "resAdmin") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    } catch (e) {
      // saving error
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Error occur!!!",
        text2: "Please Try Again",
      });
      console.log(e);
    }
  };
  const onLogout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("user");
      setAuthUser(null);
      console.log(authUser);
      setIsLoading(false);

      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });

      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "User Logout Succesfully",
        text2: "Please Login to Access Your Account",
      });
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Error Occured",
        text2: "Please Try Again",
      });
      console.log(error);
      setIsLoading(false);
    }
  };
  const Login = (user) => {
    setIsLoading(true);
    axios
      .post(`${baseURL}/user/login`, user)
      .then((res) => {
        saveUser(res.data);
        setAuthUser(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Invalid Emaill or Password",
          text2: "Please Try Again",
        });
        setIsLoading(false);
      });
  };
  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let tempUserInfo = await AsyncStorage.getItem("user");
      if (tempUserInfo) {
        setAuthUser(JSON.parse(tempUserInfo));
      } else {
        setAuthUser(null);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log("is Logged Error ", e);
    }
  };
  useEffect(() => {
    // getUser();
    // getUserInfo();
    isLoggedIn();
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };

  const userId = authUser?._id;

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        userInfo,
        onLogout,
        isLoading,
        Login,
        authUser,
        splashLoading,
        setSplashLoading,
        config,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
