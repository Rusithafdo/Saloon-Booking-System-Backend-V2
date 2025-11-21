const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");

// Load environment variables
dotenv.config();

// Route imports
const salonRoutes = require("./routes/salonRoutes");
const serviceRoutes = require('./routes/serviceRoutes');
const professionalRoutes = require("./routes/professionalRoutes");
const timeSlotRoutes = require("./routes/timeSlotRouts");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require("./routes/feedbackRoutes");
const familybookingRoutes = require("./routes/familybookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const loyaltyRoutes = require("./routes/loyaltyRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "10mb" })); // handle JSON
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // handle form data

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/salons', salonRoutes);          // Includes /login and /register
app.use('/api/services', serviceRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/uploads/services", express.static(path.join(__dirname, "uploads/services")));
app.use("/uploads/professionals", express.static(path.join(__dirname, "uploads/professionals")));
app.use("/api/familybooking", familybookingRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/loyalty', loyaltyRoutes);
// app.use('/api/payments', paymentRoutes);

// PAYMENT ROUTES - with error handling
console.log('🔄 Loading payment routes...');
try {
  const paymentRoutes = require("./routes/paymentRoutes");
  app.use('/api/payments', paymentRoutes);
  console.log('✅ Payment routes registered at /api/payments');
} catch (error) {
  console.log('❌ Failed to load payment routes:', error.message);
}


// Default route
app.get('/', (req, res) => {
  res.send('✅ Salon API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log(`💳 Payment endpoint: POST http://localhost:${PORT}/api/payments/create-payment-intent`);
});
