import Header from "./MainHeader";
import Footer from "./MainFooter";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
