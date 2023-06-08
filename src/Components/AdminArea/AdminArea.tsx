import { useEffect, useState } from "react";
import "./AdminArea.css";
import {VacationModel , ResVacations} from "../../Models/VacationModel";
import vacationsService from "../../Services/VacationsService";
import VacationCardAdmin from "./VacationCardAdmin/VacationCardAdmin";
import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../../App/VacSlice";

function AdminArea(): JSX.Element {

    const dispatch=useDispatch();

    const navigate = useNavigate();
    const [ResVacationsdata, setResVacations] = useState<ResVacations>();
    const [vacations, setVacations] = useState<VacationModel[]>();
  
    let user = useSelector((state: any) => state.authSlice);

   let vacation_from_store = useSelector((state: any) => state.vacations);

    useEffect(() => {

        if (user.userData==null) {
            navigate("/login");
        }
    },[user.userData,vacation_from_store]);
 
    useEffect(() => {
        vacationsService.getAllVacations(0,1000000,user.userData).then((vacations_r) =>{ 
            setResVacations(vacations_r); 
            if(vacations_r!=undefined) {
                setVacations(vacations_r.rows);
                dispatch(set(vacations_r.rows));
            }
        }
        );
    },[]);

  let vac_from_store=vacation_from_store.vacations;
  
    let data:any=[];

    if (vacations) {
        vacations.map((vacation) => (
            data.push ( {'destination':vacation.destination, 'count':vacation.count})
        ));
    }

    const headers = [
        { label: "Vacation", key: "destination" },
        { label: "likes", key: "count" },
      ];
 
      const csvReport = {
        data: data,
        headers: headers,
        filename: 'vacation_likes.csv'
      };

    function view_report() {
        navigate("/view_report", {state: {vacations}});
    }

    return (
        <div className="AdminArea">

        <NavLink to="/add" className="add_vac_link">Add Vacation</NavLink>
        <div className="view_repot_link" onClick={view_report}>View report</div>
        <CSVLink  className="add_vac_link" {...csvReport}>Export to CSV</CSVLink>

        {vac_from_store === undefined
                    ? 'Loading...'
                    : vac_from_store.length === 0
                        ? 'No Vacations Found'
                        : vac_from_store.map((vacation:any) => (
                        <VacationCardAdmin key={vacation.vacationID} vacation={vacation} />
                    ))}
        </div>
    );
}

export default AdminArea;
