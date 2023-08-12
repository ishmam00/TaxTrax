import React, { useContext, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [error, setError] = useState(null);

  //calculate incomes
  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };
  const categoryIncome = (category) => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      if (income.category === category) {
        totalIncome = totalIncome + income.amount;
      }
    });
    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (expense) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, expense)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data);
    console.log(response.data);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense = totalExpense + expense.amount;
    });

    return totalExpense;
  };

  const categoryExpenses = (category) => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      if (expense.category === category) {
        totalExpense = totalExpense + expense.amount;
      }
    });
    return totalExpense;
  };

  const addTax = async (tax) => {
    const response = await axios
      .post(`${BASE_URL}add-tax`, tax)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getTaxes();
  };

  const getTaxes = async () => {
    const response = await axios.get(`${BASE_URL}get-tax`);
    setTaxes(response.data);
    console.log(response.data);
  };

  const deleteTax = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-tax/${id}`);
    getTaxes();
  };

  const categoryTaxes = (category) => {
    let totalTax = 0;
    taxes.forEach((tax) => {
      if (tax.category === category) {
        totalTax = totalTax + tax.amount;
      }
    });
    return totalTax;
  };

  const totalTaxes = () => {
    let totalTax = 0;

    incomes.forEach((income) => {
      totalTax =
        totalTax + (income.amount * categoryTaxes(income.category)) / 100;
    });
    return totalTax;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history;
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        categoryIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        categoryExpenses,
        addTax,
        getTaxes,
        taxes,
        deleteTax,
        totalTaxes,
        categoryTaxes,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
