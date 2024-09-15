import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
//hi

import Category from "./pages/Category";
import Read from "./pages/Read";
import Login from "./pages/Login";
import Loader from "./components/Loader";
import { useEffect } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import News from "./pages/dashboard/pages/News";
import AddNews from "./pages/dashboard/pages/AddNews";
import TopNews from "./pages/dashboard/pages/TopNews";
import AddTopNews from "./pages/dashboard/pages/AddTopNews.js";
import UpdateNews from "./pages/dashboard/pages/UpdateNews.js";
import UpdateTopNews from "./pages/dashboard/pages/UpdateTopNews.js";
import User from "./pages/dashboard/pages/User.js";
import AddUser from "./pages/dashboard/pages/AddUser.js";
import Auth from "./Auth/Auth.js";
import Refresh from "./Auth/Refresh.js";
import AdminAuth from "./Auth/AdminAuth.js";
import ActivitiesPage from "./pages/dashboard/pages/ActivitiesPage.js";

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
        <Route path="/category/:category" element={<Category />} />
        <Route path="/read" element={<Read />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Refresh />}>
          <Route element={<Auth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route element={<AdminAuth />}>
                <Route path="users" element={<User />} />
                <Route path="add-user" element={<AddUser />} />
                <Route path="activities" element={<ActivitiesPage />} />
              </Route>
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<UpdateNews />} />
              <Route path="add-news" element={<AddNews />} />
              <Route path="top-news" element={<TopNews />} />
              <Route path="top-news/:id" element={<UpdateTopNews />} />
              <Route path="add-top-news" element={<AddTopNews />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      {showNavBar && <Footer />}
    </div>
  );
}

export default App;
