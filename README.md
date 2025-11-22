# Salon Booking System - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/atlas)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7.svg)](https://render.com/)

A robust RESTful API backend for a comprehensive salon and spa booking system. Built with Node.js, Express.js, and MongoDB, featuring real-time appointment management, user authentication, payment processing, and administrative tools.

## Features

### **Authentication & Authorization**
- JWT-based secure authentication
- Multi-role support (Customer, Salon Owner, Admin)
- Firebase integration for phone/email verification
- Session management and password recovery

### **Appointment Management**
- Real-time booking system with conflict detection
- Time slot management and availability tracking
- Automated appointment confirmations
- Family booking support for group appointments
- Appointment status tracking (Booked, Confirmed, Completed, Cancelled)

### **Salon & Service Management**
- Complete salon profile management
- Service catalog with pricing and duration
- Professional staff management with qualifications
- Image upload with Cloudinary integration
- Location-based salon discovery

### **Payment Processing**
- Stripe integration for secure payments
- Payment intent creation and processing
- Transaction history and receipts
- Refund and cancellation handling

### **Admin Dashboard**
- Comprehensive analytics and reporting
- User and salon management
- Financial insights and revenue tracking
- Feedback moderation system
- Loyalty program management

### **Additional Features**
- Family booking for multiple members
- SMS notifications via Twilio
- Feedback and rating system
- Promotion and discount management
- RESTful API with comprehensive error handling

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | ≥16.0.0 |
| **Express.js** | Web Framework | 4.x |
| **MongoDB** | Database | Atlas Cloud |
| **Mongoose** | ODM | Latest |
| **JWT** | Authentication | Latest |
| **Stripe** | Payments | 19.x |
| **Cloudinary** | Image Storage | Latest |
| **Twilio** | SMS Services | 5.x |
| **Cors** | Cross-Origin Requests | Latest |
| **Multer** | File Upload | Latest |

## Live Demo

**API Base URL**: https://saloon-booking-system-backend-v2.onrender.com

### **Quick API Test**
```bash
curl https://saloon-booking-system-backend-v2.onrender.com/api/test
```

## Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── cloudinary.js         # Cloudinary setup
│   └── db.js                  # Database connection
├── middleware/             # Express middlewares
│   ├── authMiddleware.js      # JWT authentication
│   ├── upload.js              # File upload handling
│   └── uploadServiceImage.js  # Service image uploads
├── models/                 # MongoDB schemas
│   ├── User.js               # User model
│   ├── Salon.js              # Salon model
│   ├── Service.js            # Service model
│   ├── Professional.js       # Staff model
│   ├── Appointment.js        # Booking model
│   ├── Payment.js            # Payment model
│   ├── TimeSlot.js           # Availability model
│   ├── feedbackModel.js      # Reviews model
│   ├── familybooking.js      # Group booking model
│   ├── Admin.js              # Admin model
│   ├── Promotion.js          # Offers model
│   └── Loyalty.js            # Rewards model
├── routes/                 # API endpoints
│   ├── userRoutes.js         # User authentication
│   ├── salonRoutes.js        # Salon management
│   ├── serviceRoutes.js      # Service management
│   ├── professionalRoutes.js # Staff management
│   ├── appointmentRoutes.js  # Booking system
│   ├── timeSlotRoutes.js     # Availability management
│   ├── paymentRoutes.js      # Payment processing
│   ├── feedbackRoutes.js     # Review system
│   ├── familybookingRoutes.js# Group bookings
│   ├── adminRoutes.js        # Admin functions
│   ├── promotionRoutes.js    # Marketing tools
│   └── loyaltyRoutes.js      # Reward system
├── uploads/               # Static file storage
├── utils/                 # Utility functions
│   └── jwtUtils.js          # JWT helpers
├── .env                      # Environment variables
├── server.js                 # Main application file
└── package.json              # Dependencies
```

## Quick Start

### Prerequisites
- Node.js (≥16.0.0)
- npm (≥7.0.0)
- MongoDB Atlas account
- Cloudinary account (for images)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Saloon-Booking-System-SLT/Saloon-Booking-System-Backend-V2.git
cd Saloon-Booking-System-Backend-V2
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/salon

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRES_IN=7d

# Image Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment Processing (Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_key

# SMS Services (Optional)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_SERVICE_SID=your_service_sid
```

5. **Start the development server**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Documentation

### Authentication Routes
```http
POST   /api/users/register     # User registration
POST   /api/users/login        # User login
POST   /api/users/verify       # Phone verification
POST   /api/salons/register    # Salon owner registration
POST   /api/salons/login       # Salon owner login
POST   /api/admin/login        # Admin login
```

### Salon Management
```http
GET    /api/salons             # Get all salons
GET    /api/salons/:id         # Get salon by ID
PUT    /api/salons/:id         # Update salon
POST   /api/salons/upload      # Upload salon image
```

### Service Management
```http
GET    /api/services/:salonId  # Get salon services
POST   /api/services           # Add new service
PUT    /api/services/:id       # Update service
DELETE /api/services/:id       # Delete service
```

### Professional Management
```http
GET    /api/professionals/:salonId  # Get salon staff
POST   /api/professionals          # Add staff member
PUT    /api/professionals/:id      # Update staff
DELETE /api/professionals/:id      # Remove staff
```

### Appointment System
```http
GET    /api/appointments/user/:userId       # User appointments
GET    /api/appointments/salon/:salonId     # Salon appointments
POST   /api/appointments                   # Create booking
PUT    /api/appointments/:id               # Update booking
DELETE /api/appointments/:id               # Cancel booking
```

### Payment Processing
```http
POST   /api/payments/create-payment-intent # Create payment
POST   /api/payments/confirm-payment       # Confirm payment
GET    /api/payments/history/:userId       # Payment history
```

### Admin & Analytics
```http
GET    /api/admin/analytics        # Dashboard analytics
GET    /api/admin/users           # User management
GET    /api/admin/salons          # Salon management
GET    /api/admin/reports         # Financial reports
```

Run API tests:
```bash
npm test
```

Test specific endpoints:
```bash
# Test CORS
curl https://saloon-booking-system-backend-v2.onrender.com/api/test

# Get all salons
curl https://saloon-booking-system-backend-v2.onrender.com/api/salons

# Health check
curl https://saloon-booking-system-backend-v2.onrender.com/
```

## Deployment

### Deploy to Railway/Heroku

```bash
# Example for Railway
railway add
railway variables:set MONGO_URI="your-mongo-uri"
railway deploy
```

## Security Features

- **JWT Authentication** with secure token validation
- **Password hashing** using bcrypt
- **CORS protection** with whitelist origins
- **Input validation** and sanitization
- **MongoDB injection** prevention
- **Rate limiting** for API endpoints
- **Helmet.js** for security headers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
