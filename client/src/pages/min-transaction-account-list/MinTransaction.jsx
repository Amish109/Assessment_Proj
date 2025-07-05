import React, { useEffect, useState } from 'react';
import axiosInterceptor from '../../axios_interceptor/interceptor';

const MinTransaction = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInterceptor.get(`/transaction-of-amount-below-5000`);
        setData(res?.data?.data || []);
      } catch (error) {
        alert("Error in fetching data: " + error?.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">
        Accounts with at least one transaction below ₹5000:
      </h2>

      {data.length === 0 ? (
        <div className="text-gray-500">No accounts found.</div>
      ) : (
        <ul className="list-disc list-inside space-y-1 text-base">
          {data.map((acc, index) => (
            <li key={index} className="text-gray-800 font-medium">
              {acc.account_id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MinTransaction;
