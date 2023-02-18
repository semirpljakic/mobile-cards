import React, { useState, useContext, useEffect, useReducer } from 'react';
import cartItems from './data';
import reducer from './reducer';

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // clearCart:
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  // remove:
  const remove = id => {
    dispatch({ type: 'REMOVE', payload: id });
  };
  // increase:
  const increase = id => {
    dispatch({ type: 'INCREASE', payload: id });
  };
  // decrease:
  const decrease = id => {
    dispatch({ type: 'DECREASE', payload: id });
  };
  //fetchData:
  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    const responsive = await fetch(url);
    const cart = await responsive.json();
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart });
  };

  // REFACTORING:
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);
  return (
    <AppContext.Provider
      value={{ ...state, clearCart, remove, increase, decrease, toggleAmount }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
