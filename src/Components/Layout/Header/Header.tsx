import { NavLink, useNavigate } from "react-router-dom";
import AdminArea from "../../AdminArea/AdminArea";
import Register from "../../AuthArea/Register/Register";
import UserArea from "../../UserArea/UserArea";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux"
// import { Button } from "react-bootstrap";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import Login from "../../AuthArea/Login/Login";
import { logout } from "../../../App/AuthSlice";

 
function Header(): JSX.Element {

    
  let user = useSelector((state: any) => state.authSlice);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  
    
    return (
        <div className="Header">

          <h5>Vacations</h5><br/><br/><br/>

          {user.userData==null? 

          (<div><NavLink to={"/register"} className="auth">Register</NavLink>
          <NavLink to={"/login"} className="auth">Login</NavLink><br></br></div>):
          <div onClick={()=>dispatch(logout())}>{user.userData.firstName} {user.userData.lastName} <span className="logout_link">logout</span></div>}

                
        </div>
    );
}

export default Header;


