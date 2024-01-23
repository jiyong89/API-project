import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Mongoose 모델 정의
const Product = mongoose.model('Product', {
  productName: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['FOR_SALE', 'SOLD_OUT'], default: 'FOR_SALE' },
  createdAt: { type: Date, default: Date.now },
});

//NOTE - 상품 등록 API
router.post('/products', async (req, res) => {
  try {
    const { productName, content, author, password } = req.body;
    const newProduct = new Product({ productName, content, author, password });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '상품 등록에 실패하였습니다.' });
  }
});

//NOTE - 상품 목록 조회 API
router.get('/products', async (req, res) => {
  try {
    const { productName, author, status } = req.query;
    const queryConditions = {};

    if (productName) queryConditions.productName = productName;
    if (author) queryConditions.author = author;
    if (status) queryConditions.status = status;

    const products = await Product.find(queryConditions).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '상품 목록 조회에 실패하였습니다.' });
  }
});

//NOTE - 상품 상세 정보 조회 API
router.get('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '상품 상세 조회에 실패하였습니다.' });
  }
});

//NOTE - 상품 정보 수정 API
router.put('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { productName, content, status, password } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: '상품 조회에 실패하였습니다.' });
    }

    if (product.password !== password) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    product.productName = productName || product.productName;
    product.content = content || product.content;
    product.status = status || product.status;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '상품 정보 수정에 실패하였습니다.' });
  }
});

//NOTE - 상품 삭제 API
router.delete('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { password } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: '상품 조회에 실패하였습니다.' });
    }

    if (product.password !== password) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    await product.remove();
    res.json({ message: '상품이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '상품 삭제에 실패하였습니다.' });
  }
});

export default router;
