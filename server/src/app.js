import express from 'express';
import cors from 'cors';
import router from './router/api_route.js';



const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router);

export default app;