import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

function Navbar () {
  return (
    <nav className={style["navbar-container"]}>
      <NavLink to={"/"} activeClassName={style.active}>Home</NavLink>
      <NavLink to={"/register"} activeClassName={style.active}> Register</NavLink>
    </nav> 
  )
}

export default Navbar;
