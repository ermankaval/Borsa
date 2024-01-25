// import { Inter } from 'react-font-inter';

import CurrencyProvider from '@/components/CurrencyContext';
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Forex3 from '@/components/Forex3'
import Forex4 from '@/components/Forex4'
import React from 'react';

// import BIST2 from '@/components/BIST2'
// import Gold from '@/components/Gold'
// import CoinList from '@/components/CoinList'
// import BIST_CollectAPI from '@/components/BIST_CollectAPI'
// import BIST_CollectAPI_2 from '@/components/BIST_CollectAPI_2'
// import LiveChart from '@/components/LiveChart'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>

      <CurrencyProvider>
        <Head>
          <title>TradERMAN</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel="icon" href='tradERMAN_ikon_.ico' />
        </Head>
        <style global jsx>{`
        body {
          background-color: lightgray;
        }
      `}</style>

        <Navbar />
        {/* <BIST_CollectAPI_2 /> */}
        <Forex3 />
        <Forex4 />

        {/* <CoinList /> */}
        {/* <LiveChart /> */}
      </CurrencyProvider>


    </>
  )
}
