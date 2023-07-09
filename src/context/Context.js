import React, { useContext, useReducer } from 'react';
import { createContext } from 'react';
import { products } from '../utils/Product';
import { cartReducer } from './Reducer';
import { filterReducer } from './Reducer';

const Cart = createContext()

const Context = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: []
  });

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byStock: false,
    byFastDelivery:false,
    byRating:0,
    searchQuery:"",
  })

  return (
    <Cart.Provider value={{state, dispatch, filterState, filterDispatch}}>
        {children}
    </Cart.Provider>
  )
}

export default Context;

export const CartState = () => {
  return useContext(Cart);
}