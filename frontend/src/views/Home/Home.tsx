import { useEffect } from "react";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import { fetchAllDebts, fetchPayAll, fetchTotalData, selectAllDebts, selectMainData } from "../../features/debtsSlice";
import { AppDispatch } from "../../store";

function Home () {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectCurrentUser);
  const allDebts = useSelector(selectAllDebts);
  const mainData = useSelector(selectMainData);

  useEffect(() => {
    dispatch(fetchTotalData(currentUser?.id))
  },[dispatch, currentUser, allDebts])

  const payAll = () => {
    dispatch(fetchPayAll(currentUser?.id));
    dispatch(fetchAllDebts());
  }

  return (
    <div className={style["home-container"]}>
      <div>

        {
          !mainData || mainData.totalAmount === 0 ? 
            <h1>You doesn't have debts</h1> 
            : mainData && mainData.totalAmount < 0 ?
              <h1>In total you debt to {
                currentUser?.name === "Josue" ?
                  "Daniela":
                  "Josue"
              }: <strong>${mainData.totalAmount * -1}</strong></h1>

              : mainData && mainData.totalAmount > 0 ?
                <h1>In total {
                  currentUser?.name === "Josue" ?
                    "Daniela":
                    "Josue"
                } owed you: <strong>${mainData.totalAmount}</strong></h1>
                : <h1>There is nothing to do</h1>
        }
      </div>
      <div>
        <h2 className={style["home-debt"]}>You debt: <strong>{mainData?.totalDebt}</strong></h2>
        <h2 className={style["home-pending"]}>You owed: <strong>{mainData?.totalCreditorDebt}</strong></h2>
      </div>
      <button onClick={payAll}>Pay All</button>
    </div>
  ) 
}

export default Home;
