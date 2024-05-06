import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String, unique: true },
    password: { type: String },
    cardId: { type: String, unique: true },
    balance: { type: Number, default: 0 },
    role: { type: String, enum: ['student', 'staff', 'admin'], default: 'student' }
});

//  Model Name                        Schema 
//      |                                |   
const User = mongoose.model('User', UserSchema);

export default User;