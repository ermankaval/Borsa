
import React from 'react';
import { useCurrencyContext } from './CurrencyContext'

const Silinecek = () => {
    const { selectedCurrencies } = useCurrencyContext();
    console.log(selectedCurrencies)
    return (
        <div>
            <h1>Favorite Currencies</h1>
            <ul>
                {selectedCurrencies.map((currency) => (
                    <li key={currency.currency}>{currency.currency}</li>
                ))}
            </ul>
        </div>
    );
};

export default Silinecek;
