import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import mainLogo from '../../assets/images/main-logo.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container container">
        <Link to="/" className="nav-logo">
          <img src={mainLogo} alt="Little Lemon" />
        </Link>
        
        <button 
          className="nav-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/menu" className="nav-link">Menu</Link></li>
          <li><Link to="/reservations" className="nav-link">Reservations</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;