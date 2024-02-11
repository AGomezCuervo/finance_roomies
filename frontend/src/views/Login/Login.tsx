import { ChangeEvent, FormEvent, useState } from "react";
import style from "./Login.module.css";
import validation from "../../utils/auth";
import { ErrorsType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchLogin, selectError } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

function Login () {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [errors, setErrors] = useState<ErrorsType>({
    email: "",
    password: ""
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "email":
        setEmail(value);
        setErrors(validation(name, value, errors));
        break;

      case "password":
        setPassword(value);
        setErrors(validation(name, value, errors));
        break;

      default:
        return;
    }
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(errors.password.length === 0 && errors.email.length === 0) {
      dispatch(fetchLogin({email: email, password: password}))
      .then(() => navigate("/"))
    }
  }
  return (
    <div className={style["login-BGcontainer"]}>
      <form onSubmit={submit} className={style["login-container"]}>
        <h2>Log In</h2>
        <input 
          name="email" 
          onChange={handleOnChange} 
          placeholder="Email"
          value={email}
        />

          <p className={style["login-error"]}>{errors.email}</p>

        <input 
          name="password" 
          onChange={handleOnChange} 
          type="password" 
          placeholder="Password"
          value={password}
        />
          <p className={style["login-error"]}>{errors.password}</p>
        <button type="submit">Sign In</button>
        {
          <p className={style["login-error"]}>{error && "Bad Credentials"}</p>
        }
        
      </form>
    </div>
  )
}

export default Login;
