import React, { createContext, useContext, useReducer } from 'react';

// Action Types
const ADD_SELECTED_CURRENCY = 'ADD_SELECTED_CURRENCY';

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_SELECTED_CURRENCY:
            return {
                ...state,
                selectedCurrencies: [...state.selectedCurrencies, action.payload],
            };
        default:
            return state;
    }
};

const CurrencyContext = createContext();

export const useCurrencyContext = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrencyContext must be used within a CurrencyProvider');
    }
    return context;
};

const CurrencyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        selectedCurrencies: [], // Buradaki özelliği ekledik
    });

    const addSelectedCurrency = (currency) => {
        dispatch({ type: ADD_SELECTED_CURRENCY, payload: currency });
    };

    return (
        <CurrencyContext.Provider value={{ state, addSelectedCurrency, dispatch }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export default CurrencyProvider;