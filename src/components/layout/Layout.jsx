import Navbar from './Navbar';
import Footer from './Footer';
import '../../styles/Layout.css';



function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className='layout'>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;