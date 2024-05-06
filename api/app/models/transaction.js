import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number },
    timestamp: { type: Date, default: Date.now },
    transactionType: { type: String, enum: ['purchase', 'top-up', 'adjustment'] },
    items: [{ // Subdocument array for Transaction Items
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        quantity: { type: Number }
    }]
});

//   Model Name                                        Schema 
//       |                                               |   
const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;