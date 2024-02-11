import { useDispatch, useSelector } from "react-redux";
import style from "./Table.module.css";
import { fetchAllDebts, fetchRemoveDebt, selectAllDebts } from "../../features/debtsSlice";
import { AppDispatch } from "../../store";
import { ButtonHTMLAttributes, MouseEvent, useState } from "react";
import Modal from "../Modal/Modal";

function Table () {
  const allDebts = useSelector(selectAllDebts);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const editModalStatus = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.target.id;
    setEditId(id);
    setIsOpen(!isOpen);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const RemoveDebt = (event) => {
    const id = Number(event.target.id);
    dispatch(fetchRemoveDebt(id))
    .then(() => dispatch(fetchAllDebts()));
  }
  return (
    <>
      {
        isOpen &&
          <Modal 
            id={editId}
            type={"edit"}
            onClose={closeModal}/>
      }
      <table className={style["table"]}>
        <thead>
          <tr>
            <th>Debtor</th>
            <th>Creditor</th>
            <th>Status</th>
            <th>Total</th>
            <th>UnPayed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            allDebts &&
              allDebts.map((debt) => (
                <tr key={debt.id}>
                  <td>{debt.debtor.name}</td>
                  <td>{debt.creditor.name}</td>
                  <td>
                    <div className={debt.paid ? 
                      `${style["table-status"]} ${style["payed"]}`:
                      `${style["table-status"]} ${style["pending"]}`}
                    >
                      {debt.paid ? 'Payed' : 'Pending'}
                    </div>
                  </td>
                  <td>${debt.totalAmount}</td>
                  <td>${debt.currentAmount}</td>
                  <td>
                    <div className={style["table-actions__container"]}>
                      <button onClick={RemoveDebt} id={debt.id} className={style["table-button__delete"]}>
                        Delete
                      </button>
                      <button id={debt.id} onClick={editModalStatus} className={style["table-button__edit"]}>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  )
}

export default Table;
