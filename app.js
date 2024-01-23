require('dotenv').config();
const express = require('express');
//NOTE - MongoDB에 접속 할수 있게 만드는 녀석을 가져옴
const connect = require('./schemas');


const app = express();
app.use(express.json());
//NOTE -  실제로 MongoDB에 접속
connect();

//NOTE - router 설정..
const router = require('./routes/products.router');
app.use('/api', router);

app.listen(3000, () => {
  console.log('3000포트로 서버가 연결 되었습니다.');
});
