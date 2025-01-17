import { Link } from 'react-router-dom';
import restaurantFood from '../../assets/images/restaurant-food.jpg';

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional 
            recipes served with a modern twist.
          </p>
          <Link to="/reservations" className="btn btn-primary">
            Reserve a Table
          </Link>
        </div>
        <div className="hero-image">
          <img src={restaurantFood} alt="Restaurant food" />
        </div>
      </div>
    </section>
  );
}

export default Hero;