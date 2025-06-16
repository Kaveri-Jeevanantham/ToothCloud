import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  dentist?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  service: { type: String, required: true },
  dentist: { type: String },
  message: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}, { 
  // Add timestamps for better tracking
  timestamps: true,
  // Increase timeout for operations
  bufferTimeoutMS: 30000
});

// Create an index on date and time for faster lookups
AppointmentSchema.index({ date: 1, time: 1 });

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);