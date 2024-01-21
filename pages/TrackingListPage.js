// TrackingListPage.js
import React from 'react';
import { useAppContext } from '../components/context';
import Navbar from '@/components/Navbar';

const TrackingListPage = () => {
    const { state } = useAppContext();

    return (
        <div>
            <Navbar />
            <h2 className="text-2xl font-bold mb-4">Takip Listem</h2>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border p-2 text-center">Code</th>
                        <th className="border p-2 text-center">Last Price</th>
                    </tr>
                </thead>
                <tbody>
                    {state.trackingList.map((quote) => (
                        <tr key={quote.code} className="bg-gray-50">
                            <td className="border p-2 text-center">{quote.code}</td>
                            <td className="border p-2 text-center">{quote.lastprice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrackingListPage;
