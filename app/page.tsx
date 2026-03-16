"use client";

import { useEffect, useState } from "react";
import Login from "./components/login_signup/login";
import Signup from "./components/login_signup/signup";
import { ThemeProvider } from "./themeContext/theme";
import ThemeButton from "./themeContext/themeButton";
import ForgotPassword from "./components/login_signup/forgotpassword";
import { CHECK_LOGIN_USER_ME } from "./url/apiendpoints";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [state, setState] = useState<string>('login');
  const router = useRouter()
  const loginOrlogout = (value: string) => {
    setState(value)
  }

  const checkLogin = async ()=>{
    try{
      let data:any = await fetch(CHECK_LOGIN_USER_ME);
      data = await data.json();
      console.log(data)
      if(data.status === 'SUCCESS'){
        router.push('/dashboard')
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    checkLogin()
  },[]);
  
  return <div className="login-signup relative">
    <ThemeProvider>
      <div className="dark:bg-black h-[100vh]">
        <div className="">
          <div className="absolute right-5 top-2">
            <ThemeButton />
          </div>
        </div>

        {
          state === 'login' &&
          <Login loginOrlogout={loginOrlogout}/>
        }
        {
          state === 'signup' &&
          <Signup loginOrlogout={loginOrlogout}/>
        }
        {
          state === 'forgotpassword' &&
          <ForgotPassword loginOrlogout={loginOrlogout} />
        }
      </div>


    </ThemeProvider>
  </div>
}
export default HomePage;