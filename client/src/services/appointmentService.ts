import axiosInstance from '../utils/axios.utils';

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  dentist?: string;
  message?: string;
}

export const createAppointment = async (appointmentData: AppointmentFormData) => {
  try {
    const response = await axiosInstance.post('/appointments', appointmentData);
    return response.data;
  } catch (error: any) {
    // Handle specific error cases
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 409) {
        throw new Error('This time slot is already booked. Please select another time.');
      } else if (error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error('Failed to schedule appointment. Please try again later.');
  }
};

export const getAvailableTimeSlots = async (date: string) => {
  try {
    // This would be a real API call in a production environment
    // For now, we'll simulate available time slots
    const allTimeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM', 
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];
    
    // Simulate a delay for API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real implementation, we would filter out already booked slots
    return allTimeSlots;
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    throw new Error('Failed to fetch available time slots');
  }
};