import React, { useEffect, useState } from 'react';
import axiosInterceptor from '../../axios_interceptor/interceptor';

const ProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInterceptor.get(`/get-distinct-list-of-products`);
        setData(res?.data?.data || []);
				debugger;
      } catch (error) {
        alert("Error in fetching data: " + error?.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">
        List of Products:
      </h2>

      {data.length === 0 ? (
        <div className="text-gray-500">No product data found.</div>
      ) : (
        <ul className="list-disc list-inside space-y-1 text-base">
          {data.map((item, index) => (
            <li key={index} className="text-gray-800 font-medium">
              {item.product}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
