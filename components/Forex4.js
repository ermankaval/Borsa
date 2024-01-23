import React, { useState, useEffect } from 'react';

const Main = () => {
    const [currencyData, setCurrencyData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(() => 10);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [filterValue, setFilterValue] = useState('all'); // 'all', 'rising', 'falling'

    const fetchData = async () => {
        try {
            const url = 'https://finans.truncgil.com/today.json';
            const options = {
                method: 'GET',
                headers: {},
            };

            const response = await fetch(url, options);
            const result = await response.json();

            if (result && result["Update_Date"]) {
                const data = Object.keys(result).map(currencyKey => ({
                    currency: currencyKey,
                    rate: result[currencyKey].Satış,
                    change: result[currencyKey].Değişim,
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

    useEffect(() => {
        // localStorage.setItem('itemsPerPage', itemsPerPage.toString());
    }, [itemsPerPage]);

    const filteredData = currencyData.filter(currency => currency.currency.toLowerCase() !== 'update_date');

    // Apply filtering based on the selected filter value
    const filteredAndSortedData = filteredData.filter(currency => {
        if (filterValue === 'rising') {
            return parseFloat(currency.change) > 0;
        } else if (filterValue === 'falling') {
            return parseFloat(currency.change) < 0;
        }
        return true; // 'all' or unknown filter value
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);

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
        setFilterValue(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto mt-4 h-screen w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Currency Data</h2>
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Sayfayı Görüntüle: </span>
                <select
                    className="border p-2 rounded-md mr-4"
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
                    value={filterValue}
                    onChange={handleFilterChange}
                >
                    <option value="all">Hepsi</option>
                    <option value="rising">Değeri Yükselenler</option>
                    <option value="falling">Değeri Düşenler</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">Currency</th>
                            <th className="py-2 px-4 border-b">Rate</th>
                            <th className="py-2 px-4 border-b">Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((currency, index) => (
                            <tr
                                key={index}
                                className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : ''} ${hoveredRow === index ? 'bg-gray-200' : ''
                                    } ${filterValue === 'rising' && parseFloat(currency.change) > 0
                                        ? 'text-green-500'
                                        : ''
                                    } ${filterValue === 'falling' && parseFloat(currency.change) < 0
                                        ? 'text-red-500'
                                        : ''
                                    }`}
                                onMouseEnter={() => handleRowHover(index)}
                                onMouseLeave={() => handleRowHover(null)}
                            >
                                <td className="py-2 px-4 border-b">{currency.currency}</td>
                                <td className="py-2 px-4 border-b text-right">{currency.rate}</td>
                                <td className={`py-2 px-4 border-b text-right`}>{currency.change}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
