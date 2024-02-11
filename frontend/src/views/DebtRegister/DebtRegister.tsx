import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import style from "./DebtRegister.module.css";
import { useDispatch } from "react-redux";
import { fetchAllDebts, fetchSearchDebt } from "../../features/debtsSlice";
import { AppDispatch } from "../../store";
import Modal from "../../components/Modal/Modal";

function DebtRegister () {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(fetchAllDebts())
  },[dispatch])

  const onClose = () => {
    setIsOpen(!isOpen);
  }

  const handleOnChange = (event: ChangeEvent<InputEvent>) => {
    const value = event.target.value;
    setInput(value);
  }

  const searchDebt = () => {
    dispatch(fetchSearchDebt(input))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter") {
      searchDebt();
    }
  }

  return (
    <>
      {
        isOpen &&
          <Modal
            type="create"
            onClose={onClose}
          />
      }
      <div className={style["debtregister-container"]}>
        <h1>Debts Register</h1>
        <div className={style["debtregister-table"]}>
          <div className={style["debtregister-actions"]}>
            <button onClick={onClose}>Add Debt</button>
            <div>
              <input onKeyDown={onKeyDown} onChange={handleOnChange} type="text" placeholder="This is the debt..."/>
              <button onClick={searchDebt}>Search</button>
            </div>
          </div>
          <div className={style["debtregister-table__container"]}>
            <Table/>
          </div>
        </div>
      </div>
    </>
  )
}

export default DebtRegister;
