import dotenv from 'dotenv';
dotenv.config();

export const DOTENV_VARIABLES = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
		DATABASE_NAME: process.env.DATABASE_NAME
}