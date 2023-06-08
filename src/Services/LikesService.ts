import axios from 'axios';
import { LikeModel } from '../Models/LikeModel';
import { VacationModel } from '../Models/VacationModel';
import config from '../Utils/config';

class LikesService {
   
    async addLike(like: LikeModel): Promise<any> {
        try {
            await axios.post(config.LIKES_URL, like);
        } catch (e) {
            alert('error');
        }
    }
    
    public async deleteLike(vacationID: number, userID:number): Promise<void> {
      let likeBoth={
        vacationID: vacationID,
        userID: userID
      }
      await axios.delete<void>(config.LIKES_URL,{data:likeBoth});
    }
}
                                        
const likesService = new LikesService(); // singleton
export default likesService;