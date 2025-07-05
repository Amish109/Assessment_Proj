// import connectDb from "./database_config/index.js";
import app from "./app.js";
import { DOTENV_VARIABLES } from "./constants/dotenv_variables.js";
// await connectDb();

const {PORT} = DOTENV_VARIABLES;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
