import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [sortOption, setSortOption] = useState("title");
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await axios.get("/api/banner-images");
        setBannerImages(response.data);
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };

    fetchBannerImages();
  }, []);

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
  ];

  const genres = ["All", "Action", "Comedy", "Drama", "Horror"];
  const filteredMovies = movies
    .filter(
      (movie) =>
        (selectedGenre === "All" || movie.genre === selectedGenre) &&
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "genre") {
        return a.genre.localeCompare(b.genre);
      }
      return 0;
    });

  const handleBookTickets = (movie) => {
    setSelectedMovie(movie);
  };

  const handlePurchase = () => {
    const totalPrice = tickets * 10;
    const finalPrice = totalPrice - (totalPrice * discount) / 100;
    alert(
      `You have purchased ${tickets} tickets for ${
        selectedMovie.title
      } on ${selectedDate} at ${selectedShowtime} for $${finalPrice.toFixed(
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

  return (
    <div className="home-container">
      <div className="banner">
        <Carousel>
          {bannerImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img src={image.url} alt={`Slide ${index + 1}`} />
              <Carousel.Caption>
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="main-content">
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
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="title">Sort by Title</option>
            <option value="genre">Sort by Genre</option>
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
              <button onClick={() => handleBookTickets(movie)}>Mua vé</button>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <div className="footer-content">
          <div className="contact">
            <h3>Liên Hệ</h3>
            <p>123-456-7890</p>
            <p>123 Đường Trường Chinh</p>
            <p>Quận Tân Bình</p>
            <p>Thành phố Hồ Chí Minh</p>
          </div>
          <div className="about">
            <h3>Về Chúng Tôi</h3>
            <p>
              Chúng tôi là công ty chuyên cung cấp vé xem phim trực tuyến. Với
              nhiều năm kinh nghiệm trong ngành giải trí, chúng tôi cam kết mang
              đến cho khách hàng những trải nghiệm xem phim tuyệt vời nhất. Hãy
              liên hệ với chúng tôi để biết thêm chi tiết.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
