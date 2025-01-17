import chefA from '../assets/images/mario-and-adrian-a.jpg';
import chefB from '../assets/images/mario-and-adrian-b.jpg';

function About() {
  return (
    <section className="about">
      <div className="container about-container">
        <div className="about-content">
          <h2>Little Lemon</h2>
          <h3>Chicago</h3>
          <p>
            Little Lemon is a charming neighborhood bistro that serves simple food
            and classic cocktails in a lively but casual environment. The restaurant
            features a locally-sourced menu with daily specials.
          </p>
          <p>
            The owners Mario and Adrian, two brothers, started Little Lemon with
            traditional recipes from their Italian grandmother, adding their own
            modern twist to create unique and delicious dishes.
          </p>
        </div>
        <div className="about-images">
          <img src={chefA} alt="Mario and Adrian cooking" className="about-img-top" />
          <img src={chefB} alt="Mario and Adrian in restaurant" className="about-img-bottom" />
        </div>
      </div>
    </section>
  );
}

export default About;