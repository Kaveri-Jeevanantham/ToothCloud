import express from 'express';
import { AppointmentController } from '../controllers/AppointmentController';
import { getDB } from '../config/db';

const router = express.Router();

// Initialize appointment controller with database connection
const initializeAppointmentRoutes = () => {
  const db = getDB();
  const appointmentController = new AppointmentController(db);

  // Create a new appointment
  router.post('/appointments', appointmentController.createAppointment);

  // Get all appointments
  router.get('/appointments', appointmentController.getAllAppointments);

  // Get available time slots (must come before parameterized routes)
  router.get('/appointments/available-slots', appointmentController.getAvailableTimeSlots);

  // Get appointments by date range
  router.get('/appointments/date-range', appointmentController.getAppointmentsByDateRange);

  // Get appointments by practitioner
  router.get('/appointments/practitioner/:practitioner', appointmentController.getAppointmentsByPractitioner);

  // Get appointment by ID
  router.get('/appointments/:id', appointmentController.getAppointmentById);

  // Update appointment status
  router.patch('/appointments/:id/status', appointmentController.updateAppointmentStatus);

  // Delete appointment
  router.delete('/appointments/:id', appointmentController.deleteAppointment);

  return router;
};

export { router as appointmentRoutes, initializeAppointmentRoutes };
