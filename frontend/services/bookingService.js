// frontend/services/bookingService.js
const API_BASE = "http://localhost:3000/api"; 

// Fetch event details
export async function eventData(eventId) {
  const url = `${API_BASE}/book/event/${eventId}`; 
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Event fetch error:", error.message);
  }
}

// Create a booking
export async function bookTickets(bookingData) {
  const url = `${API_BASE}/book`; 
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Book tickets error:", error.message);
  }
}

// Get booking details
export async function getBooking(bookingId) {
  const url = `${API_BASE}/book/${bookingId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Get booking error:", error.message);
  }
}
