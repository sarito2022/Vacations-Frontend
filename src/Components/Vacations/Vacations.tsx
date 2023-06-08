import AdminArea from "../AdminArea/AdminArea";
import UserArea from "../UserArea/UserArea";
import "./Vacations.css";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Vacations(): JSX.Element {
    const navigate = useNavigate();
    let user = useSelector((state: any) => state.authSlice);

    useEffect(() => {

    if (user.userData==null) {
        navigate("/login");
    }
    },[user.userData]);
    
    return (
        <div className="Vacations">
          {user.userData!=null?(
            <span>
            {user.userData.role==0? 
			<AdminArea/>
            : <UserArea/>} </span>) : ''}
        </div>
    );
}

export default Vacations;
