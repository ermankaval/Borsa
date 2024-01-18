// Import necessary modules
import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchStockData } from './services';
import { formatStockData } from './utils';
import { candleStickOptions } from './constants';

// Dynamically import ApexCharts only on the client side
const ReactApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

// Define your functional component
const LiveChart = ({ symbol }) => {
  const [stockData, setStockData] = useState({});

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStockData(symbol);
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, [symbol]);

  // Memoize formatted data to avoid unnecessary re-renders
  const seriesData = useMemo(() => formatStockData(stockData), [stockData]);

  // Render the ApexCharts component
  return (
    <ReactApexCharts
      series={[
        {
          data: seriesData,
        },
      ]}
      options={candleStickOptions}
      type="candlestick"
    />
  );
};

export default LiveChart;
