import { Request, Response, NextFunction } from 'express';

export const validateAppointment = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, date, time, service } = req.body;
  const errors: string[] = [];

  // Check required fields
  if (!name) errors.push('Name is required');
  if (!email) errors.push('Email is required');
  if (!phone) errors.push('Phone number is required');
  if (!date) errors.push('Date is required');
  if (!time) errors.push('Time is required');
  if (!service) errors.push('Service is required');

  // Validate email format
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (email && !emailRegex.test(email)) {
    errors.push('Invalid email format');
  }

  // Validate phone format (simple validation)
  const phoneRegex = /^\d{10,15}$/;
  if (phone && !phoneRegex.test(phone.replace(/\D/g, ''))) {
    errors.push('Invalid phone number format');
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (date && !dateRegex.test(date)) {
    errors.push('Invalid date format. Use YYYY-MM-DD');
  }

  // Check if date is in the future
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (date && selectedDate < today) {
    errors.push('Appointment date must be in the future');
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // If validation passes, proceed to the next middleware/controller
  next();
};