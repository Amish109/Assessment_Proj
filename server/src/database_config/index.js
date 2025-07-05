// db.js
import { MongoClient } from 'mongodb';
import { DOTENV_VARIABLES } from '../constants/dotenv_variables.js';
const { MONGO_URL, DATABASE_NAME } = DOTENV_VARIABLES;

let dbInstance = null;

export const connectDb = async () => {
  if (dbInstance) return dbInstance;

  const client = new MongoClient(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  console.log('✅ MongoDB connected');

  dbInstance = client.db(DATABASE_NAME);
  return dbInstance;
};


// // https://www.mongodb.com/docs/drivers/node/current/get-started/
// import {MongoClient} from 'mongodb';
// import { DOTENV_VARIABLES } from '../constants/dotenv_variables.js';


// const url = MONGO_URL;
// const client = new MongoClient(url);
// const dbName = DATABASE_NAME;

// const connectDb = async()=>{
//  const database_response = await client.connect();
//  console.log("database_response",database_response);
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('documents');

//   return 'done.';
// }

// export default connectDb;