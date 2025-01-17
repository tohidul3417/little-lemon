import "../styles/Menu.css";

function Menu() {
  const menuCategories = [
    {
      category: "Starters",
      items: [
        {
          name: "Greek Salad",
          price: "12.99",
          description: "Fresh lettuce, peppers, olives and our Chicago style feta cheese.",
          dietary: ["V", "GF"]
        },
        {
          name: "Bruschetta",
          price: "5.99",
          description: "Grilled bread smeared with garlic and topped with tomatoes and herbs.",
          dietary: ["V"]
        },
        {
          name: "Lemon Garlic Shrimp",
          price: "14.99",
          description: "Sautéed shrimp in a lemon garlic butter sauce.",
          dietary: ["GF"]
        }
      ]
    },
    {
      category: "Main Courses",
      items: [
        {
          name: "Mediterranean Pasta",
          price: "18.99",
          description: "Fresh pasta with cherry tomatoes, olives, capers, and extra virgin olive oil.",
          dietary: ["V"]
        },
        {
          name: "Grilled Sea Bass",
          price: "24.99",
          description: "Fresh sea bass grilled with herbs, served with roasted vegetables.",
          dietary: ["GF"]
        },
        {
          name: "Lamb Chops",
          price: "27.99",
          description: "Grilled lamb chops with rosemary and garlic, served with roasted potatoes.",
          dietary: ["GF"]
        }
      ]
    },
    {
      category: "Desserts",
      items: [
        {
          name: "Lemon Dessert",
          price: "5.00",
          description: "Traditional family recipe made with locally sourced lemons.",
          dietary: ["V"]
        },
        {
          name: "Baklava",
          price: "6.99",
          description: "Layered phyllo pastry filled with chopped nuts and sweetened with syrup.",
          dietary: ["V"]
        }
      ]
    }
  ];

  return (
    <main className="menu">
      <section className="menu-hero">
        <div className="container">
          <h1>Our Menu</h1>
          <p>Traditional Mediterranean cuisine with a modern twist</p>
        </div>
      </section>

      <section className="menu-content">
        <div className="container">
          <div className="dietary-legend">
            <span><small>V - Vegetarian</small></span>
            <span><small>GF - Gluten Free</small></span>
          </div>
          
          {menuCategories.map((category, index) => (
            <div key={index} className="menu-category">
              <h2>{category.category}</h2>
              <div className="menu-items">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="menu-item">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      <span className="price">${item.price}</span>
                    </div>
                    <p>{item.description}</p>
                    {item.dietary && (
                      <div className="dietary-tags">
                        {item.dietary.map((tag, tagIndex) => (
                          <span key={tagIndex} className="dietary-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Menu;