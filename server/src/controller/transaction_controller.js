import { connectDb } from "../database_config/index.js";

const getTransactionsOfAccount =async (req,res)=>{
	try{
		const db = await connectDb();
		const collection = db.collection("transactions");
		const {id} = req.params;
		const transaction = await collection.find({account_id:+id}).toArray();
		console.log("transaction",transaction);
		return res
		.status(200)
		.json({
			status: "success",
			data: transaction
		})
	}
	catch(error){
		return res
		.status(500)
		.json({
			status: "error",
			message: error.message
		})
	}
}

const getTransactionsOfAmountBelow5000 =async(req,res)=>{
	try {
		const db = await connectDb();
		const collection = db.collection("transactions");
		const accounntIds = await collection.aggregate(
			[
				{
					$unwind:"$transactions"
				},
				{
					$match: {
						"transactions.amount":{$lt:5000}
					},
				},
				{
					$group:{
						"_id":"$_id",
						original_data:{$first:"$$ROOT"}
					}
				},
				{
					$replaceRoot: {
						newRoot: "$original_data"
					}
				},
				{
					$sort: {
						"account_id":1
					}
				},
				{
					$project: {
						account_id:1
					}
				}
			]
		).toArray();
		return res
		.status(200)
		.json({
			status: "success",
			data: accounntIds
		})
	} catch (error) {
		return res
		.status(500)
		.json({
			status: "error",
			message: error.message
		})
	}


	// try{
	// 	const db = await connectDb();
	// 	const collection = db.collection("transactions");
	// 	const transaction = await collection.find({amount:{$lt:500}}).toArray();
	// 	console.log("transaction",transaction);
	// 	return res
	// 	.status(200)
	// 	.json({
	// 		status: "success",
	// 		data: transaction
	// 	})
	// }
	// catch(error){
	// 	return res
	// 	.status(500)
	// 	.json({
	// 		status: "error",
	// 		message: error.message
	// 	})
	// }
}


export{
	getTransactionsOfAccount,
	getTransactionsOfAmountBelow5000
}