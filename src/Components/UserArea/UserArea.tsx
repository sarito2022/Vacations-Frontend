import { useEffect , useState , useCallback} from "react";
import { VacationModel,ResVacations } from "../../Models/VacationModel";
import vacationsService from "../../Services/VacationsService";
import "./UserArea.css";
import VacationCardUser from "./VacationCardUser/VacationCardUser";
import { useSelector,useDispatch } from "react-redux"
 import { set } from "../../App/VacSlice";

function UserArea(): JSX.Element {

    const [vacationsFilter, setVacationsFilter] = useState('all');
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1);
    const [ResVacationsdata, setResVacations] = useState<ResVacations>();
    const [vacations_data_page, setVacations] = useState<VacationModel[]>();
    const dispatch=useDispatch();

    function nextPage() {
        let newoffse= offset+10;
        setOffset(newoffse);
        setPage(page+1);
    };

    function prevPage() {
        let newoffse= offset-10;
        setOffset(newoffse);
        setPage(page-1);
    };

    let user = useSelector((state: any) => state.authSlice);
    let vacation_from_store = useSelector((state: any) => state.vacations);
    
    // get all vacations
    useEffect(() => {
        vacationsService.getAllVacations(0,1000000,user.userData).then((vacations_r) =>{ 
            if(vacations_r!=undefined) {
                dispatch(set(vacations_r.rows));
            }
        }
        );
    },[]);

    let vac_from_store=vacation_from_store.vacations;

    // get 10 per page
    useEffect(() => {
        vacationsService.getAllVacations(offset,10, user.userData).then((vacations_r) =>{ 
            setResVacations(vacations_r); 
            if(vacations_r!=undefined) {
                setVacations(vacations_r.rows);
            }
        }
        );
    }, [offset,vacation_from_store]);

    let today = new Date();

    return (
       <div className='general_div'>

        <button className='filter_btn' onClick={() =>  setVacationsFilter('all')}>Show All</button> 
        <button className='filter_btn' onClick={() =>  setVacationsFilter('selected_only')}>Show Selected Only</button> 
        <button className='filter_btn' onClick={() =>  setVacationsFilter('not_started')}>Not Started</button> 
        <button className='filter_btn' onClick={() =>  setVacationsFilter('in_duration')}>In Duration</button> 

       {vacationsFilter=="all"? (
        <div>
        <div className="UserArea">
            {vacations_data_page && vacations_data_page === undefined
                ? 'Loading...'
                : vacations_data_page && (vacations_data_page).length === 0
                ? 'No Vacations Found'
                :vacations_data_page &&  vacations_data_page.map((vacations_data_page) => (
                <VacationCardUser key={vacations_data_page.vacationID} vacation={vacations_data_page} />
                ))
            }     
        </div>

        <div className="pagination_vac">
            <div>   page {page} from {ResVacationsdata?Math.round(ResVacationsdata.rows_all/10):''}</div> 
            { page>=2?<button onClick={prevPage}> Prev </button>:''} {ResVacationsdata && page<Math.round(ResVacationsdata.rows_all/10)?<button onClick={nextPage}> NEXT </button>:''} 
        </div>
        </div>
        ) : ''
        }

        {vacationsFilter=="selected_only"?
            (<div className="UserArea"> 
            {vac_from_store === undefined
                    ? 'Loading...'
                    : vac_from_store.length === 0
                    ? 'No Vacations Found'
                    :vac_from_store.map((vacation:any) => (
                        vacation.user_checked=="yes"
                        ? 
                            <VacationCardUser key={vacation.vacationID} vacation={vacation} />
                        : ''
                    ))
            }   
            </div>) : ''
        }

        {vacationsFilter=="not_started"?
            (<div className="UserArea"> 

            {vac_from_store === undefined
                    ? 'Loading...'
                    : vac_from_store.length === 0
                    ? 'No Vacations Found'
                    :vac_from_store.map((vacation:any) => (
                        new Date(vacation.startDate)>=today
                        ? 
                            <VacationCardUser key={vacation.vacationID} vacation={vacation} />
                        : ''
                    ))
            }   
            </div>) : ''
        }

        {vacationsFilter=="in_duration"?
            (<div className="UserArea"> 

            {vac_from_store === undefined
                    ? 'Loading...'
                    : vac_from_store.length === 0
                    ? 'No Vacations Found'
                    :vac_from_store.map((vacation:any) => (
                        new Date(vacation.startDate)<=today &&  new Date(vacation.endDate)>=today
                        ? 
                            <VacationCardUser key={vacation.vacationID} vacation={vacation} />
                        : ''
                    ))
            }   
            </div>) : ''
        }

    </div>
    );
}

export default UserArea;
