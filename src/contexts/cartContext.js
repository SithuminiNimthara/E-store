import React, { createContext, useReducer} from 'react'
import { CartReducer } from './cartReducer';
import { type } from '@testing-library/user-event/dist/type';

export const CartContext = createContext();

const Storage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];

const initialState = { cartItems: Storage}

const CartContextProvider = ({children}) => {
   const [state, dispatch] = useReducer(CartReducer, initialState);

    const addProduct = payload =>{
        dispatch({type: "ADD", payload });
        return state.cartItems;
    }

    const removeProduct = payload => {
        dispatch({type: "REMOVE", payload});
        return state.cartItems;
    }

    const increaseQuantity = payload => {
        dispatch({type: "INQTY", payload});
        return state.cartItems;
    }

    const decreaseQuantity = payload => {
        dispatch({type: "DECQTY", payload});
        return state.cartItems;
    }

    const clearBasket = () => {
        dispatch({type: "CLEAR", payload: null});
        return state.cartItems;
    }

    const getItems = () => {
        return state.cartItems;
    }

    const contextValue = {
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        clearBasket,
        getItems,
        ...state
    }
    return (
        <CartContext.Provider value={contextValue}>
          {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider