import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['FOR_SALE', 'SOLD_OUT'], default: 'FOR_SALE' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);
