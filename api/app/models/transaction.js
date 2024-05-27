import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number },
    transactionType: { type: String, enum: ['purchase', 'top-up', 'subscription'] },
    items: { type: Array }
}, { timestamps: true });

//   Model Name                                        Schema 
//       |                                               |   
const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;