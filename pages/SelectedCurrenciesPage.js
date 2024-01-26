// SelectedCurrenciesPage.js
import React from 'react';
import { useCurrencyContext } from '../components/CurrencyContext';
import Navbar from '@/components/Navbar';


const SelectedCurrenciesPage = () => {
    const { state } = useCurrencyContext();
    const selectedCurrencies = state.selectedCurrencies;

    return (

        <div>
            {/* <Navbar /> */}
            <h2>Selected Currencies</h2>
            <ul>
                {selectedCurrencies.map((currency) => (
                    <li key={currency.currency}>{currency.currency}</li>
                ))}
            </ul>
        </div>
    );
};

export default SelectedCurrenciesPage;
