import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const calendar = {
    "term_1": {
        "startDate": process.env.CALENDER_TERM_1_START,
        "endDate": process.env.CALENDER_TERM_1_END
    },
    "term_2": {
        "startDate": process.env.CALENDER_TERM_2_START,
        "endDate": process.env.CALENDER_TERM_2_END,
    },
    "term_3": {
        "startDate": process.env.CALENDER_TERM_3_START,
        "endDate": process.env.CALENDER_TERM_3_END,
    },
}
const SubscriptionPlanSchema = new mongoose.Schema({
    planName: { type: String, default: 'free' },
    price: { type: Number },
    description: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    startDate: { type: Date },
    endDate: { type: Date }
}, { timestamps: true });

const freePlan = {
    planName: 'free',
    price: 0,
    description: 'Free Plan',
    status: 'active',
    startDate: new Date(calendar.term_1.startDate),
    endDate: new Date(calendar.term_3.endDate)
};

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
    subscriptionPlan: {
        type: SubscriptionPlanSchema,
        default: freePlan
    }
}, { timestamps: true });

//  Model Name                        Schema 
//      |                                |   
const User = mongoose.model('User', UserSchema);

export default User;