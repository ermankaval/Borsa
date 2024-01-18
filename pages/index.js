import { Inter } from 'next/font/google'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Forex from '@/components/Forex'
import BIST from '@/components/BIST'
import Gold from '@/components/Gold'

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
          background-color: light gray;
        }
      `}</style>
      <Navbar />
      <Forex />
      {/* <h1>
        Stock Candlestick Chart
      </h1>
      <LiveChart symbol={'IBM'} /> */}
      <Gold />
      {/* <BIST /> */}
    </>
  )
}
