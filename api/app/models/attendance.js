
import mongoose from 'mongoose';
import User from './user';

const UserSchema = User.schema;

const ScheduleSchema = new mongoose.Schema({
    period: { type: Number, required: true, min: 1, max: 10 },
    subject: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    description: { type: String, default: 'none' }
});

const TimeTableSchema = new mongoose.Schema({
    day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], required: true, default: 'monday'},
    schedule: [ScheduleSchema],
    description: { type: String, default: 'none' }
});

const YearSchema = new mongoose.Schema({
    year: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    timeTable: [TimeTableSchema],
    description: { type: String, default: 'none' }
}, { timestamps: true });

const AttendanceSchema = new mongoose.Schema({
    date: { type: Date, required: true }, // 7:00 AM
    year: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' },
    students: [
        {
            student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            status: { type: String, enum: ['present', 'absent', 'late'], default: 'absent' },
        }
    ],
    description: { type: String, default: 'none' }
}, { timestamps: true });

const Year = mongoose.model('Year', YearSchema);
const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default { Year , Attendance };
