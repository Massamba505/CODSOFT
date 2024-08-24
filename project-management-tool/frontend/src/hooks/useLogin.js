import { useState } from "react"
import toast from "react-hot-toast";
import {useAuthContext} from "../context/AuthContext.jsx";


export const useLogin = ()=>{
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async({email,password})=>{
        console.log(email,password);
        const InputError = handleError(email,password);
        if(InputError){
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password})
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            //need to set local storage
            localStorage.setItem("chat-app",JSON.stringify(data)); // has the userId in database
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    return {loading, login};
}

function handleError(email,password){
    if(!email || !password){
        toast.error("Please enter your credintials2");
        return true;
    }
    return false;
}