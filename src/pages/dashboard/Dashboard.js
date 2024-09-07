import { Outlet } from "react-router-dom";
import DashboardNavbar from "./components/DashboardNavbar";

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <Outlet />
    </>
  );
};

export default Dashboard;
