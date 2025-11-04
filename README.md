# 🎟️ MERN Event Booking System

<p align="center">
  <img src="/assets/event-booking-screenshot.png" alt="Event Booking App Screenshot" width="600" />
</p>

---

## 📝 Description

The **MERN Event Booking System** is a full-stack web application that enables users to **browse**, **book**, and **manage** event tickets with real-time updates.

Built with the **MERN stack (MongoDB, Express.js, React, Node.js)**, it supports **JWT authentication** and **authorization**.

Users can log in to book events, view their upcoming and past bookings, and cancel bookings directly from their profile.

This project was developed to strengthen my understanding of **end-to-end full stack architecture**, **RESTful APIs**, **authentication/authorization**, and **frontend-backend integration** in a production-like environment.

---

### 📄 Planning Materials

![Wireframe](assets/event-booking-wireframe.png)

---

## 🙌 Attributions

- Built with open-source technologies (MERN stack)

---

## 🎯 Features

- 🔐 **JWT Authentication** — Secure user signup, login, and logout flow
- 🎟️ **Event Booking** — Browse available events and make ticket bookings
- 🧾 **Profile Page** — View upcoming and past bookings
- ❌ **Cancel Booking** — Users can cancel bookings
- 🕓 **Booking Status Management** — Automatically sorts bookings into _upcoming_ and _past_
- ⚙️ **Event Management** — Dynamic tier capacities update based on user bookings
- 💬 **Error Handling & Validation** — Backend validation for all booking and authentication routes

---

## ⚙️ Technologies Used

### 🧠 Backend

- **Node.js** — Runtime for server-side logic
- **Express.js** — Web framework for routing and middleware
- **MongoDB & Mongoose** — Database for storing users, events, and bookings
- **JWT (JSON Web Token)** — Secure user authentication
- **bcrypt.js** — Password hashing and encryption

### 💻 Frontend

- **React.js (Vite)** — Interactive client-side UI
- **React Router** — Frontend routing for protected and public pages
- **Fetch API** — For communicating with the backend
- **CSS** — For responsive, modern styling

---

## 🔮 Next Steps (Future Enhancements)

- 📱 **Responsive Dashboard** — Create a manager dashboard that displays event analytics such as total tickets sold, revenue, and remaining capacity in real-time
- ✉️ **Email Notifications** — Automatically send booking confirmation and cancellation emails to users
- 🕒 **Real-Time Updates** — Integrate WebSocket or Socket.io to update event capacities and booking statuses dynamically without page refresh
- 💳 **Payment Gateway Integration** — Add Stripe or PayPal support for secure online payments
- 🔗 **Google OAuth Login** — Allow users to sign in using their Google account for faster onboarding
- 🗓️ **Event Calendar View** — Display upcoming events in a visual calendar format for better navigation
- 🧠 **Admin Role Management** — Allow managers to create, edit, and delete events directly from the dashboard
- 🔐 **Refresh Token System** — Improve authentication flow by implementing refresh tokens for long-lived sessions
- 🧾 **Booking History Export** — Enable users to download their past bookings as a PDF or CSV file
- 🌗 **Light / Dark Mode** — Add a toggle to switch between light and dark UI themes
