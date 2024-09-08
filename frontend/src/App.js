import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import Category from "./pages/Category";
import Read from "./pages/Read";
import Login from "./pages/Login";
import Loader from "./components/Loader";
import { useEffect } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import News from "./pages/dashboard/pages/News";
import AddNews from "./pages/dashboard/pages/AddNews";

function App() {
  useEffect(() => {
    const loader = document.querySelector(".loader");

    if (loader) {
      // Adding a slight delay to ensure the loader is visible before hiding it
      setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.zIndex = -1;
        document.body.style.overflowY = "auto";
      }, 100); // Adjust the delay as needed
    }
  }, []);

  const location = useLocation();
  const showNavBar = !location.pathname.startsWith("/dashboard");

  return (
    <div className="App">
      <Loader />
      {showNavBar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/category" element={<Category />} />
        <Route path="/read" element={<Read />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/news" element={<News />} />
          <Route path="/dashboard/add" element={<AddNews />} />
        </Route>
      </Routes>

      {showNavBar && <Footer />}
    </div>
  );
}

export default App;
