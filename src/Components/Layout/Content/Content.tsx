import { Route, Routes } from "react-router-dom";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import AdminArea from "../../AdminArea/AdminArea";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import ViewReport from "../../AdminArea/ViewReport/ViewReport";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import UserArea from "../../UserArea/UserArea";
import Vacations from "../../Vacations/Vacations";
import Header from "../Header/Header";
import "./Content.css";

function Content(): JSX.Element {
    return (
        <div className="Content">
		
            <Routes>
                <Route path="" element ={<Vacations/>}/>
                <Route path="/add" element ={<AddVacation/>}/>
                <Route path="/edit" element ={<EditVacation/>}/>
                <Route path="/register" element ={<Register/>}/>
                <Route path="/login" element ={<Login/>}/>
                <Route path="/admin" element ={<AdminArea/>}/>
                <Route path="/view_report" element ={<ViewReport/>}/>
            </Routes>
        </div>
    );
}

export default Content;
