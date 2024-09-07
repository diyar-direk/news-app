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
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const location = useLocation();
  const showNavBar = !location.pathname.startsWith("/dashboard");

  return (
    <div className="App">
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
          
        </Route>
      </Routes>

      {showNavBar && <Footer />}
    </div>
  );
}

export default App;
