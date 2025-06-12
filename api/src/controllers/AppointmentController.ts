import { Request, Response } from 'express';
import { AppointmentService } from '../services/AppointmentService';
import { IAppointmentRequest, IAppointmentResponse } from '../models/IAppointment';
import { Db } from 'mongodb';

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor(db: Db) {
    this.appointmentService = new AppointmentService(db);
  }

  /**
   * Create a new appointment request
   */
  createAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
      const appointmentData: IAppointmentRequest = req.body;

      // Sanitize input data
      const sanitizedData: IAppointmentRequest = {
        name: appointmentData.name?.trim(),
        email: appointmentData.email?.trim().toLowerCase(),
        phone: appointmentData.phone?.trim(),
        date: appointmentData.date?.trim(),
        time: appointmentData.time?.trim(),
        practitioner: appointmentData.practitioner?.trim(),
        serviceType: appointmentData.serviceType?.trim(),
        message: appointmentData.message?.trim() || ''
      };

      const appointment = await this.appointmentService.createAppointment(sanitizedData);

      const response: IAppointmentResponse = {
        success: true,
        message: 'Appointment request submitted successfully! We will contact you within 24 hours to confirm your appointment.',
        data: appointment
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating appointment:', error);
      
      let errors: string[] = [];
      let statusCode = 500;
      let message = 'Failed to submit appointment request';

      if (error instanceof Error) {
        try {
          // Try to parse validation errors
          errors = JSON.parse(error.message);
          statusCode = 400;
          message = 'Validation errors occurred';
        } catch {
          // Single error message
          if (error.message.includes('time slot is already booked')) {
            statusCode = 409;
            message = 'Time slot unavailable';
            errors = [error.message];
          } else {
            errors = [error.message];
          }
        }
      }

      const response: IAppointmentResponse = {
        success: false,
        message,
        errors
      };

      res.status(statusCode).json(response);
    }
  };

  /**
   * Get all appointments
   */
  getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
      const appointments = await this.appointmentService.getAllAppointments();

      const response = {
        success: true,
        message: 'Appointments retrieved successfully',
        data: appointments,
        count: appointments.length
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching appointments:', error);

      const response = {
        success: false,
        message: 'Failed to retrieve appointments',
        errors: [error instanceof Error ? error.message : 'Unknown error occurred']
      };

      res.status(500).json(response);
    }
  };

  /**
   * Get appointment by ID
   */
  getAppointmentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const appointment = await this.appointmentService.getAppointmentById(id);

      if (!appointment) {
        res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
        return;
      }

      const response = {
        success: true,
        message: 'Appointment retrieved successfully',
        data: appointment
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching appointment:', error);

      const response = {
        success: false,
        message: 'Failed to retrieve appointment',
        errors: [error instanceof Error ? error.message : 'Unknown error occurred']
      };

      res.status(500).json(response);
    }
  };

  /**
   * Update appointment status
   */
  updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
        res.status(400).json({
          success: false,
          message: 'Invalid status provided',
          errors: ['Status must be one of: pending, confirmed, cancelled, completed']
        });
        return;
      }

      const appointment = await this.appointmentService.updateAppointmentStatus(id, status);

      if (!appointment) {
        res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
        return;
      }

      const response = {
        success: true,
        message: 'Appointment status updated successfully',
        data: appointment
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error updating appointment:', error);

      const response = {
        success: false,
        message: 'Failed to update appointment status',
        errors: [error instanceof Error ? error.message : 'Unknown error occurred']
      };

      res.status(500).json(response);
    }
  };

  /**
   * Delete appointment
   */
  deleteAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.appointmentService.deleteAppointment(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
        return;
      }

      const response = {
        success: true,
        message: 'Appointment deleted successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error deleting appointment:', error);

      const response = {
        success: false,
        message: 'Failed to delete appointment',
        errors: [error instanceof Error ? error.message : 'Unknown error occurred']
      };

      res.status(500).json(response);
    }
  };

  /**
   * Get appointments by date range
   */
  getAppointmentsByDateRange = async (req: Request, res: Response): Promise<void> => {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        res.status(400).json({
          success: false,
          message: 'Start date and end date are required',
          errors: ['Please provide both startDate and endDate query parameters']
        });
        return;
      }

      const appointments = await this.appointmentService.getAppointmentsByDateRange(
        startDate as string,
        endDate as string
      );

      const response = {
        success: true,
        message: 'Appointments retrieved successfully',
        data: appointments,
        count: appointments.length
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching appointments by date range:', error);

      const response = {
        success: false,
        message: 'Failed to retrieve appointments',
        errors: [error instanceof Error ? error.message : 'Unknown error occurred']
      };

      res.status(500).json(response);
    }
  };

  /**
   * Get appointments by practitioner
   */
  getAppointmentsByPractitioner = async (req: Request, res: Response): Promise<void> => {
    try {
      const { practitioner } = req.params;
      const appointments = await this.appointmentService.getAppointmentsByPractitioner(practitioner);

      const response = {
        success: true,
        message: 'Appointments retrieved successfully',
        data: appointments,
        count: appointments.length
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching appointments by practitioner:', error);

      const response = {
        success: false,
        message: 'Failed to retrieve appointments',
        errors: [error instanceof Error ? error.message : 'Unknown error occurred']
      };

      res.status(500).json(response);
    }
  };

  /**
   * Get available time slots
   */
  getAvailableTimeSlots = async (req: Request, res: Response): Promise<void> => {
    try {
      const { date, practitioner } = req.query;

      if (!date || !practitioner) {
        res.status(400).json({
          success: false,
          message: 'Date and practitioner are required',
          errors: ['Please provide both date and practitioner query parameters']
        });
        return;
      }

      const availableSlots = await this.appointmentService.getAvailableTimeSlots(
        date as string,
        practitioner as string
      );

      const response = {
        success: true,
        message: 'Available time slots retrieved successfully',
        data: availableSlots,
        count: availableSlots.length
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching available time slots:', error);

      const response = {
        success: false,
        message: 'Failed to retrieve available time slots',
        errors: [error instanceof Error ? error.message : 'Unknown error occurred']
      };

      res.status(500).json(response);
    }
  };
}
