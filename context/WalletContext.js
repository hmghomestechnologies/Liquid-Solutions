import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import baseURL from "../constants/baseURL";
import { useAuthContext } from "./AuthContext";
const WalletContext = createContext({});

const WalletContextProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);
  const [walletBal, setWalletBal] = useState(null);
  const [debits, setDebits] = useState([]);
  const [credits, setCredits] = useState([]);
  const [creditsTotal, setCreditsTotal] = useState(0);
  const [debitsTotal, setDebitsTotal] = useState(0);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const config = {
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      };
      axios
        .get(`${baseURL}/wallet/user-transactions`, config)
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      setTransactions([]);
    };
  }, [authUser]);
  useEffect(() => {
    if (transactions) {
      const tempCredits = transactions.filter(
        (item) => item.transType === "CREDIT"
      );
      setCredits(tempCredits);
      const tempDebits = transactions.filter(
        (item) => item.transType === "DEBIT"
      );
      setDebits(tempDebits);
    }
  }, [transactions]);
  useEffect(() => {
    if (debits || credits) {
      //   setWalletBal(0);
      //   return;
      // } else {
      let sumCredit = 0;
      credits.forEach((number) => {
        sumCredit += number.amount;
      });

      let sumDebit = 0;
      debits.forEach((number) => {
        sumDebit += number.amount;
      });

      setWalletBal(sumCredit - sumDebit);
      // console.log(sumCredit);
    }
  }, [debits, credits]);
  // console.log(creditsTotal, debitsTotal);
  // console.log(walletBal);
  return (
    <WalletContext.Provider
      value={{ walletBal, credits, debits, transactions, setTransactions }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;

export const useWalletContext = () => useContext(WalletContext);
