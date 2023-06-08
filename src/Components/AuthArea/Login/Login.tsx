import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import AuthService from "../../../Services/AuthService";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../App/AuthSlice";
import { useState } from "react";

function Login(): JSX.Element {
  
  const dispatch=useDispatch();
  const { register, handleSubmit, formState } = useForm<UserModel>();
  const navigate = useNavigate();
  const [login_res, setLogin_res] = useState('');

  async function toLogin(user: UserModel) {
    
    let res_login:any=await AuthService.login(user);

    if(res_login.token ==undefined) {
      setLogin_res(res_login);
    }else {
       // Send token to Redux:
       dispatch(login(res_login));
       navigate("/");
    }
}
  
    return (
        <div className="Login">
          <div className="formWithTitleLogin">
            <p>Login</p>
            <form onSubmit={handleSubmit(toLogin)}>

              <label>Email:</label><br/>
              <input type="email" {...register("email", { minLength: 4, required: "Insert email" })} /><br/>
              <span className="Error">{formState.errors.email?.message}</span><br/>

              <label>Password:</label><br/>
              <input type="password" {...register("password", { minLength: 4, required: "Insert Password, Password must be minimum four tags" })} /><br/>
              <span className="Error">{formState.errors.password?.message}</span><br/>

              <button className="btnLogin">Login</button><br/>
              <span>don't have account?</span><br/>
              <NavLink to={"/register"}>register now</NavLink> 
              <div className="Error"> {login_res} </div>

            </form>
          </div>
        </div>
    );
}

export default Login;
