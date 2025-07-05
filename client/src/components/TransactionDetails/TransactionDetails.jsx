import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // optional icon, or use plain ✕
import axiosInterceptor from '../../axios_interceptor/interceptor';

const TransactionDetails = ({ selectedAccount, setSelectedAccount, setShowTransactionDetails }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInterceptor.get(`/transaction-of-account/${selectedAccount}`);
        setData(res?.data?.data || []);
      } catch (error) {
        alert("Error in fetching data: " + error?.message);
      }
    };
    if (selectedAccount) fetchData();
  }, [selectedAccount]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-6xl max-h-[90vh] rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-xl font-semibold">Transaction Details - Account #{selectedAccount}</h2>
          <button onClick={() => setShowTransactionDetails(false)} className="text-gray-500 hover:text-red-500">
            <X size={20} className='cursor-pointer'/>
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-auto px-4 py-2 flex-1">
          {data.length === 0 ? (
            <div className="text-center text-gray-500">No transaction data found.</div>
          ) : (
            <table className="w-full table-auto border-collapse text-sm">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Symbol</th>
                  <th className="border px-2 py-1">Transaction Code</th>
                  <th className="border px-2 py-1">Amount</th>
                  <th className="border px-2 py-1">Price</th>
                  <th className="border px-2 py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {data[0]?.transactions?.map((txn, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{new Date(txn.date).toLocaleDateString()}</td>
                    <td className="border px-2 py-1">{txn.symbol}</td>
                    <td className="border px-2 py-1 capitalize">{txn.transaction_code}</td>
                    <td className="border px-2 py-1">{txn.amount}</td>
                    <td className="border px-2 py-1">{Number(txn.price).toFixed(2)}</td>
                    <td className="border px-2 py-1">{Number(txn.total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Footer (optional) */}
        <div className="p-2 border-t text-right">
          <button
            onClick={() => setShowTransactionDetails(false)}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 currsor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
