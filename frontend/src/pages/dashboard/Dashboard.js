import { Outlet } from "react-router-dom";
import DashboardNavbar from "./components/DashboardNavbar";

const Dashboard = () => {
  document.body.addEventListener("click", (e) => {
    const newsLang = document.querySelector(
      "div.main .dashboard-container div.news-lang > div.active"
    );
    newsLang && newsLang.classList.remove("active");
    const navLang = document.querySelector("div.sitting div.lang.active");

    navLang && navLang.classList.remove("active");
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const submitBtn = document.querySelector(
        "div.main .dashboard-container form.add-news > .submit"
      );
      submitBtn && submitBtn.click();
    }
  });
  return (
    <>
      <DashboardNavbar />
      <Outlet />
    </>
  );
};

export default Dashboard;
