type Props = {
    loginOrlogout: (value: string) => void
}
const ForgotPassword = ({loginOrlogout}:Props)=>{
    return(
        <div className="login-form max-w-[350px] mx-auto relative py-10 my-auto flex items-center justify-center h-full">
          <div className="login w-full">
            <h1 className="text-3xl font-semibold text-zinc-600 dark:text-zinc-50
              uppercase text-center
              ">Forgot Password</h1>
              <div className="form-col my-5">
              <input type=""
                className="border-2 border-sky-600 px-3 py-2 w-full
                    dark:bg-white
                  "
                placeholder="Email ID"
              />
            </div>
            
            <div className="form-col my-5">
              <button className="bg-sky-600 text-white px-3 py-2 w-full dark:text-black
                hover:bg-black hover:text-white dark:hover:bg-red-500 cursor-pointer dark:bg-sky-600
                ">Signup</button>
            </div>
            <p className="text-center text-zinc-600 dark:text-zinc-50">Already have an account ?
              <button className="text-sky-600 dark:text-sky-600 ml-2.5
                  cursor-pointer hover:text-black dark:hover:text-red-500
                "
                  onClick={()=>loginOrlogout('login')}
                >Login</button></p>
          </div>
        </div>
    )
}

export default ForgotPassword;