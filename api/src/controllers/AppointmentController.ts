import { Request, Response } from 'express';
import Appointment, { IAppointment } from '../models/IAppointment';

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, date, time, service, dentist, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !date || !time || !service) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
      return;
    }
    
    // Check for available time slots with timeout handling
    try {
      const existingAppointment = await Appointment.findOne({
        date,
        time,
        status: { $ne: 'cancelled' }
      }).maxTimeMS(20000); // Set maximum execution time for this query
      
      if (existingAppointment) {
        res.status(409).json({
          success: false,
          message: 'This time slot is already booked. Please select another time.'
        });
        return;
      }
    } catch (queryError) {
      console.error('Error checking time slot availability:', queryError);
      // Continue with appointment creation even if the check fails
      console.log('Proceeding with appointment creation despite availability check failure');
    }
    
    // Create new appointment
    const appointment = new Appointment({
      name,
      email,
      phone,
      date,
      time,
      service,
      dentist: dentist || 'No preference',
      message: message || '',
      status: 'pending'
    });
    
    // Save the appointment
    const savedAppointment = await appointment.save();
    
    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      data: savedAppointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while scheduling your appointment'
    });
  }
};

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .maxTimeMS(20000) // Set maximum execution time for this query
      .limit(100); // Limit results for better performance
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching appointments'
    });
  }
};