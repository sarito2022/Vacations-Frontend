import "./EditVacation.css";
import { VacationModel } from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { useSelector } from "react-redux";

function EditVacation(): JSX.Element {

    const navigate = useNavigate();
    let user = useSelector((state: any) => state.authSlice);
    const [error_msg, setError_msg] = useState('');
    
    useEffect(() => {
        if (user.userData==null) {
            navigate("/login");
        }
    },[user.userData]);

    const { register, handleSubmit, formState, setValue  } = useForm<VacationModel>();
    const {state} = useLocation();
    const { vacation } = state; 

    async function toEditVacation(vacationTosave: VacationModel){

        vacationTosave.vacationID=vacation.vacationID;
        let res= await vacationsService.editVacation(vacationTosave);
        if (res) {
            setError_msg(res.msg);
        } 
    }
 
    let date_end= new Date(vacation.endDate);
    let date_end_all=format(date_end, 'yyyy-MM-dd');
    const [date_end_all_s, setDate_end_all_s] = useState(date_end_all);
 
    let date_start= new Date(vacation.startDate);
    let date_start_all=format(date_start, 'yyyy-MM-dd');
    const [date_start_s, setDate_start_s] = useState(date_start_all);
 
    const [destination, setDestination] = useState(vacation.destination);
    const [description, setDescription] = useState(vacation.description);
    const [price, setPrice] = useState(vacation.price);
 
    let image_path="http://localhost:4000/1-assets/"+vacation.image;

    return (
        <div className="EditVacation">
            <div className="formWhithTitleEdit"><br/>
            
            <p>Edit Vacation</p>
            <form onSubmit={handleSubmit(toEditVacation)}>

                <label>Destination:</label><br/>
                <input type="text"  value={destination} {...register("destination", { required: true ,onChange:(event)=>setDestination(event.target.value) })} /><br/>
                <span className="Error">{formState.errors.destination?.message}</span>

                <label>Description:</label><br/>
                <input type="text"  value={description} {...register("description", { required: true , onChange:(event)=>setDescription(event.target.value) })}/><br/>
                <span className="Error">{formState.errors.description?.message}</span>

                <label>Start on:</label><br/>
                <input className="date_class" type="date" value={date_start_s} {...register("startDate", { min: 0, required: true ,  onChange:(event)=>setDate_start_s(event.target.value) })} /><br/>
                <span className="Error">{formState.errors.startDate?.message}</span>

                <label>End on:</label><br/>
                <input className="date_class" type="date" value={date_end_all_s} {...register("endDate", { min: 0, required: true ,  onChange:(event)=>setDate_end_all_s(event.target.value)})}  min={date_start_s}/><br/>
                <span className="Error">{formState.errors.endDate?.message}</span>

                <label>price:</label><br/>
                <input type="number" value={price} {...register("price", { min: 0, max:10000, required:"Price must be positive and maximum 10.000" ,  onChange:(event)=>setPrice(event.target.value)})} /><br/>
                <span className="Error">{formState.errors.price?.message}</span>

                <img src={image_path} width="188px"/> <br/> <br/>
                <input className="img_class"  type="file" accept="image/*" {...register("image")} /><br/><br/>

                <button className="Edit">Edit</button><br/>
                <button type="button" onClick={() => navigate("/")}> Cancel </button>

            </form>
            </div>
            
        </div>
    );
}

export default EditVacation;

