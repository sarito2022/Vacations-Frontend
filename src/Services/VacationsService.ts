import axios from 'axios';
import { VacationModel,ResVacations } from '../Models/VacationModel';
import config from '../Utils/config';

class VacationsService {
    async getAllVacations(limit: number, offset: number, userID: number): Promise<ResVacations | undefined> {
        try {
            let myFormData= {'limit': limit, 'offset': offset, 'userID': userID};
    
            const { data } = await axios.get<ResVacations>(config.VACATIONS_URL, {
                params: { myFormData}});
            return data;
        } catch (e) {
            alert('error');
            return undefined;
        }
    }

    async getVacation(vacationID: number): Promise<VacationModel | undefined> {
        try {
            const vacation = await fetch(config.VACATIONS_URL + vacationID).then(res => res.json());
            return vacation ;
        } catch (e) {
            alert('error');
            return undefined;
        }
    }

    async addVacation(vacation: VacationModel | any): Promise<any> {

        const fd= new FormData();
   
        fd.append("file", vacation.image[0]);
        fd.append("fileName", vacation.image[0]['name']);

        fd.append("destination", vacation.destination);
        fd.append("description", vacation.description);
        fd.append("startDate", vacation.startDate.toString());
        fd.append("EndDate", vacation.endDate.toString());
        fd.append("price", vacation.price.toString());
    
        const config_post = {     
            headers: { 'content-type': 'multipart/form-data' }
        }

        try {
            let res= await axios.post(config.VACATIONS_URL, fd ,config_post);

            let final_res:any={};

            if (res.data.issues) {
                  final_res.msg=res.data.issues[0].message; 
            } else {
                final_res.msg="vacation added successfuly";
            }
            return final_res;

        } catch (e) {
            alert('error post image' + e);
        }
    }



    async editVacation(vacation: VacationModel| any): Promise<any> {
        try {
          
            const fd= new FormData();

            if (vacation.image.length>0) {
                fd.append("file", vacation.image[0]);
                fd.append("fileName", vacation.image[0]['name']);
            }
    
            fd.append("destination", vacation.destination);
            fd.append("description", vacation.description);
            fd.append("startDate", vacation.startDate.toString());
            fd.append("EndDate", vacation.endDate.toString());
            fd.append("price", vacation.price.toString());
        
            const config_post = {     
                headers: { 'content-type': 'multipart/form-data' }
            }

           let res=  await axios.put(config.VACATIONS_URL + vacation.vacationID, fd ,config_post );

           let final_res:any={};
         
            if (res.data.issues) {
                final_res.msg=res.data.issues[0].message; 
            } else {
                final_res.msg="vacation updated successfuly";
            }

           return final_res;

        } catch (e) {
            alert('error from service edit');
        }
    }

    public async deleteVacation(vacationID: number): Promise<void> {
        await axios.delete<void>(config.VACATIONS_URL + vacationID);
    }
}
                                        
const vacationsService = new VacationsService(); // singleton
export default vacationsService;