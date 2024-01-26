import React, { useState, useEffect } from 'react';
import { useCurrencyContext } from './CurrencyContext';

const Forex4 = () => {
    const [currencyData, setCurrencyData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [filterOption, setFilterOption] = useState('all'); // 'all', 'rising', 'falling'
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

    const { state, dispatch } = useCurrencyContext();
    const selectedCurrencies = state.selectedCurrencies;

    const fetchData = async () => {
        try {
            const url = 'https://finans.truncgil.com/v4/today.json';
            const options = {
                method: 'GET',
                headers: {},
            };

            const response = await fetch(url, options);
            const result = await response.json();

            if (result && result['Update_Date']) {
                const data = Object.keys(result)
                    .filter((currencyKey) => currencyKey.toLowerCase() !== 'update_date')
                    .map((currencyKey) => ({
                        currency: currencyKey,
                        rate: result[currencyKey].Selling,
                        change: result[currencyKey].Change,
                        loading: false,
                        isStarred: false,
                    }));

                setCurrencyData(data);
            } else {
                console.error('Invalid response format or missing data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePlusClick = (currency) => {
        if (state.selectedCurrencies.some((c) => c.currency === currency.currency)) {
            // Eğer currency zaten seçilmişse, listeden kaldır
            dispatch({
                type: 'REMOVE_SELECTED_CURRENCY',
                payload: currency,
            });
        } else {
            // Eğer currency henüz seçilmemişse, listeye ekle
            dispatch({
                type: 'ADD_SELECTED_CURRENCY',
                payload: { ...currency, isStarred: true },
            });
        }
        setCurrencyData((prevData) =>
            prevData.map((item) =>
                item.currency === currency.currency ? { ...item, isStarred: !item.isStarred } : item
            )
        );
    };

    const filteredData = currencyData.filter((currency) => currency.currency.toLowerCase() !== 'update_date');

    const filteredAndSortedData = filteredData.filter((currency) => {
        const changeValue = currency.change;
        if (filterOption === 'rising') {
            return !changeValue.includes('-');
        } else if (filterOption === 'falling') {
            return changeValue.includes('-');
        }
        return true;
    });

    const sortedData = filteredAndSortedData.sort((a, b) => {
        const changeA = parseFloat(a.change);
        const changeB = parseFloat(b.change);

        if (sortOrder === 'asc') {
            return changeA - changeB;
        } else {
            return changeB - changeA;
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    const handleItemsPerPageChange = (e) => {
        const selectedItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(selectedItemsPerPage);
        setCurrentPage(1);
    };

    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const rowsToRender = currentItems.map((currency, index) => {
        const numericChange = parseFloat(currency.change);

        const rowStyles = {
            cursor: 'pointer',
            backgroundColor: index % 2 === 0 ? 'var(--bg-light-gray)' : 'var(--bg-black)',
            ...(hoveredRow === index && { backgroundColor: 'var(--bg-gray-400)' }),
        };

        return (
            <tr
                key={index}
                style={rowStyles}
                onMouseEnter={() => handleRowHover(index)}
                onMouseLeave={() => handleRowHover(null)}
            >
                <td className="py-0.5 px-4 border-b text-center text-sm">
                    <div className="flex items-center justify-center">
                        <button
                            className={`text-lg font-semibold ${currency.isStarred ? 'bg-green-500' : 'bg-blue-500'
                                } p-2 rounded-md border button-without-border`}
                            style={{ width: '30px', height: '30px', lineHeight: '1' }}
                            onClick={() => handlePlusClick(currency)}
                        >
                            {currency.isStarred ? '★' : '+'}
                        </button>
                    </div>
                </td>
                <td className="py-0.5 px-4 border-b text-center text-sm">{currency.currency}</td>
                <td className="py-0.5 px-4 border-b text-center text-sm">{parseFloat(currency.rate).toFixed(2)}</td>
                <td className={`py-1 px-4 border-b text-center text-sm`}>{`${numericChange.toFixed(2)} % `}</td>
                <td className="py-0.5 px-4 border-b text-center text-sm">
                    {numericChange < 0 ? (
                        <span className="text-red-500">&#9660;</span>
                    ) : (
                        <span className="text-green-500">&#9650;</span>
                    )}
                </td>
            </tr>
        );
    });

    return (
        <div className="container mx-auto mt-4 h-screen w-full lg:w-1/2">
            <div className="overflow-x-auto">
                <div className="flex justify-between items-center mt-4">
                    <span className="text-base font-semibold">Sayfa sayısı: </span>
                    <select
                        className="border p-0.5 rounded-md"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        style={{ maxWidth: '70px', marginRight: '10px' }}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                    <span className="text-base font-semibold">Filtrele: </span>
                    <select
                        className="border p-0.5 rounded-md"
                        value={filterOption}
                        onChange={handleFilterChange}
                        style={{ maxWidth: '150px', marginRight: '10px' }}
                    >
                        <option value="all">Hepsi</option>
                        <option value="rising">Yükselenler</option>
                        <option value="falling">Düşenler</option>
                    </select>
                </div>
                <div className="mb-4"></div>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b" style={{ width: '50px' }}></th>
                            <th className="py-2 px-4 border-b cursor-pointer" style={{ width: '80px' }}>Currency</th>
                            <th className="py-2 px-4 border-b cursor-pointer">Rate</th>
                            <th className="py-2 px-4 border-b cursor-pointer">Change</th>
                            <th className="py-2 px-4 border-b">
                                <button
                                    className="text-lg font-semibold p-2 rounded-md border ml-2"
                                    onClick={handleSortChange}
                                >
                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{rowsToRender}</tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(sortedData.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1 mx-2 border rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                            }`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Forex4;
