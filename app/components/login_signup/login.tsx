import { CHECK_LOGIN_USER } from "@/app/url/apiendpoints"
import { isEmptyVariable, isValidateEmail } from "@/app/util/util_functions"
import { redirect } from "next/navigation"
import { useState } from "react"
import { FiLoader } from "react-icons/fi"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"

type Props = {
  loginOrlogout: (value: string) => void
}
export default function Login({loginOrlogout}: Props) {

    interface ApiResponseState{
      code:number
      message:string
    }

    interface ErrorState{
      email_id:string
      password:any
    };

    interface FormState{
      email_id:string
      password:any
      errors:ErrorState
      response:ApiResponseState
      loading:boolean
    }

    let formState={
      email_id:"",
      password:""
    }
    let errorState={
      email_id:"",
      password:""
    }
    let responseState={
      code:999,
      message:""
    }
    let loadingState = {
        loading:false
    }
    const [showPass, setShowPass] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormState>({
      ...formState,
      errors:{
        ...errorState
      },
      response:{
        ...responseState
      },
      ...loadingState
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }

    const handleSubmit = async()=>{
      let errFlag:boolean=false;
      let errObj:ErrorState = {
        ...errorState
      }

      if(isEmptyVariable(formData?.email_id)){
        errFlag=true;
        errObj.email_id = "Email ID is required!"
      }
      if(!isEmptyVariable(formData?.email_id) && !isValidateEmail(formData?.email_id)){
        errFlag=true;
        errObj.email_id = "Email ID is not valid!"
      }
      if(isEmptyVariable(formData?.password)){
        errFlag=true;
        errObj.password = "Password is required!"
      }
      
      if(errFlag){
        setFormData({
          ...formData,
          errors:{...errObj}
        })
        setTimeout(()=>{
          setFormData({
            ...formData,
            errors:errorState
          })
        },2000)
      }
      if(!errFlag){
        setFormData({
          ...formData,
          loading:true
        })

        let response = await fetch(CHECK_LOGIN_USER, {
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            email_id:formData.email_id,
            password:formData.password
          })
        });
       
        let result = await response.json()
        
        if(result.status === 'SUCCESS'){
          setFormData({
            ...formState,
            errors:{
              ...errorState
            },
            response:{
              code:1,
              message:result.message
            },
            ...loadingState
          });

         redirect('/dashboard')
          
        }else{
          setFormData({
            ...formData,
            response:{
              code:0,
              message:result.message
            },
            ...loadingState
          })
        }
      }
      
    }
    return <div className="login-form max-w-[350px] mx-auto relative py-10 my-auto flex items-center justify-center h-full">
          <div className="login w-full">
            <h1 className="text-3xl font-semibold text-zinc-600 dark:text-zinc-50
              uppercase text-center
              ">Login</h1>
            <div className="form-col my-5">
              <input type="email"
                className="border-2 border-sky-600 px-3 py-2 w-full
                    dark:bg-white
                  "
                placeholder="Email ID"
                onChange={handleChange}
                value={formData?.email_id}
                name="email_id"
              />
              {
                formData?.errors?.email_id &&
                <p className="text-red-500 mb-0 text-[12px] absolute">{formData?.errors?.email_id}</p>
              }
            </div>
            <div className="form-col my-5 relative">
              <input type={showPass ? "text" : "password"}
                className="border-2 border-sky-600 px-3 py-2 w-full
                    dark:bg-white
                  "
                placeholder="Password"
                onChange={handleChange}
                value={formData?.password}
                name="password"
              />
              <button 
                onClick={()=>setShowPass(!showPass)}
              className="absolute top-0 right-3 translate-y-3 cursor-pointer">
                {
                  showPass?
                    <IoEyeOutline />
                    :
                    <IoEyeOffOutline />
                }
                </button>

                {
                  formData?.errors?.password &&
                  <p className="text-red-500 mb-0 text-[12px] absolute">{formData?.errors?.password}</p>
                }
            </div>
            <div className="form-col my-5">
              <button className="bg-sky-600 text-white px-3 py-2 w-full dark:text-white
                hover:bg-black hover:text-white dark:hover:bg-sky-300 cursor-pointer dark:bg-sky-600
                "
                onClick={handleSubmit}
                >Login</button>
            </div>
            {
              formData?.loading &&
              <div className="relative top-[-10px] animate-spin w-5 h-5  flex items-center
              justify-center" >
                <FiLoader/>
              </div>
            }
            {
              !formData?.loading && formData?.response.code === 0 &&
              <p className="text-red-500 text-[13px] relative top-[-10px]">{formData?.response.message}</p>
            }
            {
              !formData?.loading && formData?.response.code === 1 &&
              <p className="text-green-500 text-[13px] relative top-[-10px]">{formData?.response.message}</p>
            }
            
            <p className="text-center text-zinc-600 dark:text-zinc-50">Don't have an account ?
              <button className="text-sky-600 dark:text-sky-600 ml-2.5
                  cursor-pointer hover:text-black dark:hover:text-sky-300 
                "
                  onClick={()=>loginOrlogout('signup')}
                >Sign Up</button></p>
                <p className="text-center"><button className="text-center text-sky-600
                  cursor-pointer hover:text-black dark:hover:text-sky-300
                "
                  onClick={()=>loginOrlogout('forgotpassword')}
                >Forgot Password?</button></p>
          </div>
        </div>
}