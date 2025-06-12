import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { IAppointment, IAppointmentRequest } from '../models/IAppointment';

export class AppointmentService {
  private db: Db;
  private collection: Collection<IAppointment>;

  constructor(db: Db) {
    this.db = db;
    this.collection = db.collection<IAppointment>('appointments');
  }

  /**
   * Create a new appointment request
   */
  async createAppointment(appointmentData: IAppointmentRequest): Promise<IAppointment> {
    try {
      // Validate the appointment data
      this.validateAppointmentData(appointmentData);

      // Check for appointment conflicts
      await this.checkForConflicts(appointmentData.date, appointmentData.time, appointmentData.practitioner);

      const appointment: Omit<IAppointment, '_id'> = {
        ...appointmentData,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await this.collection.insertOne(appointment as IAppointment);
      
      const createdAppointment = await this.collection.findOne({ _id: result.insertedId });
      
      if (!createdAppointment) {
        throw new Error('Failed to retrieve created appointment');
      }

      return createdAppointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  /**
   * Get all appointments
   */
  async getAllAppointments(): Promise<IAppointment[]> {
    try {
      return await this.collection.find({}).sort({ createdAt: -1 }).toArray();
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  /**
   * Get appointment by ID
   */
  async getAppointmentById(id: string): Promise<IAppointment | null> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid appointment ID format');
      }
      return await this.collection.findOne({ _id: new ObjectId(id) } as any);
    } catch (error) {
      console.error('Error fetching appointment by ID:', error);
      throw error;
    }
  }

  /**
   * Update appointment status
   */
  async updateAppointmentStatus(id: string, status: IAppointment['status']): Promise<IAppointment | null> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid appointment ID format');
      }
      
      const result = await this.collection.findOneAndUpdate(
        { _id: new ObjectId(id) } as any,
        { 
          $set: { 
            status, 
            updatedAt: new Date() 
          } 
        },
        { returnDocument: 'after' }
      );

      return result ?? null;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  }

  /**
   * Delete appointment
   */
  async deleteAppointment(id: string): Promise<boolean> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid appointment ID format');
      }
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) } as any);
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }

  /**
   * Get appointments by date range
   */
  async getAppointmentsByDateRange(startDate: string, endDate: string): Promise<IAppointment[]> {
    try {
      return await this.collection.find({
        date: {
          $gte: startDate,
          $lte: endDate
        }
      }).sort({ date: 1, time: 1 }).toArray();
    } catch (error) {
      console.error('Error fetching appointments by date range:', error);
      throw error;
    }
  }

  /**
   * Get appointments by practitioner
   */
  async getAppointmentsByPractitioner(practitioner: string): Promise<IAppointment[]> {
    try {
      return await this.collection.find({ practitioner }).sort({ date: 1, time: 1 }).toArray();
    } catch (error) {
      console.error('Error fetching appointments by practitioner:', error);
      throw error;
    }
  }

  /**
   * Validate appointment data
   */
  private validateAppointmentData(data: IAppointmentRequest): void {
    const errors: string[] = [];

    // Required field validation
    this.validateRequiredFields(data, errors);
    this.validateEmail(data.email, errors);
    this.validatePhone(data.phone, errors);
    this.validateDate(data.date, errors);
    this.validateTime(data.time, errors);
    this.validatePractitioner(data.practitioner, errors);
    this.validateServiceType(data.serviceType, errors);

    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors));
    }
  }

  private validateRequiredFields(data: IAppointmentRequest, errors: string[]): void {
    if (!data.name?.trim()) errors.push('Name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!data.phone?.trim()) errors.push('Phone number is required');
    if (!data.date) errors.push('Date is required');
    if (!data.time) errors.push('Time is required');
    if (!data.practitioner?.trim()) errors.push('Practitioner is required');
    if (!data.serviceType?.trim()) errors.push('Service type is required');
  }

  private validateEmail(email: string, errors: string[]): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }
  }

  private validatePhone(phone: string, errors: string[]): void {
    const phoneRegex = /^[\d\s\-()\\+]+$/;
    if (phone && !phoneRegex.test(phone)) {
      errors.push('Please enter a valid phone number');
    }
  }

  private validateDate(date: string, errors: string[]): void {
    if (date) {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.push('Please select a future date');
      }
    }
  }

  private validateTime(time: string, errors: string[]): void {
    const validTimes = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
    ];
    if (time && !validTimes.includes(time)) {
      errors.push('Please select a valid time slot');
    }
  }

  private validatePractitioner(practitioner: string, errors: string[]): void {
    const validPractitioners = [
      'Dr. Sarah Johnson - General Dentistry',
      'Dr. Michael Chen - Orthodontics',
      'Dr. Emily Rodriguez - Pediatric Dentistry',
      'Dr. David Thompson - Oral Surgery',
      'Dr. Lisa Park - Cosmetic Dentistry'
    ];
    if (practitioner && !validPractitioners.includes(practitioner)) {
      errors.push('Please select a valid practitioner');
    }
  }

  private validateServiceType(serviceType: string, errors: string[]): void {
    const validServices = [
      'General Checkup',
      'Teeth Cleaning',
      'Cosmetic Consultation',
      'Orthodontic Consultation',
      'Emergency Care',
      'Pediatric Care',
      'Oral Surgery Consultation'
    ];
    if (serviceType && !validServices.includes(serviceType)) {
      errors.push('Please select a valid service type');
    }
  }

  /**
   * Check for appointment scheduling conflicts
   */
  private async checkForConflicts(date: string, time: string, practitioner: string): Promise<void> {
    try {
      const existingAppointment = await this.collection.findOne({
        date,
        time,
        practitioner,
        status: { $in: ['pending', 'confirmed'] }
      });

      if (existingAppointment) {
        throw new Error('This time slot is already booked for the selected practitioner');
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('time slot is already booked')) {
        throw error;
      }
      console.error('Error checking for conflicts:', error);
      throw new Error('Failed to check appointment availability');
    }
  }

  /**
   * Get available time slots for a specific date and practitioner
   */
  async getAvailableTimeSlots(date: string, practitioner: string): Promise<string[]> {
    try {
      const allTimeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
      ];

      const bookedSlots = await this.collection.find({
        date,
        practitioner,
        status: { $in: ['pending', 'confirmed'] }
      }).toArray();

      const bookedTimes = bookedSlots.map(appointment => appointment.time);
      
      return allTimeSlots.filter(time => !bookedTimes.includes(time));
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      throw error;
    }
  }
}
