import { createContext , useState , useContext } from "react";
import Axios_client from "../axios_client.js"

const context_data = createContext({
        user_name: localStorage.getItem("user_name"), 
        token: localStorage.getItem("token"), 
        role: localStorage.getItem("role"),
        set_user_name: () => {localStorage.setItem("user_name" , "")},
        set_token: () => {localStorage.setItem("token", )},
        set_role: () => {localStorage.setItem("role" , "")},
        log_out: () => {}
    })

 
export default function Context_Provider({children}) {
    const [user_name, _set_user_name] = useState(localStorage.getItem("user_name"));
    const [token, _set_token] = useState(localStorage.getItem('token'));
    const [role, _set_role] = useState(localStorage.getItem('role'));

    const set_user_name = (user_name) => {
        _set_user_name(user_name);
        if(user_name){
            localStorage.setItem("user_name" , user_name)
        }
        else{
            localStorage.removeItem("user_name")
        }
        
    }

    const set_token = (token) => {
        _set_token(token);
        if (token) {
            localStorage.setItem("token", token);
        }else{
            localStorage.removeItem("token");
        }
        
    }

    const set_role = (role) => {
        _set_role(role);
        if(role){
            localStorage.setItem("role" , role)
        }
        else{
            localStorage.removeItem("role")
        }
        
    }

    const log_out = () => {
        Axios_client.post("/logout").then(
            () => {
                set_user_name(null);
                set_token(null);
                set_role(null);
            }
        )
    }


    return (
        <context_data.Provider value={{user_name , token , role , set_user_name, set_token, set_role, log_out }}>
            {children}
        </context_data.Provider>
    )
}

export function use_auth (){
    return useContext(context_data);
}
