// Email validation regex
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Phone validation regex - accepts formats like (123) 456-7890, 123-456-7890, 1234567890
export const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

// Validate that a date is in the future
export const isDateInFuture = (date: string): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};

// Validate that a date is a valid date string in YYYY-MM-DD format
export const isValidDateFormat = (date: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;
  
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

// Get minimum date string for date input (today)
export const getMinDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};