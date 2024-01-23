//NOTE - 서버만들기
import express from 'express';
import connect from './schemas/index.js';
import productsRouter from './routes/products.router.js';

const app = express();
const PORT = 3000;
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res, next) => {
  return res.json({ message: 'Hi' });
});
app.use('/api', [router, productsRouter]);

//NOTE - 서버실행
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
