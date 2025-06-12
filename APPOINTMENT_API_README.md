# ToothCloud Appointment API Documentation

## Overview
The ToothCloud Appointment API provides comprehensive functionality for managing dental appointment requests. This API handles appointment creation, validation, conflict checking, and CRUD operations for the ToothCloud dental practice management system.

## TASK144 Implementation

### ✅ Completed Features

1. **Secure Appointment Storage**
   - MongoDB integration with proper data validation
   - Secure API endpoints with input sanitization
   - Comprehensive error handling and logging

2. **Real-time API Integration**
   - React frontend seamlessly integrated with backend API
   - Real-time appointment submission and validation
   - Proper error handling and user feedback

3. **Form Validation**
   - Client-side and server-side validation
   - Required field validation
   - Email and phone format validation
   - Date validation (future dates only)
   - Practitioner and service type validation

4. **Conflict Detection**
   - Automatic checking for appointment scheduling conflicts
   - Prevention of double-booking for same practitioner/time/date
   - Real-time availability checking

5. **Accessibility & Performance**
   - ARIA-compliant form elements
   - Responsive design for all devices
   - Fast API response times
   - Comprehensive error messages

6. **Security Features**
   - Input sanitization to prevent injection attacks
   - Data validation on both client and server
   - CORS configuration for secure cross-origin requests
   - Comprehensive error logging and monitoring

## API Endpoints

### Base URL
```
http://localhost:3001/api
```

### Health Check
```http
GET /health
```

### Appointment Management

#### Create Appointment
```http
POST /appointments
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "date": "2025-06-15",
  "time": "10:00 AM",
  "practitioner": "Dr. Sarah Johnson - General Dentistry",
  "serviceType": "General Checkup",
  "message": "Optional message"
}
```

#### Get All Appointments
```http
GET /appointments
```

#### Get Appointment by ID
```http
GET /appointments/{id}
```

#### Update Appointment Status
```http
PATCH /appointments/{id}/status
Content-Type: application/json

{
  "status": "confirmed"
}
```

#### Delete Appointment
```http
DELETE /appointments/{id}
```

#### Get Available Time Slots
```http
GET /appointments/available-slots?date=2025-06-15&practitioner=Dr. Sarah Johnson - General Dentistry
```

#### Get Appointments by Date Range
```http
GET /appointments/date-range?startDate=2025-06-15&endDate=2025-06-20
```

#### Get Appointments by Practitioner
```http
GET /appointments/practitioner/{practitioner}
```

## Data Models

### Appointment Request
```typescript
{
  name: string;           // Required: Patient's full name
  email: string;          // Required: Valid email address
  phone: string;          // Required: Phone number
  date: string;           // Required: Appointment date (YYYY-MM-DD)
  time: string;           // Required: Appointment time
  practitioner: string;   // Required: Selected practitioner
  serviceType: string;    // Required: Type of service
  message?: string;       // Optional: Additional message
}
```

### Appointment Response
```typescript
{
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  practitioner: string;
  serviceType: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}
```

## Available Options

### Practitioners
- Dr. Sarah Johnson - General Dentistry
- Dr. Michael Chen - Orthodontics
- Dr. Emily Rodriguez - Pediatric Dentistry
- Dr. David Thompson - Oral Surgery
- Dr. Lisa Park - Cosmetic Dentistry

### Service Types
- General Checkup
- Teeth Cleaning
- Cosmetic Consultation
- Orthodontic Consultation
- Emergency Care
- Pediatric Care
- Oral Surgery Consultation

### Time Slots
- Morning: 9:00 AM, 9:30 AM, 10:00 AM, 10:30 AM, 11:00 AM, 11:30 AM
- Afternoon: 2:00 PM, 2:30 PM, 3:00 PM, 3:30 PM, 4:00 PM, 4:30 PM

## Error Handling

The API provides comprehensive error handling with detailed error messages:

### Validation Errors (400)
```json
{
  "success": false,
  "message": "Validation errors occurred",
  "errors": [
    "Name is required",
    "Please enter a valid email address"
  ]
}
```

### Conflict Errors (409)
```json
{
  "success": false,
  "message": "Time slot unavailable",
  "errors": [
    "This time slot is already booked for the selected practitioner"
  ]
}
```

### Success Response (201)
```json
{
  "success": true,
  "message": "Appointment request submitted successfully! We will contact you within 24 hours to confirm your appointment.",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "date": "2025-06-15",
    "time": "10:00 AM",
    "practitioner": "Dr. Sarah Johnson - General Dentistry",
    "serviceType": "General Checkup",
    "message": "Optional message",
    "status": "pending",
    "createdAt": "2025-06-11T12:40:07.531Z",
    "updatedAt": "2025-06-11T12:40:07.531Z"
  }
}
```

## Frontend Integration

The React frontend (`BookingSection.tsx`) is fully integrated with the API and provides:

- Real-time form validation
- Seamless API communication
- User-friendly error handling
- Confirmation messages
- Responsive design
- Accessibility compliance

## Testing

Test the API using the provided HTTP files in `/api/src/HTTP/Appointment.http` or using curl commands as shown in the examples above.

## Security & Performance

- Input sanitization prevents injection attacks
- Comprehensive validation on both client and server
- CORS enabled for cross-origin requests
- Error logging and monitoring
- Fast response times with MongoDB indexing
- Efficient conflict detection algorithms

## Next Steps

For production deployment:
1. Add authentication and authorization
2. Implement email notifications
3. Add appointment reminder functionality
4. Integrate with calendar systems
5. Add payment processing
6. Implement audit logging
7. Add backup and recovery procedures
