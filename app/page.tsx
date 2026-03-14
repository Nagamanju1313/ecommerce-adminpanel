"use client";

import { useState } from "react";
import Login from "./components/login_signup/login";
import Signup from "./components/login_signup/signup";
import { ThemeProvider } from "./themeContext/theme";
import ThemeButton from "./themeContext/themeButton";
import ForgotPassword from "./components/login_signup/forgotpassword";

const HomePage = () => {
  const [state, setState] = useState<string>('login');

  const loginOrlogout = (value: string) => {
    setState(value)
  }
  
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