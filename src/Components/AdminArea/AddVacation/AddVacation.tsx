import "./AddVacation.css";
import { VacationModel } from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import moment from 'moment';

function AddVacation(): JSX.Element {

    const navigate = useNavigate();
    let user = useSelector((state: any) => state.authSlice);

    useEffect(() => {
      if (user.userData==null) {
          navigate("/login");
      }
    },[user.userData]);

    const { register, handleSubmit, reset, formState } = useForm<VacationModel>();
   
    let date_start_all=format(new Date(), 'yyyy-MM-dd');
    const [date_start_s, setdate_start_s] = useState(date_start_all);
    const [error_msg, seterror_msg] = useState('');

  async function createVacation(vacation: VacationModel) {
    let res=  await vacationsService.addVacation(vacation);

    if (res) {
      seterror_msg(res.msg);
    } 
  }

    return (
        <div className="AddVacation">
          <div className="formWithTitle">

            <p>Add Vacation</p>
            <form onSubmit={handleSubmit(createVacation)}>

              <label>Destination</label><br/>
              <input type="text" {...register("destination", { minLength:2, required: "Destination should not be empty" })} /><br/>
              <span className="Error">{formState.errors.destination?.message}</span>

              <label>Description</label><br/>
              <input type="text" {...register("description", { minLength:2, required: "Description should not be empty" })}/><br/>
              <span className="Error">{formState.errors.description?.message}</span>

              <label>Start on</label><br/>
              <input className="date_class" type="date" {...register("startDate", { min: 0, required: "startDate sould not be empty"  })} onChange={(event)=>setdate_start_s(event.target.value)} min={moment().format("YYYY-MM-DD")}/><br/>
              <span className="Error">{formState.errors.startDate?.message}</span>

              <label>End on</label><br/>
              <input className="date_class" type="date" {...register("endDate", { min: 0, required: "endDate sould not be empty" })} min={date_start_s}/><br/>
              <span className="Error">{formState.errors.endDate?.message}</span>

              <label>price</label><br/>
              <input type="number" {...register("price", { min: 0, max:10000, required: "Price must be positive and maximum 10.000" })} /><br/>
              <span className="Error">{formState.errors.price?.message}</span><br/>

              <input className="img_class" type="file" accept="image/*" {...register("image")} /><br/><br/> 

              <button className="Add">Add Vacation</button><br/>
              <button className="cancel_btn" type="button" onClick={() => navigate("/")}> Cancel </button>

            </form>
          </div>
        </div>
    );
}

export default AddVacation;



