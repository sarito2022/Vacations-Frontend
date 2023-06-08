import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import LikesService from "../../../Services/LikesService";
import "./VacationCardUser.css";
import { LikeModel } from "../../../Models/LikeModel";
import { set } from "../../../App/VacSlice";

import { format } from 'date-fns';

interface VacationCardUserProps{
    vacation: VacationModel;
}
    
function VacationCardUser({vacation}: VacationCardUserProps): JSX.Element {

    const dispatch=useDispatch();
    let vacation_from_store = useSelector((state: any) => state.vacations);
    let user = useSelector((state: any) => state.authSlice);
    user=user.userData;
 
    //set color of the like btn after rifrush
    let color='btnLikeWhite';
    let heart_color='gray'
    if (vacation.user_checked=='yes') {
        color='btnLikeRed';
        heart_color='red';
    }

    const[btnColor,setBtnColor]=useState(color);
    const[btnColorHeart,setBtnColorHeart]=useState(heart_color);
    const[countLikes,setBtnCountLikes]=useState<number|any>(vacation.count);

    let date_t= new Date(vacation.startDate);
    let date_t_all=format(date_t, 'dd.MM.yyyy');
    const[dateAfterFormat,setDateAfterFormat]=useState(date_t_all);
  

    let date_end= new Date(vacation.endDate);
    let date_end_all=format(date_end, 'dd.MM.yyyy');
    const[dateAfterFormatEnd,setDateAfterFormatEnd]=useState(date_end_all);
  
     
async function changeColorSend(vacationID:number){
    let new_vacs:any=[];
        if(btnColor=== "btnLikeWhite"){
            
            setBtnColor("btnLikeRed");
            setBtnColorHeart('red');

            if (countLikes==null ) {
                setBtnCountLikes(1);
            } else {
                setBtnCountLikes(countLikes+1);
            }

            LikesService.addLike({vacationID , userID:user.sub} );
          
            let vac_from_store=vacation_from_store.vacations;

            let temp={};
            vac_from_store.map((vacation_loop:any, index:number) => (
                vacation_loop.vacationID==vacation.vacationID
                ? (func_new_vac(vacation_loop, 'yes'))
                : (func_new_vac(vacation_loop, ''))
            ));
            console.log(new_vacs);
            dispatch(set(new_vacs));
     
        }else{
            setBtnColor("btnLikeWhite");
            setBtnColorHeart('gray');
          
            LikesService.deleteLike(vacationID ,user.sub);
            
            if (countLikes==1) {
                setBtnCountLikes(null);
            } else {
                setBtnCountLikes(countLikes-1);
            }

            let vac_from_store=vacation_from_store.vacations;

            let temp={};
            vac_from_store.map((vacation_loop:any, index:number) => (
                vacation_loop.vacationID==vacation.vacationID
                ? (func_new_vac(vacation_loop, 'no'))
                : (func_new_vac(vacation_loop, ''))
            ));

            dispatch(set(new_vacs));
        }

        function func_new_vac(vacation_loop:any, val:string) {
            let temp = {...vacation_loop};
            console.log(val);
            if (val!='') {
                temp.user_checked=val;  
                if (val=='yes') {
                    temp.count= temp.count+1;
                } else {
                    temp.count= temp.count-1;
                }
               
                new_vacs.push(temp);
            } else {
                new_vacs.push(temp);
            }
        }
 
} 
let back="url(http://localhost:4000/1-assets/"+vacation.image+")";
let background_image= {backgroundImage: back};

    return (
        <div className="VacationCardUser">
             <div>  
                <div className="image-area" style={background_image}>
                    <button  onClick={()=>changeColorSend(vacation.vacationID)} className= {`button-like-class ${btnColor}` }> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={btnColorHeart} className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>&nbsp;Like {countLikes}
                    </button>
                  
                    <h5 className="destination">{vacation.destination}</h5>
                </div>
                <div className="divForDate"> &nbsp;&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>&nbsp;&nbsp;
                     <span>{dateAfterFormat} - {dateAfterFormatEnd}</span> 
                </div>
                <div className="desc_price">
                    <span className="description">{vacation.description}<br/> 
                    <div className="price">${vacation.price}</div></span>
                </div>
            </div>
        </div>
    );
}

export default VacationCardUser;


