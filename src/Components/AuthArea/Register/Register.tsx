import "./Register.css";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login, logout } from "../../../App/AuthSlice";


function Register(): JSX.Element {
    
  const dispatch=useDispatch();
  const { register, handleSubmit, formState } = useForm<UserModel>();
  const [register_res, setRegister_res] = useState('');
  const navigate = useNavigate();

  async function toRegister(user: UserModel): Promise<void> {

    const rows:any =  await authService.register(user);
    if (rows.msg) {
      setRegister_res(rows.msg);
    } else {
      setRegister_res('registered successfully');
      dispatch(login(rows.data));
      navigate("/");
    }
  }

    return (
        <div className="Register">
            <div className="formWithTitleRegister">
            <p>Register</p>
            <form onSubmit={handleSubmit(toRegister)}>

              <label>First Name:</label><br/>
              <input type="text" {...register("firstName", { minLength: 2, required: "Insert Name" })} /><br/>
              <span className="Error">{formState.errors.firstName?.message}</span><br/>

              <label>Last Name:</label><br/>
              <input type="text" {...register("lastName", { minLength: 2, required: "Insert Last Name" })}/><br/>
              <span className="Error">{formState.errors.lastName?.message}</span><br/>

              <label>Email:</label><br/>
              <input type="email" {...register("email", { minLength: 4, required: "Insert email" })} /><br/>
              <span className="Error">{formState.errors.email?.message}</span><br/>

              <label>Password:</label><br/>
              <input type="password" {...register("password", { min: 4, required: "Insert Password" })} /><br/>
              <span className="Error">{formState.errors.password?.message}</span><br/>

              <button className="btnRegister">Register</button><br/><br/>
              <span>already a member?</span><br/>
              <NavLink to={"/login"}>login</NavLink> 
              <div className="Error"> {register_res} </div>

            </form>
          </div>
        </div>
    );
}

export default Register;
