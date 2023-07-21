import { NavLink } from "react-router-dom";
import styles from "./navigation.module.css";
function Navigation() {
  return (
    <div className={styles.nav}>
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            border: isActive ? "4px solid" : "1px solid",
          })}
          className={styles.button}
        >
          Home
        </NavLink>
        <NavLink
          to="/accounts"
          style={({ isActive }) => ({
            border: isActive ? "4px solid" : "1px solid",
          })}
          className={styles.button}
        >
          Счета
        </NavLink>
        <NavLink
          to="/transactions"
          style={({ isActive }) => ({
            border: isActive ? "4px solid" : "1px solid",
          })}
          className={styles.button}
        >
          Транзакции
        </NavLink>
      </nav>
    </div>
  );
}

export default Navigation;
