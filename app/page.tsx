"use client";

import { useEffect, useState } from "react";
import Login from "./components/login_signup/login";
import Signup from "./components/login_signup/signup";
import { ThemeProvider } from "./themeContext/theme";
import ThemeButton from "./themeContext/themeButton";
import ForgotPassword from "./components/login_signup/forgotpassword";
import {REGISTER_USER} from './url/apiendpoints'
const HomePage = () => {
  const [state, setState] = useState<string>('login');

  const loginOrlogout = (value: string) => {
    setState(value)
  }


  const data = async ()=>{
    let res = await fetch(REGISTER_USER, 
      {method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({first_name:"x",last_name:"y",organization_name:"xyz",email:"x@y.com",password:"xys"})
      });
    
  }

  useEffect(()=>{
    data()
  })

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
          <Login loginOrlogout={loginOrlogout} />
        }
        {
          state === 'signup' &&
          <Signup loginOrlogout={loginOrlogout} />
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