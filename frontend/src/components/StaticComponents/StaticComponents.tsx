import { Outlet } from "react-router-dom";
import style from "./StaticComponents.module.css";
import Userbar from "../Userbar/Userbar";
import Navbar from "../Navbar/Navbar";

function StaticComponents () {
  return (
    <>
      <Userbar/>
      <section className={style["section-container"]}>
        <Outlet/>
        <Navbar/>
      </section>
    </>
  )
}

export default StaticComponents;
