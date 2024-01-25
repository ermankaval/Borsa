import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const useCurrencyContext = () => useContext(CurrencyContext);

const CurrencyProvider = ({ children }) => {
    const [selectedCurrencies, setSelectedCurrencies] = useState([]);

    const addSelectedCurrency = (currency) => {
        setSelectedCurrencies((prevCurrencies) => [...prevCurrencies, currency]);
    };

    return (
        <CurrencyContext.Provider value={{ state: { selectedCurrencies }, addSelectedCurrency }}>
            {children}
        </CurrencyContext.Provider>

    );
};

export default CurrencyProvider;
