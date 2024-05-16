import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String, unique: true },
    password: { type: String },
    cardId: { type: String, unique: true },
    balance: { type: Number, default: 0 },
    role: { type: String, enum: ['student', 'staff', 'admin', 'teacher', 'parent'], default: 'student' },
    phone: { type: String, default: 'none' },
    email: { type: String, default: 'none' },
    address: { type: String, default: 'none' },
    picture: { type: String, default: 'none' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

//  Model Name                        Schema 
//      |                                |   
const User = mongoose.model('User', UserSchema);

export default User;