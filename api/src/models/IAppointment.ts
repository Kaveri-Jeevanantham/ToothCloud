import { ObjectId } from 'mongodb';

export interface IAppointment {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  practitioner: string;
  serviceType: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface IAppointmentRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  practitioner: string;
  serviceType: string;
  message?: string;
}

export interface IAppointmentResponse {
  success: boolean;
  message: string;
  data?: IAppointment;
  errors?: string[];
}
