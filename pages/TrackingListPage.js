
import React, { useEffect } from 'react';
import { useCurrencyContext } from '../components/CurrencyContext';
import Navbar from '../components/Navbar';

const TrackingListPage = () => {
    const { state } = useCurrencyContext();
    const selectedCurrencies = state.selectedCurrencies;

    useEffect(() => {
        console.log('Selectedd Currencies:', selectedCurrencies);
    }, [selectedCurrencies]);

    return (
        <div>
            {/* <Navbar /> */}
            <div className="flex flex-col items-center container mx-auto mt-4 h-screen w-full lg:w-1/2 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Tracking List</h2>
                <div className="max-h-96 overflow-auto mb-4">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b cursor-pointer">Currency</th>
                                <th className="py-2 px-4 border-b cursor-pointer">Rate</th>
                                <th className="py-2 px-4 border-b cursor-pointer">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCurrencies.map((currency, index) => ((
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">{currency.currency}</td>
                                    <td className="py-2 px-4 border-b">{parseFloat(currency.rate).toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b">{parseFloat(currency.change).toFixed(2)}</td>
                                </tr>
                            ))
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TrackingListPage;
