import React, { useState } from "react";
import "../style/Booking.scss";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    movie: "",
    date: "",
    time: "",
    seats: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="booking-container">
      <h1 className="booking-header">Book Your Movie Tickets</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <select
          name="movie"
          value={formData.movie}
          onChange={handleChange}
          required
        >
          <option value="">Select Movie</option>
          <option value="movie1">Movie 1</option>
          <option value="movie2">Movie 2</option>
          <option value="movie3">Movie 3</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="seats"
          placeholder="Number of Seats"
          value={formData.seats}
          onChange={handleChange}
          min="1"
          required
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;
