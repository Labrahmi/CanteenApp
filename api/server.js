import app from './app/index.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';
import User from './app/models/user.js'

// Load environment variables
dotenv.config();

// Connect to local MongoDB
mongoose.connect(process.env.MONGO_URI, {});

// Confirm connection to MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'Connected to MongoDB'));

// Schedule a task to run at 6:00 AM every day (UTC, `depending on the server timezone`)
// cron.schedule(`* * * * *`, async () => { // every minute !
cron.schedule(`0 6 * * *`, async () => {
  try {
    var date = new Date();
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    console.log('Running task at:', time);
    // ------------------------------------------------------


    // Find all users with an inactive subscription plan
    const users = await User.find();

    // Update the subscription plan status to active for each user
    for (let user of users) {
      user.subscriptionPlan.status = 'active';
      await user.save();
    }
    console.log('Updated subscription plans for all inactive users to active.');



    // ------------------------------------------------------
  } catch (error) {
    console.error('Error updating subscription plans:', error);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
