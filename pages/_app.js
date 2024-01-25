// pages/_app.js

// import { AppProvider } from '../components/context';
import CurrencyProvider from '@/components/CurrencyContext';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CurrencyProvider>
      {/* <AppProvider> */}
      <Component {...pageProps} />
      {/* </AppProvider> */}
    </CurrencyProvider>
  );
}

export default MyApp;
