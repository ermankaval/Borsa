import { Inter } from 'next/font/google'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Forex from '@/components/Forex'
// import BIST from '@/components/BIST'
import BIST2 from '@/components/BIST2'
import Gold from '@/components/Gold'
import TradingViewWidget from '@/components/TradingViewWidget'
import CoinList from '@/components/CoinList'
import BIST_CollectAPI from '@/components/BIST_CollectAPI'
import BIST_CollectAPI_2 from '@/components/BIST_CollectAPI_2'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
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

      {/* <iframe src="https://api.genelpara.com/iframe/?symbol=doviz&doviz=USD,EUR,GBP,CHF,CAD&stil=stil-1&renk=beyaz" title="Döviz Kurları" frameborder="0" width="1000" height="70"></iframe> */}

      {/* <iframe src="https://api.genelpara.com/iframe/?symbol=para-birimleri&pb=XU100,USD,EUR,GA,BTC&stil=stil-1&renk=beyaz" title="Döviz ve Altın Fiyatları" frameborder="0" width="1000" height="70" style={{ width: '1000px', height: '70px' }}></iframe> */}


      {/* <Forex /> */}
      <BIST_CollectAPI_2 />
      {/* <CoinList /> */}
      {/* <Gold /> */}
    </>
  )
}
