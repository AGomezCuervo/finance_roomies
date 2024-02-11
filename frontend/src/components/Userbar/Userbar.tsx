import { useSelector } from "react-redux";
import style from "./Userbar.module.css";
import { selectCurrentUser } from "../../features/authSlice";
import arrowIcon from "../../assets/icons/arrow_blue.svg";

function Userbar () {
  const user = useSelector(selectCurrentUser);
  return (
    <header className={style["userbar-container"]}>
      <div>
        <h2>{user ? user?.name : "Anonimous"}</h2>
        <button className={style["userbar-button"]}>
          <img src={arrowIcon}/>
        </button>
      </div>
    </header> 
  )
}

export default Userbar;
