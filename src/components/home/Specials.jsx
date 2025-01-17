import { Link } from 'react-router-dom';
import greekSalad from '../../assets/images/greek-salad.jpg';
import bruschetta from '../../assets/images/bruschetta.jpg';
import lemonDessert from '../../assets/images/lemon-dessert.jpg';

function Specials() {
  const specialMenuItems = [
    {
      name: "Greek Salad",
      price: "$12.99",
      description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
      image: greekSalad,
    },
    {
      name: "Bruschetta",
      price: "$5.99",
      description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
      image: bruschetta,
    },
    {
      name: "Lemon Dessert",
      price: "$5.00",
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
      image: lemonDessert,
    }
  ];

  return (
    <section className="specials">
      <div className="container">
        <div className="specials-header">
          <h2>This week's specials!</h2>
          <Link to="/menu" className="btn btn-primary">Online Menu</Link>
        </div>
        <div className="specials-grid">
          {specialMenuItems.map((item, index) => (
            <div key={index} className="special-card">
              <img src={item.image} alt={item.name} className="special-image" />
              <div className="special-content">
                <div className="special-header">
                  <h3>{item.name}</h3>
                  <span className="special-price">{item.price}</span>
                </div>
                <p>{item.description}</p>
                <Link to="/menu" className="special-order">
                  Order a delivery
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specials;