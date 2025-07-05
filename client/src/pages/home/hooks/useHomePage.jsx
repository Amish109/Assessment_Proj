import { useEffect, useState } from "react"
import axiosInterceptor from "../../../axios_interceptor/interceptor";

const useHomePage = () => {
	const [data,setData] = useState([]);
	useEffect(()=>{
		const fetchData = async ()=>{
			try {
				const data = await axiosInterceptor.get("/get-active-customers");
				setData(data?.data?.data);
			} catch (error) {
				alert("Error in fetching data",error?.message);
			}
		}
		fetchData();
	},[])
	return (
		{
			data,
			setData
		}
	)
}

export default useHomePage