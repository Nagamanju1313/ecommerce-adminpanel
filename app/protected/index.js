"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {CHECK_LOGIN_USER_ME} from '../url/apiendpoints';
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";

export const ProtectedRoot = createContext(null);

export const ProtectedRootProvider = ({children})=>{
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    
    useEffect(()=>{
        checkUserLogin()
    },[]);
    
    const checkUserLogin = async ()=>{
        try{
            let data = await fetch(CHECK_LOGIN_USER_ME);
            let result = await data?.json();
            if(result.status === 'SUCCESS'){
                setIsLoggedIn(true)
                setUserDetails(result.user)
            }else{
                setIsLoggedIn(false)
                setIsLoggedIn(false)
                router.push('/')
            }
        }catch(err){
            console.log(err)
        }
    }
    

    return <ProtectedRoot.Provider value={{userDetails}}>
        {isLoggedIn ? children : 
            <div className=" animate-spin w-50 h-50  flex items-center justify-center 
            overflow-hidden translate-y-80 mx-auto">
                <FiLoader className="text-[30px]" />
            </div>
        }
    </ProtectedRoot.Provider>
}

export const userData = () => {
    const { userDetails } = useContext(ProtectedRoot);
    return userDetails;
}