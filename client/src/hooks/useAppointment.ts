import { useState } from 'react';
import { AppointmentFormData, createAppointment } from '../services/appointmentService';

interface UseAppointmentReturn {
  isSubmitting: boolean;
  submitStatus: { type: 'success' | 'error'; message: string } | null;
  submitAppointment: (data: AppointmentFormData) => Promise<void>;
  resetStatus: () => void;
}

export const useAppointment = (): UseAppointmentReturn => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const submitAppointment = async (data: AppointmentFormData): Promise<void> => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await createAppointment(data);
      setSubmitStatus({
        type: 'success',
        message: 'Your appointment request has been submitted successfully! We will contact you shortly to confirm.'
      });
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'There was an error submitting your appointment request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetStatus = (): void => {
    setSubmitStatus(null);
  };

  return {
    isSubmitting,
    submitStatus,
    submitAppointment,
    resetStatus
  };
};

export default useAppointment;