import { useDispatch, useSelector } from "react-redux";
import style from "./Modal.module.css";
import ReactDOM from "react-dom";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { AppDispatch } from "../../store";
import { cleanDebt, fetchAllDebts, fetchCreateDebt, fetchDebtById, fetchUpdateData, selectDebt } from "../../features/debtsSlice";

function Modal ({onClose, id, type}: {onClose: () => void, id?:number, type?: string}) {

  const dispatch = useDispatch<AppDispatch>();
  const currentDebt = useSelector(selectDebt);
  const [totalAmount, setTotalAmount] = useState<number | undefined>();
  const [currentAmount, setCurrentAmount] = useState<number | undefined>();
  const [description, setDescription] = useState<string>("");
  const [debtor, setDebtor] = useState(1);
  const [creditor, setCreditor] = useState(2);


  useEffect(() => {
    if(id) {
      dispatch(fetchDebtById(id));
      return () => {
        dispatch(cleanDebt());
      }
    }
  },[dispatch, id])

  useEffect(() => {
    if (currentDebt) {
      setTotalAmount(currentDebt.totalAmount);
      setCurrentAmount(currentDebt.currentAmount)
      setDescription(currentDebt.description);
    }
  }, [currentDebt])

  useEffect(() => {
    if(currentAmount && totalAmount) {
      if(currentAmount < 0) {
        setCurrentAmount(0);
      }
      if(totalAmount < 0) {
        setTotalAmount(0);
        setCurrentAmount(0);
      }
      if(currentAmount > totalAmount) {
        setCurrentAmount(totalAmount);
      }
      if(totalAmount < currentAmount) {
        setCurrentAmount(totalAmount);
      }
    }
  }, [totalAmount, currentAmount])
  
  const handleOnChange = (event: 
    ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "totalAmount":
        setTotalAmount(Number(value));
        break;
      case "currentAmount":
          setCurrentAmount(Number(value));
        break;
      case "description":
        setDescription(value);
        break;
      case "debtor":
        if(value === "1") {
          setDebtor(1);
          setCreditor(2);
        }
        if (value === "2") {
          setDebtor(2);
          setCreditor(1);
        }
        break;
      default:
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(type === "edit") {
      dispatch(fetchUpdateData({id, info: {currentAmount, totalAmount, description} }))
        .then(() => dispatch(fetchAllDebts()))
        .then(() => onClose());
    } else {
      const data = {
        debtor_id: debtor,
        creditor_id: creditor,
        totalAmount: totalAmount,
        currentAmount: totalAmount,
        description: description,
        paid: false
      }
      if(!data.totalAmount) data.totalAmount = 0;
      if(!data.currentAmount) data.currentAmount = 0;
      console.log(data);
      dispatch(fetchCreateDebt(data))
      .then(() => dispatch(fetchAllDebts()))
      .then(() => onClose())
      .catch(error => {
          console.log(error);
        })
    }
  }

  return ReactDOM.createPortal(
    <>
      <div 
        onClick={onClose} 
        className={style["modal-background"]}>
      </div>
        {
          currentDebt && type === "edit" ?
            <form onSubmit={onSubmit} className={style["modal-form__container"]}>
              <h2>Edit Debt</h2>
              <label htmlFor="totalAmount">Total Amount:</label>
              <input 
                style={{marginBottom: "1rem"}}
                onChange={handleOnChange}
                id="totalAmount"
                type="number"
                name="totalAmount" 
                placeholder="20000"
                value={totalAmount}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                  const target = event.target as HTMLInputElement;
                  if(event.key === "e" || event.key === "-" || Number(target.value) < 0) {
                    event.preventDefault();
                  }
                }}
              />
              <label htmlFor="currentAmount">Current Amount:</label>
              <input 
                style={{marginBottom: "1rem"}}
                onChange={handleOnChange}
                id="currentAmount"
                type="number"
                name="currentAmount" 
                placeholder="20000"
                value={currentAmount}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                  const target = event.target as HTMLInputElement;
                  if(event.key === "e" || event.key === "-" || Number(target.value) < 0) {
                    event.preventDefault();
                  }
                }}
              />
              <label htmlFor="description">Description:</label>
              <textarea 
                onChange={handleOnChange}
                id="description" 
                name="description" 
                placeholder="Description"
                value={description}
              />
              <button type="submit">Edit</button>
          </form>
          : type === "create"  &&
            <form onSubmit={onSubmit} className={style["modal-form__container"]}>
              <h2>Create Debt</h2>
              <div>
                <label htmlFor="debtor">Debtor:</label>
                <select name="debtor" onChange={handleOnChange}>
                  <option disabled>Select</option>
                  <option value={1}>Josue</option>
                  <option value={2}>Daniela</option>
                </select>
              </div>
              <label htmlFor="totalAmount">Total Amount:</label>
              <input 
                style={{marginBottom: "1rem"}}
                onChange={handleOnChange}
                id="totalAmount"
                type="number"
                name="totalAmount" 
                placeholder="20000"
                value={totalAmount}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                  const target = event.target as HTMLInputElement;
                  if(event.key === "e" || event.key === "-" || Number(target.value) < 0) {
                    event.preventDefault();
                  }
                }}
              />
              <label htmlFor="description">Description:</label>
              <textarea 
                onChange={handleOnChange}
                id="description" 
                name="description" 
                placeholder="Description"
                value={description}
              />
              <button type="submit">Create</button>
          </form>
        } 
      
    </>,
    document.body
  )
}

export default Modal;
