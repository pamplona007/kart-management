import mongoose from 'mongoose';

export interface IPilot extends mongoose.Document {
    firstName: string;
    lastName: string;
    nickName: string;
    age: number;
    rating: number;
    confirmed: boolean;
    possibleDates: Date[];
}

const PilotSchema = new mongoose.Schema<IPilot>({
    firstName: {
        type: String,
        required: [true, 'Please provide a first name for the pilot.'],
        maxlength: [20, 'First name cannot be more than 20 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name for the pilot.'],
        maxlength: [20, 'Last name cannot be more than 20 characters'],
    },
    nickName: {
        type: String,
        required: [true, 'Please provide a nickname for the pilot.'],
        maxlength: [20, 'Nickname cannot be more than 20 characters'],
    },
    age: {
        type: Number,
        required: [true, 'Please provide an age for the pilot.'],
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a rating for the pilot.'],
    },
    confirmed: {
        type: Boolean,
        required: [true, 'Please provide a confirmation status for the pilot.'],
        default: false,
    },
    possibleDates: {
        type: [Date],
        required: [true, 'Please provide possible dates for the pilot.'],
    },
}, {
    timestamps: true,
});

export default mongoose.models.Pilot || mongoose.model<IPilot>('Pilot', PilotSchema);
