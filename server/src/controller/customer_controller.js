import { connectDb } from "../database_config/index.js";

const getAtiveCustomers =async (req, res)=>{
	try {
		
		const db = await connectDb();
		const collection = db.collection("customers");
		// const result = await collection.find({}).toArray();
		const result = await collection.aggregate([
			{
				$match: {
					"tier_and_details": { $ne: {} }
					// ne means not equal to
				}
			},
			{
				$addFields:{
					tier:{
						$objectToArray: "$tier_and_details"
					}
				}
			},
			{
				$match: {
					"tier.v.active": true
				}
			},
			{
				$project: {
					tier: 0
				}
			},
			{
				$unwind: "$accounts"
			},
			{
				$lookup: {
					from: "accounts",
					localField:"accounts",
					foreignField: "account_id",
					as: "new_data"
				}
			},
			{
				$group: {
					_id: "$_id",
					"original":{$first:"$$ROOT"},
					"account_details":{$push:"$new_data"}
				}
			},
			{
				$addFields: {
					"original.accounts_data": "$account_details"
				}
			},
			{
				$replaceRoot: {
					newRoot: "$original"
				}
			},
			{
				$sort: { _id: 1 } // 👈 Add this for sorting by _id
			},
			{
				$project: {
					"new_data": 0,
					"accounts": 0,
				}
			}
		]).toArray();
	
		return res
		.status(200)
		.json({
			status: "success",
			data: result
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
	getAtiveCustomers
}