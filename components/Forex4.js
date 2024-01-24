import React, { useState, useEffect } from 'react';

const Main = () => {
    const [currencyData, setCurrencyData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [filterOption, setFilterOption] = useState('all'); // 'all', 'rising', 'falling'
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

    const fetchData = async () => {
        try {
            const url = 'https://finans.truncgil.com/v4/today.json';
            const options = {
                method: 'GET',
                headers: {},
            };

            const response = await fetch(url, options);
            const result = await response.json();

            if (result && result["Update_Date"]) {
                const data = Object.keys(result).map(currencyKey => ({
                    currency: currencyKey,
                    rate: result[currencyKey].Selling,
                    change: result[currencyKey].Change,
                    loading: false,
                }));

                setCurrencyData(data);
            } else {
                console.error("Invalid response format or missing data");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePlusClick = (currency) => {
        // Burada artı butonuna tıklanınca yapılacak işlemleri ekleyebilirsiniz
        console.log(`Artı butonuna tıklandı: ${currency.currency}`);
    };

    const filteredData = currencyData.filter(currency => currency.currency.toLowerCase() !== 'update_date');

    const filteredAndSortedData = filteredData.filter(currency => {
        const changeValue = currency.change;
        if (filterOption === 'rising') {
            return !changeValue.includes('-');
        } else if (filterOption === 'falling') {
            return changeValue.includes('-');
        }
        return true; // 'all' or unknown filter value
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

        return (
            <tr
                key={index}
                className={`
                cursor-pointer
                ${index % 2 === 0 ? 'bg-gray-50' : ''}
                ${hoveredRow === index ? 'bg-gray-200' : ''}
            `}
                onMouseEnter={() => handleRowHover(index)}
                onMouseLeave={() => handleRowHover(null)}
            >
                <td className="py-2 px-4 border-b text-center">
                    {/* Artı butonu eklenmiş sütun */}
                    <button onClick={() => handlePlusClick(currency)} className="text-blue-500">&#43;</button>
                </td>
                <td className="py-2 px-4 border-b text-center">{currency.currency}</td>
                <td className="py-2 px-4 border-b text-center">{parseFloat(currency.rate).toFixed(2)}</td>
                <td className={`py-2 px-4 border-b text-center`}>
                    {`${numericChange.toFixed(2)}%`}
                </td>
                <td className="py-2 px-4 border-b text-center">
                    {numericChange < 0 ? (
                        <span className="text-red-500">&#9660;</span> // Red triangle for negative change
                    ) : (
                        <span className="text-green-500">&#9650;</span> // Green triangle for non-negative change
                    )}
                </td>
            </tr>
        );
    });

    return (
        <div className="container mx-auto mt-4 h-screen w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Currency Data</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b"></th>
                            <th className="py-2 px-4 border-b cursor-pointer">Currency</th>
                            <th className="py-2 px-4 border-b cursor-pointer">
                                Rate

                            </th>
                            <th className="py-2 px-4 border-b cursor-pointer">Change</th>
                            <th className="py-2 px-4 border-b">
                                <button
                                    className="text-lg font-semibold p-2 rounded-md border ml-2"
                                    onClick={handleSortChange}
                                >
                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                </button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowsToRender}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold">Sayfayı Görüntüle: </span>
                <select
                    className="border p-2 rounded-md"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>

                <span className="text-lg font-semibold">Filtrele: </span>
                <select
                    className="border p-2 rounded-md"
                    value={filterOption}
                    onChange={handleFilterChange}
                >
                    <option value="all">Hepsi</option>
                    <option value="rising">Değeri Yükselenler</option>
                    <option value="falling">Değeri Düşenler</option>
                </select>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1 mx-1 border rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
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

export default Main;
