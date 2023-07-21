import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import styles from "./mainLayout.module.css";
function MainLayout() {
  return (
    <div>
      <Navigation />
      <br></br>
      <Outlet />
    </div>
  );
}

export default MainLayout;
