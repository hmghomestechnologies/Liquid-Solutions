import { View, SafeAreaView } from "react-native";
import { NewPreviousTab, TransparentSpinner } from "../../components";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import baseURL from "../../../constants/baseURL";
import DishesOrdersContainer from "../../components/booking-components/DishesOrdersContainer";

const ManageDishesOrders = () => {
  const [onNew, setOnNew] = useState(true);
  const [onPrevious, setOnPrevious] = useState(false);
  const [orders, setOrders] = useState(null);

  const { authUser } = useAuthContext();
  const config = {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${baseURL}/restaurant/orders/${authUser?._id}`, config)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return () => {
        setOrders([]);
      };
    };
    fetchData();
  }, []);
  if (orders === null) return <TransparentSpinner />;
  return (
    <SafeAreaView>
      <View>
        <NewPreviousTab
          onNew={onNew}
          setOnNew={setOnNew}
          onPrevious={onPrevious}
          setOnPrevious={setOnPrevious}
          newTabText="New Orders"
          prevTabText="Previous Orders"
        />
      </View>
      {onNew ? (
        <DishesOrdersContainer data={orders} tab="new" />
      ) : (
        <DishesOrdersContainer data={orders} tab="previous" />
      )}
    </SafeAreaView>
  );
};

export default ManageDishesOrders;
