// const VITE_API_KEY = import.meta.env.VITE_API_KEY

export const fetchStockData = async (symbol) => {
    // const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=SIJ84O9XGNRJK2G0`)
    const response = await fetch(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=TRY&apikey=XE9EV96EB38LOQHK`)
    const data = await response.json()
    return data
}