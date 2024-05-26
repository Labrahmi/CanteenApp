import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const SubscriptionPlanSchema = new mongoose.Schema({
    planName: { type: String, default: 'free' },
    price: { type: Number },
    description: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    startDate: { type: Date },
    endDate: { type: Date }
}, { timestamps: true });

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


const freePlan = {
    planName: 'free',
    price: 0,
    description: 'Free Plan',
    status: 'active',
    startDate: new Date(calendar.term_1.startDate),
    endDate: new Date(calendar.term_3.endDate)
    // period: '10 months'
};

const firstTermPlan = {
    planName: 'firstTerm',
    price: 4000,
    description: 'First Term Plan',
    status: 'active',
    startDate: new Date(calendar.term_1.startDate),
    endDate: new Date(calendar.term_1.endDate)
    // period: '3 months'
};

const secondTermPlan = {
    planName: 'secondTerm',
    price: 3000,
    description: 'Second Term Plan',
    status: 'active',
    startDate: new Date(calendar.term_2.startDate),
    endDate: new Date(calendar.term_2.endDate)
    // period: '3 months'
};

const thirdTermPlan = {
    planName: 'thirdTerm',
    price: 3000,
    description: 'Third Term Plan',
    status: 'active',
    startDate: new Date(calendar.term_3.startDate),
    endDate: new Date(calendar.term_3.endDate)
    // period: '3 months'
};

const fullYearPlan = {
    planName: 'fullYear',
    price: 9000,
    description: 'Full Year Plan',
    status: 'active',
    startDate: new Date("2024-09-02"), // 2nd September 2024
    endDate: new Date("2025-06-26") // 26th June 2025
    // period: '10 months'
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