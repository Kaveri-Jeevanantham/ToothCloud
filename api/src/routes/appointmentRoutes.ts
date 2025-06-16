import express from 'express';
import { createAppointment, getAppointments } from '../controllers/AppointmentController';
import { validateAppointment } from '../middleware/validateAppointment';

const router = express.Router();

// POST /api/appointments - Create a new appointment
router.post('/appointments', validateAppointment, createAppointment);

// GET /api/appointments - Get all appointments
router.get('/appointments', getAppointments);

export default router;