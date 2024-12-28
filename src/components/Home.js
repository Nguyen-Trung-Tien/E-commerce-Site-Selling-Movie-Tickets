import React, { useState } from 'react';
import './Home.scss';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [tickets, setTickets] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedShowtime, setSelectedShowtime] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('credit-card');

    const movies = [
        { id: 1, title: 'Movie 1', description: 'Description 1', genre: 'Action', image: './assets/image/logo192.png' },
        { id: 2, title: 'Movie 2', description: 'Description 2', genre: 'Comedy', image: 'path/to/image2.jpg' },
        { id: 3, title: 'Movie 3', description: 'Description 3', genre: 'Drama', image: 'path/to/image3.jpg' },
        { id: 4, title: 'Movie 4', description: 'Description 4', genre: 'Horror', image: 'path/to/image4.jpg' },
        { id: 5, title: 'Movie 5', description: 'Description 5', genre: 'Action', image: 'path/to/image5.jpg' },
        { id: 6, title: 'Movie 6', description: 'Description 6', genre: 'Comedy', image: 'path/to/image6.jpg' },
        { id: 7, title: 'Movie 7', description: 'Description 7', genre: 'Drama', image: 'path/to/image7.jpg' },
        { id: 8, title: 'Movie 8', description: 'Description 8', genre: 'Horror', image: 'path/to/image8.jpg' },
        { id: 9, title: 'Movie 9', description: 'Description 9', genre: 'Action', image: 'path/to/image9.jpg' },

    ];

    const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror'];
    const showtimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];

    const filteredMovies = movies.filter(movie =>
        (selectedGenre === 'All' || movie.genre === selectedGenre) &&
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBookTickets = (movie) => {
        setSelectedMovie(movie);
    };

    const handlePurchase = () => {
        const totalPrice = tickets * 10; // Assume each ticket costs $10
        const finalPrice = totalPrice - (totalPrice * discount / 100);
        alert(`You have purchased ${tickets} tickets for ${selectedMovie.title} on ${selectedDate} at ${selectedShowtime} for $${finalPrice.toFixed(2)} using ${paymentMethod}`);
        setSelectedMovie(null);
        setTickets(1);
        setSelectedDate('');
        setSelectedShowtime('');
        setDiscountCode('');
        setDiscount(0);
        setPaymentMethod('credit-card');
    };

    const applyDiscount = () => {
        if (discountCode === 'SALE20') {
            setDiscount(20);
        } else {
            alert('Invalid discount code');
        }
    };

    return (
        <div className='home-container'>
            <div className='main-content'>
                <h1>Home</h1>
                <div className='search-filter'>
                    <input
                        type='text'
                        placeholder='Search movies...'
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <select value={selectedGenre} onChange={(event) => setSelectedGenre(event.target.value)}>
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
                <div className='movie-listings'>
                    {filteredMovies.map(movie => (
                        <div key={movie.id} className='movie-card'>
                            <img src={movie.image} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>{movie.description}</p>
                            <button onClick={() => handleBookTickets(movie)}>Book Tickets</button>
                        </div>
                    ))}
                </div>
                {selectedMovie && (
                    <div className='booking-modal'>
                        <h2>Book Tickets for {selectedMovie.title}</h2>
                        <label>
                            Date:
                            <input
                                type='date'
                                value={selectedDate}
                                onChange={(event) => setSelectedDate(event.target.value)}
                            />
                        </label>
                        <label>
                            Showtime:
                            <select value={selectedShowtime} onChange={(event) => setSelectedShowtime(event.target.value)}>
                                <option value=''>Select Showtime</option>
                                {showtimes.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Number of Tickets:
                            <input
                                type='number'
                                value={tickets}
                                onChange={(event) => setTickets(event.target.value)}
                                min='1'
                            />
                        </label>
                        <label>
                            Discount Code:
                            <input
                                type='text'
                                value={discountCode}
                                onChange={(event) => setDiscountCode(event.target.value)}
                            />
                            <button onClick={applyDiscount}> Apply</button>
                        </label>
                        <label>
                            Payment Method:
                            <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                                <option value='Momo'>Momo</option>
                                <option value='ZaloPay'>ZaloPay</option>
                                <option value='VNPay'>VNPay</option>
                                <option value='credit-card'>Credit Card</option>
                                <option value='paypal'>PayPal</option>
                                <option value='bank-transfer'>Bank Transfer</option>

                            </select>
                        </label>
                        <button onClick={handlePurchase}>Purchase</button>
                        <button onClick={() => setSelectedMovie(null)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;