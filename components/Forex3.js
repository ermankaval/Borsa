import React, { useState, useEffect } from 'react';

const Main = () => {
    const [usdTry, setUsdTry] = useState({ rate: '', change: '', loading: true });
    const [eurTry, setEurTry] = useState({ rate: '', change: '', loading: true });
    const [gbpTry, setGbpTry] = useState({ rate: '', change: '', loading: true });
    const [goldTry, setGoldTry] = useState({ rate: '', change: '', loading: true });

    const fetchData = async (currency, setState) => {
        try {
            const url = 'https://finans.truncgil.com/today.json';

            const options = {
                method: 'GET',
                headers: {},
            };

            const response = await fetch(url, options);
            const result = await response.json();
            // console.log(result.gram - altin);

            if (result && result[currency] && result[currency].Satış !== undefined) {
                setState({
                    rate: result[currency].Satış,
                    change: result[currency].Değişim,
                    loading: false
                });
            } else {
                console.error(`Invalid response format or missing "${currency}" data`);
                setState({ rate: 'Error', change: 'Error', loading: false });
            }
        } catch (error) {
            console.error(error);
            setState({ rate: 'Error', change: 'Error', loading: false });
        }
    };

    useEffect(() => {
        fetchData('USD', setUsdTry);
        fetchData('EUR', setEurTry);
        fetchData('GBP', setGbpTry);
        fetchData('gram-altin', setGoldTry);
    }, []);

    return (
        <div className="flex flex-wrap gap-4 mt-4">
            <CurrencyCard currency="DOLAR" rate={usdTry.rate} change={usdTry.change} loading={usdTry.loading} />
            <CurrencyCard currency="EURO" rate={eurTry.rate} change={eurTry.change} loading={eurTry.loading} />
            <CurrencyCard currency="STERLIN" rate={gbpTry.rate} change={gbpTry.change} loading={gbpTry.loading} />
            <CurrencyCard currency="Gram-altın" rate={goldTry.rate} change={goldTry.change} loading={goldTry.loading} />
        </div>
    );
};

const CurrencyCard = ({ currency, rate, change, loading }) => {
    const arrowColor = change < 0 ? 'red' : 'green';
    const arrowSymbol = change < 0 ? '▼' : '▲';

    return (
        <div className="flex-shrink-0 w-[calc(25%-16px)] h-[calc(30%-16px)] p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
            <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">{currency}</h5>
            <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-800 dark:text-white">
                {loading ? 'Loading...' : parseFloat(rate.replace(',', '.')).toFixed(2)}
                <span style={{ color: arrowColor, marginLeft: '5px', fontSize: '20px' }}>{loading ? '' : arrowSymbol}</span>
            </h5>
            <p className={`text-sm text-${arrowColor === 'red' ? 'red' : 'green'}-600 dark:text-gray-400`}>
                {loading ? 'Loading...' : change}
            </p>
        </div>
    );
};


export default Main;
