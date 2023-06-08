import axios from "axios";
import { CredentialsModel } from "../Models/CredentialsModel";
import { UserModel } from "../Models/UserModel";
import config from "../Utils/config";
import { AuthSlice } from "../App/AuthSlice";

class AuthService {
  
    public async register(user: UserModel): Promise<void> {

       const res = await axios.post<any>(config.REGISTER_URL, user);
       let final_res:any={}
       console.log("res from auth service"+JSON.stringify(res));
       console.log("res.data from auth service"+JSON.stringify(res.data));
       if (res.data && res.data.issues) {
            console.log ("this is - res.data.issues from service "+JSON.stringify(res.data.issues))
           final_res.msg=res.data.issues[0].message; 
       }else if(res.data.msg){
        console.log ("this is - res.data.msg from service "+JSON.stringify(res.data.msg))
           final_res.msg=res.data.msg;
       } else {
           final_res=res;
       }
       return final_res;
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<any>(config.LOGIN_URL, credentials);
        // Backend returns token: 
        const userData_res = response.data;
        return userData_res;
    }
}

const authService = new AuthService();
export default authService;
