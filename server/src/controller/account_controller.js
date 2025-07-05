import { connectDb } from "../database_config/index.js";

const getDistinctListOfProducts = async (req, res)=>{
	try {
		const db = await connectDb();
		const collection = db.collection("accounts");
		const result = await collection.aggregate([
			{
				$unwind: "$products"
			},
			{
				$group: {
					_id: "$products"
				}
			},
			{
				$addFields: {
					product: "$_id"
				}
			},
			{
				$project: {
					_id: 0,
					product: "$_id",
				}
			}
		]).toArray();
		return res
		.status(200)
		.json({
			status: "success",
			data:result
		})
	} catch (error) {
		return res
		.status(500)
		.json({
			status: "error",
			message: error.message
		})
	}
}

export {
	getDistinctListOfProducts
}