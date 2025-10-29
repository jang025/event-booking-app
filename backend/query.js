require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("./models/Event");
const Booking = require("./models/Booking");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  mongoose.set("debug", true);
  console.log("Connected to MongoDB");

  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

const createEventsAndBookings = async () => {

  await Event.deleteMany();
  await Booking.deleteMany();

  const events = [
    {
      long_title: "Tech Meetup fi Tech Meetup S",
      short_title: "Tech Meetup S",
      event_image: ["url1", "url2"],
      category: "Business&Networking",
      start_date_time: new Date("2025-11-05T10:00:00"),
      end_date_time: new Date("2025-11-05T15:00:00"),
      venue: "Suntec Singapore",
      address: "1 Raffles Boulevard",
      organisation: {
        name: "EventCo Singapore",
        description: "A Technology MeetUp",
        image: "URL",
        contact_person_name: "Ryan Tan",
        contact_person_email: "ryan@eventco.sg"
      },
      event_short_description: "This is a talk for technology enthusiasts.",
      event_long_description: "This is the longer description of Tech Meetup.",
      tiers: [
        { tierName: "General", unitPrice: 150, capacity: 200 },
        { tierName: "VIP", unitPrice: 400, capacity: 30 }
      ],
      status: "ongoing"
    },
    {
      long_title: "Food Fiesta 2025",
      short_title: "Food Fiesta",
      event_image: ["url1", "url2"],
      category: "LifeStyle",
      start_date_time: new Date("2025-12-12T09:00:00"),
      end_date_time: new Date("2025-12-12T15:00:00"),
      venue: "Marina Bay",
      address: "10 Bayfront Avenue",
      organisation: {
        name: "FunAsia Pte Ltd",
        description: "We are foodies join us for more fun and entertainment",
        image: "URL",
        contact_person_name: "Sara Lim",
        contact_person_email: "sara@funasia.sg"
      },
      event_short_description: "Food and cultural festival.",
      event_long_description: "This is the longer description for Food Fiesta 2025.",
      tiers: [
        { tierName: "Entry", unitPrice: 100, capacity: 497 },
        { tierName: "Premium", unitPrice: 250, capacity: 100 }
      ],
      status: "ongoing"
    },
    {
      long_title: "AI in Healthcare",
      short_title: "AI HealthConf",
      event_image: ["url1", "url2"],
      category: "Health",
      start_date_time: new Date("2025-11-25T09:00:00"),
      end_date_time: new Date("2025-11-25T14:00:00"),
      venue: "Suntec Hall 3",
      address: "1 Raffles Blvd",
      organisation: {
        name: "TechHub Asia",
        description: "Artificial Intelligence is our next generation.",
        image: "URL",
        contact_person_name: "John Goh",
        contact_person_email: "john@techhub.sg"
      },
      event_short_description: "Panel discussion: AI in Health Care",
      event_long_description: "This is the longer description for AI in Healthcare.",
      tiers: [
        { tierName: "Standard", unitPrice: 200, capacity: 100 }
      ],
      status: "ongoing"
    }
  ];

  const createdEvents = await Event.insertMany(events);

  // --- Sample Booking Data ---
  const bookings = [
    {
      userId: new mongoose.Types.ObjectId(), 
      eventId: createdEvents[0]._id,
      items: [{ tierName: "VIP", unitPrice: 400, quantity: 2, totalCost: 800 }],
      status: "confirmed",
      booking_date: new Date("2025-10-23T09:00:00")
    },
    {
      userId: new mongoose.Types.ObjectId(),
      eventId: createdEvents[1]._id,
      items: [{ tierName: "Entry", unitPrice: 100, quantity: 3, totalCost: 300 }],
      status: "confirmed",
      booking_date: new Date("2025-10-22T12:00:00")
    },
    {
      userId: new mongoose.Types.ObjectId(),
      eventId: createdEvents[2]._id,
      items: [
        { tierName: "General", unitPrice: 150, quantity: 1, totalCost: 150 },
        { tierName: "VIP", unitPrice: 400, quantity: 1, totalCost: 400 }
      ],
      status: "confirmed",
      booking_date: new Date("2025-10-25T13:00:00")
    }
  ];

  await Booking.insertMany(bookings);

  console.log("✅ Events and Bookings seeded successfully!");
};

const runQueries = async () => {
  console.log("Seeding data...");
  await createEventsAndBookings();
};

connect();
