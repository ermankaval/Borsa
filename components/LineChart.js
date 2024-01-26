import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Kapanış Fiyatı',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    });

    useEffect(() => {
        const getFormattedDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}${month}${day}000000`; // 'YYYYMMDD000000' formatına çevirme
        };

        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 90); // Bugünden 90 gün önce

        const formattedToday = getFormattedDate(today);
        const formattedStartDate = getFormattedDate(startDate);

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://web-paragaranti-pubsub.foreks.com/web-services/historical-data?userName=undefined&name=SUSD&exchange=FREE&market=N&group=F&last=300&period=1440&intraPeriod=null&isLast=false&from=${formattedStartDate}&to=${formattedToday}`
                );

                if (!response.ok) {
                    throw new Error('Veri çekme başarısız');
                }

                const data = await response.json();

                if (data && Array.isArray(data.dataSet) && data.dataSet.length > 0) {
                    const labels = data.dataSet.map((item) => new Date(item.date).toLocaleDateString());
                    const closePrices = data.dataSet.map((item) => item.close);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Dolar (90 günlük)',
                                data: closePrices,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 2,
                                pointRadius: 0,
                            },
                        ],
                    });
                } else {
                    console.error('Veri formatı uygun değil.');
                }
            } catch (error) {
                console.error('Veri çekme hatası:', error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Grafik oluştur
        const ctx = document.getElementById('lineChart');
        const myLineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
        });

        // Komponent temizlendiğinde grafik önbelleğini temizle
        return () => {
            myLineChart.destroy();
        };
    }, [chartData]);

    return (
        <div>
            <canvas id="lineChart" width="400" height="200"></canvas>
        </div>
    );
};

export default LineChart;
