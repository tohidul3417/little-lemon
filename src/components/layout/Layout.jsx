import Navbar from './Navbar';
import Footer from './Footer';
import '../../styles/Layout.css';



function Layout({ children }) {
  return (
    <div className='page'>
      <Navbar />
      <main className='layout'>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;