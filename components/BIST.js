import React, { useState, useEffect } from 'react';

const BIST = () => {
    const [hisse, setHisse] = useState({ rate: '', loading: true });

    const fetchData = async (setState) => {
        try {
            const url = 'https://api.collectapi.com/economy/liveBorsa';
            const options = {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "authorization": "apikey 3HS07jD2MtstjfOkuxsw2A:6ZtSt2wk5HMIp5Bx5dAhAd"
                },
            };

            const response = await fetch(url, options);
            const data = await response.json();

            if (data.success && Array.isArray(data.result) && data.result.length > 0) {
                const { buying = 'N/A' } = data.result[0];
                setState({ rate: buying, loading: false });
            } else {
                console.error("API'den beklenen veri alınamadı");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(setHisse);
    }, []);

    return (
        <div className="flex flex-wrap gap-4 mt-4">
            <a href="#" className="flex-shrink-0 w-[calc(33.33%-16px)] h-[calc(30%-16px)] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
                <h5 className="mb-2 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">ALTIN(Gram)</h5>
                <h5 className="mb-2 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-800 dark:text-white">{hisse.loading ? 'Loading...' : parseFloat(hisse.rate).toFixed(2)}</h5>
            </a>
        </div>
    );
};

export default BIST;
