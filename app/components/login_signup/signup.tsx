import { isEmptyVariable, isValidateEmail } from "@/app/util/util_functions"
import React, { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import {REGISTER_USER} from '../../url/apiendpoints';
type Props = {
  loginOrlogout: (value: string) => void
}
export default function Signup({ loginOrlogout }: Props) {

  interface FormError {
    first_name: string,
    last_name: string,
    organization_name: string,
    email_id: string,
    create_password: any,
    confirm_password: any,
  }

  interface ApiResponse {
    code: number,
    message: string
  }

  interface FormData {
    first_name: string,
    last_name: string,
    organization_name: string,
    email_id: string,
    create_password: any,
    confirm_password: any,
    errors: FormError,
    response: ApiResponse
  }

  let formErrorState = {
    first_name: "",
    last_name: "",
    organization_name: "",
    email_id: "",
    create_password: "",
    confirm_password: ""
  }

  let formState = {
    first_name: "",
    last_name: "",
    organization_name: "",
    email_id: "",
    create_password: "",
    confirm_password: "",
  }
  
  let formResponseState={
    code: 999,
    message: ""
  }

  const [state, setState] = useState<FormData>({
    ...formState,
    errors: {
      ...formErrorState
    },
    response: {
      ...formResponseState
    }
  })

  interface passObj {
    display1: boolean
    display2: boolean
  }

  const [showPass, setShowPass] = useState<passObj>({ display1: false, display2: false })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(
      {
        ...state,
        [e.target.name]: e.target.value
      }
    )
  };

  const handleSubmit = async () => {
    let errorFlag = false;
    let errObj: FormError = {
      ...formErrorState
    }

    if (isEmptyVariable(state?.first_name)) {
      errorFlag = true;
      errObj.first_name = "First Name is required!"
    }
    if (isEmptyVariable(state?.last_name)) {
      errorFlag = true;
      errObj.last_name = "Last Name is required!"
    }
    if (isEmptyVariable(state?.organization_name)) {
      errorFlag = true;
      errObj.organization_name = "Organization Name is required!"
    }
    if (isEmptyVariable(state?.email_id)) {
      errorFlag = true;
      errObj.email_id = "Email ID is required!"
    }
    if (!isEmptyVariable(state?.email_id) && !isValidateEmail(state?.email_id)) {
      errorFlag = true;
      errObj.email_id = "Email Id is not valid!"
    }
    if (isEmptyVariable(state?.create_password)) {
      errorFlag = true;
      errObj.create_password = "Create Password is required!"
    }
    if (isEmptyVariable(state?.confirm_password)) {
      errorFlag = true;
      errObj.confirm_password = "Confirm Password is required!"
    }
    if ((!isEmptyVariable(state?.confirm_password) && state?.confirm_password.length < 8)) {
      errorFlag = true;
      errObj.confirm_password = "Password should atleast 8 characters"
    }
    if ((!isEmptyVariable(state?.create_password) && state.create_password.length < 8)) {
      errorFlag = true;
      errObj.create_password = "Password should atleast 8 characters"
    }

    if ((!isEmptyVariable(state?.create_password) && !isEmptyVariable(state?.confirm_password)) && state?.create_password !== state?.confirm_password) {
      errorFlag = true;
      errObj.confirm_password = "Passwords are not matching!"
    }

    if (errorFlag) {
      setState({
        ...state,
        errors: errObj
      })

      setTimeout(() => {
        setState({
          ...state,
          errors: formErrorState
        })
      }, 2000)
    } else {
      let response = await fetch(REGISTER_USER,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          first_name:state.first_name,
          last_name:state.last_name,
          organization_name:state.organization_name,
          email_id:state.email_id,
          password:state.confirm_password
        })
      });
      type Resp={
        status:string,
        data: {} | string
      }
      let result : Resp = await response.json()
      
      if(result?.status === "SUCCESS"){
        setState(
          {
            ...formState,
            errors:formErrorState,
            response:{
              code:1,
              message:"Form Submitted Successfully"
            }
          }
        )

        setTimeout(()=>{
          loginOrlogout("login")
        },4000)
      }
      if(result?.status === "FAILURE"){
        setState(
          {
            ...state,
            response:{
              code:0,
              message:"There is some error from the server please try again!!"
            }
          }
        )
      }

      setTimeout(()=>{
        setState({
          ...formState,
            errors:formErrorState,
            response:formResponseState
        })
      },4000)
    }
  }

  return <div className="login-form max-w-[350px] mx-auto relative py-10 my-auto flex items-center justify-center h-full">
    <div className="login w-full">
      <h1 className="text-3xl font-semibold text-zinc-600 dark:text-zinc-50
              uppercase text-center
              ">SignUp</h1>
      <div className="form-col my-5">
        <input type="text"
          className="border-2 border-sky-600 px-3 py-2 w-full dark:bg-white"
          name="first_name"
          onChange={handleChange}
          placeholder="First Name"
          value={state?.first_name}
        />
        {
          state.errors.first_name &&
          <p className="text-red-500 mb-0 text-[13px] absolute">{state.errors.first_name}</p>
        }
      </div>
      <div className="form-col my-5">
        <input type="text"
          className="border-2 border-sky-600 px-3 py-2 w-full dark:bg-white"
          name="last_name"
          onChange={handleChange}
          placeholder="Last Name"
          value={state?.last_name}
        />
        {
          state.errors.last_name &&
          <p className="text-red-500 mb-0 text-[13px] absolute">{state.errors.last_name}</p>
        }
      </div>
      <div className="form-col my-5">
        <input type="text"
          className="border-2 border-sky-600 px-3 py-2 w-full
                    dark:bg-white"
          name="organization_name"
          onChange={handleChange}
          placeholder="Organization Name"
          value={state?.organization_name}
        />
        {
          state.errors.organization_name &&
          <p className="text-red-500 mb-0 text-[13px] absolute">{state.errors.organization_name}</p>
        }
      </div>
      <div className="form-col my-5">
        <input type="email"
          className="border-2 border-sky-600 px-3 py-2 w-full
                    dark:bg-white"
          name="email_id"
          onChange={handleChange}
          placeholder="Email ID"
          value={state?.email_id}
        />
        {
          state.errors.email_id &&
          <p className="text-red-500 mb-0 text-[13px] absolute">{state.errors.email_id}</p>
        }
      </div>
      <div className="form-col my-5 relative">
        <input type={showPass?.display1 ? "text" : "password"}
          className="border-2 border-sky-600 px-3 py-2 w-full
                    dark:bg-white"
          name="create_password"
          onChange={handleChange}
          value={state?.create_password}
          placeholder="Create Password"
        />
        <button className="absolute top-0 right-3 translate-y-3 cursor-pointer"
          onClick={() => {
            setShowPass({
              ...showPass,
              display1: !showPass.display1
            })
          }}
        >
          {
            showPass?.display1 ?
              <IoEyeOutline />
              :
              <IoEyeOffOutline />
          }
        </button>

        {
          state.errors.create_password &&
          <p className="text-red-500 mb-0 text-[13px] absolute">{state.errors.create_password}</p>
        }
      </div>
      <div className="form-col  my-5 relative">
        <input type={showPass?.display2 ? "text" : "password"}
          className="border-2 border-sky-600 px-3 py-2 w-full
                    dark:bg-white"
          name="confirm_password"
          onChange={handleChange}
          value={state?.confirm_password}
          placeholder="Confirm Password"
        />
        <button className="absolute top-0 right-3 translate-y-3 cursor-pointer"
          onClick={() => {
            setShowPass({
              ...showPass,
              display2: !showPass.display2
            })
          }}
        >
          {
            showPass?.display2 ?
              <IoEyeOutline />
              :
              <IoEyeOffOutline />
          }
        </button>
        {
          state.errors.confirm_password &&
          <p className="text-red-500 mb-0 text-[12px] absolute">{state.errors.confirm_password}</p>
        }
      </div>
      <div className="form-col my-5">
        <button className="bg-sky-600 text-white px-3 py-2 w-full dark:text-white
                hover:bg-black hover:text-white dark:hover:bg-sky-500 cursor-pointer dark:bg-sky-600
                "
          onClick={handleSubmit}
        >Signup</button>

        {
          (state.response.code === 1 || state.response.code === 0) &&
          <p className={`${state.response.code == 0 ? 'text-red-500' : 'text-green-700'}`}>{state.response.message}</p>
        }
      </div>
      <p className="text-center text-zinc-600 dark:text-zinc-50">Already have an account ?
        <button className="text-sky-600 dark:text-sky-600 ml-2.5
                  cursor-pointer hover:text-black dark:hover:text-sky-300"
          onClick={() => loginOrlogout('login')}
        >Login</button></p>
    </div>
  </div>
}