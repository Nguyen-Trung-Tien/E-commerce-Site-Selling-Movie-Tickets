import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedShow, setSelectedShow] = useState("");

  const movies = [
    {
      id: 1,
      title: "Movie 1",
      genre: "Action",
      description: "Description for Movie 1",
    },
    {
      id: 2,
      title: "Movie 2",
      genre: "Comedy",
      description: "Description for Movie 2",
    },
    // Add more movies
  ];

  const genres = ["All", "Action", "Comedy", "Drama", "Horror"];
  const showtimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];
  const times = ["Morning", "Afternoon", "Evening"];
  const shows = ["Show 1", "Show 2", "Show 3"];

  const filteredMovies = movies.filter(
    (movie) =>
      (selectedGenre === "All" || movie.genre === selectedGenre) &&
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookTickets = (movie) => {
    navigate(`/product-detail/${movie.id}`);
  };

  const handlePurchase = () => {
    const totalPrice = tickets * 10; // Assume each ticket costs $10
    const finalPrice = totalPrice - (totalPrice * discount) / 100;
    alert(
      `You have purchased ${tickets} tickets for ${
        selectedMovie.title
      } on ${selectedDate} at ${selectedShowtime} (${selectedTime} - ${selectedShow}) for $${finalPrice.toFixed(
        2
      )} using ${paymentMethod}`
    );
    setSelectedMovie(null);
    setTickets(1);
    setSelectedDate("");
    setSelectedShowtime("");
    setDiscountCode("");
    setDiscount(0);
    setPaymentMethod("credit-card");
  };

  const applyDiscount = () => {
    if (discountCode === "SALE20") {
      setDiscount(20);
    } else if (discountCode === "SALE50") {
      setDiscount(50);
    } else {
      alert("Invalid discount code");
    }
  };

  return (
    <div className="home-container">
      <div className="banner">
        <h2>Special Sale! Get 20% off on all tickets with code SALE20</h2>
      </div>
      <div className="main-content">
        <h1>Home</h1>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <select
            value={selectedGenre}
            onChange={(event) => setSelectedGenre(event.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            value={selectedTime}
            onChange={(event) => setSelectedTime(event.target.value)}
          >
            <option value="">Select Time</option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <select
            value={selectedShow}
            onChange={(event) => setSelectedShow(event.target.value)}
          >
            <option value="">Select Show</option>
            {shows.map((show) => (
              <option key={show} value={show}>
                {show}
              </option>
            ))}
          </select>
        </div>
        <div className="movie-listings">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.image || "placeholder-image.jpg"}
                alt={movie.title}
                onClick={() => handleBookTickets(movie)}
                style={{ cursor: "pointer" }}
              />
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
              <button onClick={() => handleBookTickets(movie)}>
                Book Tickets
              </button>
            </div>
          ))}
        </div>
        {selectedMovie && (
          <div className="booking-modal">
            <h2>Book Tickets for {selectedMovie.title}</h2>
            <label>
              Date:
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
              />
            </label>
            <label>
              Showtime:
              <select
                value={selectedShowtime}
                onChange={(event) => setSelectedShowtime(event.target.value)}
              >
                <option value="">Select Showtime</option>
                {showtimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Time:
              <select
                value={selectedTime}
                onChange={(event) => setSelectedTime(event.target.value)}
              >
                <option value="">Select Time</option>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Show:
              <select
                value={selectedShow}
                onChange={(event) => setSelectedShow(event.target.value)}
              >
                <option value="">Select Show</option>
                {shows.map((show) => (
                  <option key={show} value={show}>
                    {show}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Number of Tickets:
              <input
                type="number"
                value={tickets}
                onChange={(event) => setTickets(event.target.value)}
                min="1"
              />
            </label>
            <label>
              Discount Code:
              <input
                type="text"
                value={discountCode}
                onChange={(event) => setDiscountCode(event.target.value)}
              />
              <button onClick={applyDiscount}> Apply</button>
            </label>
            <label>
              Payment Method:
              <select
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <option value="Momo">Momo</option>
                <option value="ZaloPay">ZaloPay</option>
                <option value="VNPay">VNPay</option>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
            </label>
            <button onClick={handlePurchase}>Purchase</button>
            <button onClick={() => setSelectedMovie(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
