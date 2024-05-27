import User from '../models/user.js';
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

const freePlan = {
  planName: 'free',
  price: 0,
  description: 'Free Plan',
  status: 'active',
  startDate: new Date(calendar.term_1.startDate),
  endDate: new Date(calendar.term_3.endDate)
};

const firstTermPlan = {
  planName: 'firstTerm',
  price: 4000,
  description: 'First Term Plan',
  status: 'active',
  startDate: new Date(calendar.term_1.startDate),
  endDate: new Date(calendar.term_1.endDate)
};

const secondTermPlan = {
  planName: 'secondTerm',
  price: 3000,
  description: 'Second Term Plan',
  status: 'active',
  startDate: new Date(calendar.term_2.startDate),
  endDate: new Date(calendar.term_2.endDate)
};

const thirdTermPlan = {
  planName: 'thirdTerm',
  price: 3000,
  description: 'Third Term Plan',
  status: 'active',
  startDate: new Date(calendar.term_3.startDate),
  endDate: new Date(calendar.term_3.endDate)
};

const fullYearPlan = {
  planName: 'fullYear',
  price: 9000,
  description: 'Full Year Plan',
  status: 'active',
  startDate: new Date("2024-09-02"), // 2nd September 2024
  endDate: new Date("2025-06-26") // 26th June 2025
};


export const getAllUsers = async () => {
  return await User.find();
};

export const getUserByUsername = async (username) => {
  return await User.findOne({
    username: username
  });
}

export const getUserByCardId = async (cardId) => {
  return await User.findOne({
    cardId: cardId
  });
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const addBalanceByUserName = async (username, amount, transactionType) => {
  let user = await User.findOne({
    username: username
  });
  if (!user) {
    throw new Error('User not found');
  }
  if (amount < 0 && user.balance + amount < 0) {
    throw new Error('Insufficient balance');
  }
  user.balance += Number(amount);
  if (transactionType == 'subscription') {
    user.subscriptionPlan.status = 'inactive';
  }
  await user.save();
  return user;
};


export const getUsersByQuery = async (query) => {
  return await User.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { cardId: { $regex: query, $options: 'i' } }
    ]
  }, { password: 0 });
};

export const putUserSubscription = async (username, subscriptionPlan) => {
  let user = await User.findOne({
    username: username
  });
  if (!user) { throw new Error('User not found'); }
  switch (subscriptionPlan) {
    // 
    case 'free':
      user.subscriptionPlan = freePlan;
      break;
    // 
    case 'firstTerm':
      user.subscriptionPlan = firstTermPlan;
      break;
    // 
    case 'secondTerm':
      user.subscriptionPlan = secondTermPlan;
      break;
    // 
    case 'thirdTerm':
      user.subscriptionPlan = thirdTermPlan;
      break;
    // 
    case 'fullYear':
      user.subscriptionPlan = fullYearPlan;
      break;
    // 
    case 'OneWeek':
      const currentDate = new Date();
      const endDate = new Date();
      endDate.setDate(currentDate.getDate() + 7);
      user.subscriptionPlan = {
        planName: 'OneWeek',
        price: 500,
        description: 'One Week Plan',
        status: 'active',
        startDate: currentDate,
        endDate: endDate
      };
      break;
    default:
      break;
  }
  await user.save();
}
