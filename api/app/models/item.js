import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number }
});

//  Model Name                        Schema 
//      |                                |   
const Item = mongoose.model('Item', ItemSchema);

export default Item;
