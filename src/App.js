import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import Category from "./pages/Category";
import Read from "./pages/Read";

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
        <Route path="/read" element={<Read />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
