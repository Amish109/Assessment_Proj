import { useState } from "react";
import TransactionDetails from "../../components/TransactionDetails/TransactionDetails";
import useHomePage from "./hooks/useHomePage"

const Home = () => {
	const {data,setData} = useHomePage();
	const [selectedAccount,setSelectedAccount] = useState(null);
	const [showTransactionDetails,setShowTransactionDetails] = useState(false);
	debugger;
	return (
		<>
			<div>
				<h2 className="text-base my-5 font-bold">Active Customers details </h2>
				
					{
					data?.length>0 ?
					<table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
					<thead className="bg-gray-100 text-xs uppercase text-gray-600">
						<tr>
							<th className="px-4 py-2 border-b">Name</th>
							<th className="px-4 py-2 border-b">Address</th>
							<th className="px-4 py-2 border-b">Accounts</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item) => (
							<tr key={item.id}>
								<td className="px-4 py-2 border-b">{item.name}</td>
								<td className="px-4 py-2 border-b">{item.address}</td>
								{/* <td className="px-4 py-2 border-b">{item?.accounts_data.flat(Infinity).map((ele)=>ele?.account_id).join(", ")}</td> */}
								<td className="px-4 py-2 border-b ">
										{
										item?.accounts_data
										?.flat(Infinity)
										?.map((ele,index) => (
											<>
											{index!==0 && <hr/>}
											<div key={ele?._id} className="hover:bg-gray-100 p-2 cursor-pointer" onClick={()=>{
												setSelectedAccount(ele?.account_id);
												setShowTransactionDetails(true);
											}}>
												<div><strong>Account ID:</strong> {ele?.account_id}</div>
												<div><strong>Limit:</strong> {ele?.limit}</div>
												<div><strong>Products:</strong> {ele?.products?.join(", ")}</div>
											</div>
											</>
										))
										}
								</td>
							</tr>
						))}
					</tbody>
				</table>
					:
					<table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
					<thead className="bg-gray-100 text-xs uppercase text-gray-600">
						<tr>
							<th className="px-4 py-2 border-b">Name</th>
							<th className="px-4 py-2 border-b">Address</th>
							<th className="px-4 py-2 border-b">Accounts</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan={3} className="px-4 py-2 text-center text-gray-500 border-b">
								No data found
							</td>
						</tr>
					</tbody>
				</table>
					}
			</div>
			{
				showTransactionDetails && (
					<TransactionDetails selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} setShowTransactionDetails={setShowTransactionDetails}/>
				)
			}
		</>
		
	)
}

export default Home