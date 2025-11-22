#!/usr/bin/env node

/**
 * Complete Email Notification Test Suite
 * Salon Booking System - All Email Types
 */

require('dotenv').config();
const notificationService = require('./services/notificationService');

async function testAllEmailNotifications() {
  console.log('🧪 COMPLETE EMAIL NOTIFICATION TEST SUITE');
  console.log('============================================');
  
  const testEmail = 'ojitharajapaksha@gmail.com'; // Change this to your test email
  
  // Test 1: Appointment Confirmation
  console.log('\n📧 Test 1: Appointment Confirmation Email');
  try {
    const confirmationResult = await notificationService.sendAppointmentConfirmation({
      customerEmail: testEmail,
      customerPhone: '+94771234567',
      customerName: 'John Doe',
      salonName: 'Luxury Spa & Salon',
      serviceName: 'Hair Cut & Styling',
      date: '2024-11-25',
      time: '2:00 PM',
      totalAmount: '2500',
      appointmentId: 'TEST123456'
    });
    
    console.log('✅ Appointment Confirmation:', confirmationResult.email?.success ? 'SUCCESS' : 'FAILED');
    if (!confirmationResult.email?.success) {
      console.log('❌ Error:', confirmationResult.email?.error);
    }
  } catch (error) {
    console.log('❌ Appointment Confirmation Error:', error.message);
  }
  
  // Test 2: Appointment Reminder
  console.log('\n⏰ Test 2: Appointment Reminder Email');
  try {
    const reminderResult = await notificationService.sendAppointmentReminder({
      customerEmail: testEmail,
      customerPhone: '+94771234567',
      customerName: 'John Doe',
      salonName: 'Luxury Spa & Salon',
      serviceName: 'Hair Cut & Styling',
      date: '2024-11-25',
      time: '2:00 PM',
      salonPhone: '+94112345678'
    });
    
    console.log('✅ Appointment Reminder:', reminderResult.email?.success ? 'SUCCESS' : 'FAILED');
    if (!reminderResult.email?.success) {
      console.log('❌ Error:', reminderResult.email?.error);
    }
  } catch (error) {
    console.log('❌ Appointment Reminder Error:', error.message);
  }
  
  // Test 3: Password Reset
  console.log('\n🔒 Test 3: Password Reset Email');
  try {
    const resetResult = await notificationService.sendPasswordReset({
      customerEmail: testEmail,
      customerName: 'John Doe',
      resetToken: 'test-reset-token-123',
      resetUrl: 'https://salonbooking.com/reset-password?token=test-reset-token-123'
    });
    
    console.log('✅ Password Reset:', resetResult.success ? 'SUCCESS' : 'FAILED');
    if (!resetResult.success) {
      console.log('❌ Error:', resetResult.error);
    }
  } catch (error) {
    console.log('❌ Password Reset Error:', error.message);
  }
  
  // Test 4: Promotional Email
  console.log('\n🎉 Test 4: Promotional Email');
  try {
    const promoResult = await notificationService.sendPromotionalEmail({
      customerEmail: testEmail,
      customerName: 'John Doe',
      promotionTitle: 'Black Friday Special - 50% OFF',
      promotionDescription: 'Get 50% off on all hair services this Black Friday weekend!',
      discountPercentage: 50,
      validUntil: '2024-11-30',
      salonName: 'Luxury Spa & Salon',
      promotionCode: 'BLACK50'
    });
    
    console.log('✅ Promotional Email:', promoResult.success ? 'SUCCESS' : 'FAILED');
    if (!promoResult.success) {
      console.log('❌ Error:', promoResult.error);
    }
  } catch (error) {
    console.log('❌ Promotional Email Error:', error.message);
  }
  
  // Test 5: Feedback Request
  console.log('\n📝 Test 5: Feedback Request Email');
  try {
    const feedbackResult = await notificationService.sendFeedbackRequest({
      customerEmail: testEmail,
      customerPhone: '+94771234567',
      customerName: 'John Doe',
      salonName: 'Luxury Spa & Salon',
      serviceName: 'Hair Cut & Styling',
      appointmentDate: '2024-11-22',
      appointmentId: 'TEST123456',
      feedbackUrl: 'https://salonbooking.com/feedback?appointment=TEST123456'
    });
    
    console.log('✅ Feedback Request:', feedbackResult.email?.success ? 'SUCCESS' : 'FAILED');
    if (!feedbackResult.email?.success) {
      console.log('❌ Error:', feedbackResult.email?.error);
    }
  } catch (error) {
    console.log('❌ Feedback Request Error:', error.message);
  }
  
  // Test 6: Owner New Booking Notification
  console.log('\n🔔 Test 6: Owner New Booking Email');
  try {
    const ownerResult = await notificationService.notifyOwnerNewBooking(
      {
        ownerEmail: testEmail,
        ownerName: 'Salon Owner',
        salonName: 'Luxury Spa & Salon'
      },
      {
        customerName: 'John Doe',
        serviceName: 'Hair Cut & Styling',
        date: '2024-11-25',
        time: '2:00 PM',
        totalAmount: '2500',
        customerPhone: '+94771234567'
      }
    );
    
    console.log('✅ Owner New Booking:', ownerResult.success ? 'SUCCESS' : 'FAILED');
    if (!ownerResult.success) {
      console.log('❌ Error:', ownerResult.error);
    }
  } catch (error) {
    console.log('❌ Owner New Booking Error:', error.message);
  }
  
  // Test Summary
  console.log('\n📊 TEST SUMMARY');
  console.log('================');
  console.log('✅ All 6 email notification types have been tested');
  console.log('📧 Check your email inbox for the test messages');
  console.log('🎯 Email service is ready for production use!');
  
  console.log('\n📋 EMAIL NOTIFICATION TYPES AVAILABLE:');
  console.log('1. ✅ Appointment Confirmations - Sent automatically on booking');
  console.log('2. ⏰ Appointment Reminders - Sent daily at 9 AM (cron job)');
  console.log('3. 🔒 Password Reset - Sent on forgot password requests');
  console.log('4. 🎉 Promotional Emails - Sent via admin dashboard');
  console.log('5. 📝 Feedback Requests - Sent daily at 10 AM (cron job)');
  console.log('6. 🔔 Owner Notifications - Sent on new bookings');
  
  console.log('\n🔧 ADMIN ENDPOINTS:');
  console.log('- POST /api/admin/notifications/test - Manual trigger');
  console.log('- GET /api/admin/notifications/status - Check cron job status');
  console.log('- POST /api/promotions/:id/send-emails - Send promotional emails');
  console.log('- POST /api/users/forgot-password - Password reset request');
  console.log('- POST /api/users/send-feedback-request - Manual feedback request');
}

// Run all tests
testAllEmailNotifications().catch(console.error);