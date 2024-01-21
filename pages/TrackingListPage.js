// TrackingListPage.js
import React from 'react';
import { useAppContext } from '../components/context';
import Navbar from '@/components/Navbar';

const TrackingListPage = () => {
    const { state } = useAppContext();

    return (
        <div>
            <Navbar />
            <h2>Takip Listem</h2>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Last Price</th>
                    </tr>
                </thead>
                <tbody>
                    {state.trackingList.map((quote) => (
                        <tr key={quote.code}>
                            <td>{quote.code}</td>
                            <td>{quote.lastprice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrackingListPage;
