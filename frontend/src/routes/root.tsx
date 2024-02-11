import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../views/Home/Home";
import StaticComponents from "../components/StaticComponents/StaticComponents";
import DebtRegister from "../views/DebtRegister/DebtRegister";
import store, { RootState } from "../store";
import Login from "../views/Login/Login";

let isAuth = store.getState().auth.isAuth;
const authStateListener = () => {
  const state: RootState = store.getState();
  isAuth = state.auth.isAuth;
};
store.subscribe(authStateListener);

const router = createBrowserRouter([
  {
    path: "/",
    element: <StaticComponents/>,
    loader: () => {
      if (!isAuth) return redirect("/login");
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/register",
        element: <DebtRegister/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

export default router;
