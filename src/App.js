import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import Contact from "./components/Contact";
import About from "./components/About";
import NotFound from "./components/NotFound";

import Category from "./pages/Category";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/category" element={<Category />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
