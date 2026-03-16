import { FORGOT_PASSWORD, UPDATE_PASSWORD } from "@/app/url/apiendpoints"
import { isEmptyVariable, isValidateEmail } from "@/app/util/util_functions"
import { useState } from "react"
import { FiLoader } from "react-icons/fi"

type Props = {
  loginOrlogout: (value: string) => void
}
const ForgotPassword = ({ loginOrlogout }: Props) => {
  interface ApiResponse {
    code: number
    message: string
  }
  interface InitialData {
    email_id: string
    error: string
    response: ApiResponse
  }

  let initialState = {
    email_id: "",
    error: "",
  }
  let responseState = {
    code: 999,
    message: ""
  }
  const [state, setState] = useState({
    ...initialState,
    response: {
      ...responseState
    }
  });

  const [showPass, setShowPass] = useState<boolean>(false)
  const [passwordState, setPasswordState] = useState({
    new_password: "",
    confirm_password: "",
    errors: {
      new_password: "",
      confirm_password: ""
    },
    response: {
      code: 999,
      message: ""
    },
    loading: false
  });
  const [apiResponseState, setApiResponseState] = useState({
    code: 999,
    message: "",
    loading: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      email_id: e.target.value
    })
  }
  const handleSubmit = async () => {
    let errFlag: boolean = false;
    if (isEmptyVariable(state.email_id)) {
      errFlag = true;
      setState({
        ...state,
        error: "Email ID is required!"
      })
    };

    if (!isEmptyVariable(state.email_id) && !isValidateEmail(state.email_id)) {
      errFlag = true;
      setState({
        ...state,
        error: "Email ID is not valid!"
      })
    }

    if (!errFlag) {
      setApiResponseState({
        ...apiResponseState,
        loading: true
      })
      let res = await fetch(FORGOT_PASSWORD, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email_id: state.email_id
        })
      });
      res = await res.json();

      if (res.status === 'SUCCESS') {
        setState({
          ...state,
          error: ""
        })
        setShowPass(!showPass)

        setApiResponseState({
          code: 1,
          message: res.message,
          loading: false
        })
      } else {
        setState({
          ...state,
          error: ""
        })
        setApiResponseState({
          code: 0,
          message: res.message,
          loading: false
        })
        setShowPass(false)
      }
    } else { }


  }


  const handleChangePasswordSubmit = async () => {
    let errorFlag: boolean = false;
    let obj = {
      new_password: "",
      confirm_password: ""
    }
    if (isEmptyVariable(passwordState?.new_password)) {
      errorFlag = true
      obj.new_password = "New password is required!"
    }
    if (isEmptyVariable(passwordState?.confirm_password)) {
      errorFlag = true
      obj.confirm_password = "Confirm password is required!"
    }
    if (!isEmptyVariable(passwordState?.new_password) && passwordState?.new_password.length < 8) {
      errorFlag = true
      obj.new_password = "New password atleast above or equal to 8 characters!"
    }
    if (!isEmptyVariable(passwordState?.confirm_password) && passwordState?.new_password.length < 8) {
      errorFlag = true
      obj.confirm_password = "Confirm password atleast above or equal to 8 characters!"
    }

    if (!isEmptyVariable(passwordState?.confirm_password) && !isEmptyVariable(passwordState?.new_password)
      && ((passwordState?.confirm_password.length !== passwordState?.new_password.length) ||
        (passwordState?.confirm_password !== passwordState?.new_password))
    ) {
      errorFlag = true;
      obj.new_password = "New password and confirm password are not same!"
      obj.confirm_password = "Confirm password and new password are not same!"
    }


    if (errorFlag) {
      setPasswordState({
        ...passwordState,
        errors: obj
      })
    } else {
      setPasswordState({
        ...passwordState,
        errors: {
          new_password: "",
          confirm_password: ""
        },
        loading: true
      })

      let response = await fetch(UPDATE_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email_id: state?.email_id,
          password: passwordState?.new_password
        })
      });
      response = await response.json()

      if (response?.status === 'SUCCESS') {
        setPasswordState({
          new_password: "",
          confirm_password: "",
          errors: {
            new_password: "",
            confirm_password: ""
          },
          response: {
            code: 1,
            message: response.message
          },
          loading: false
        })
        setTimeout(() => {
          loginOrlogout('login')
        }, 1000)
      } else {
        setPasswordState({
          ...passwordState,
          response: {
            code: 0,
            message: response.message
          },
          loading: false
        })
      }
    }
  }
  return (
    <div className="login-form max-w-[350px] mx-auto relative py-10 my-auto flex items-center justify-center h-full">
      <div className="login w-full">
        <h1 className="text-3xl font-semibold text-zinc-600 dark:text-zinc-50
              uppercase text-center
              ">Forgot Password</h1>
        <div className="form-col my-5">
          {
            !showPass &&
            <input type="email"
              className="border-2 border-sky-600 px-3 py-2 w-full
                    dark:bg-white
                  "
              onChange={handleChange}
              placeholder="Email ID"
            />
          }

          {
            state.error &&
            <p className="text-red-500 mb-0 text-[13px] absolute">{state.error}</p>
          }
        </div>

        {
          showPass &&
          <div className="form-col my-5">
            <input type="password"
              className="border-2 border-sky-600 px-3 py-2 w-full
                    dark:bg-white
                  "
              onChange={(e) => setPasswordState({ ...passwordState, new_password: e.target.value })}
              placeholder="New Password"
              name="new_password"
              value={passwordState.new_password}
            />
            {
              passwordState?.errors?.new_password &&
              <p className="text-red-500 mb-0 text-[13px] absolute">{passwordState?.errors?.new_password}</p>
            }
            <input type="password"
              className="border-2 border-sky-600 px-3 py-2 w-full
                    dark:bg-white my-5 mb-0
                  "
              onChange={(e) => setPasswordState({ ...passwordState, confirm_password: e.target.value })}
              placeholder="Confirm New Password"
              name="confirm_password"
              value={passwordState.confirm_password}
            />
            {
              passwordState?.errors?.confirm_password &&
              <p className="text-red-500 mb-0 text-[13px] absolute">{passwordState?.errors?.confirm_password}</p>
            }
          </div>
        }
        {
          (apiResponseState?.loading || passwordState?.loading) &&
          <div className="relative top-[-2px] animate-spin w-5 h-5  flex items-center
          justify-center" >
            <FiLoader />
          </div>

        }
        {
          (passwordState?.response.code === 0 || apiResponseState?.code === 0) &&
          <p className="text-red-500 mb-0 text-[13px] absolute mt-[-20px]">{apiResponseState?.message || passwordState?.response?.message}</p>
        }
        {
          (passwordState?.response.code === 1 || apiResponseState?.code === 1) &&
          <p className="text-green-500 mb-0 text-[13px] absolute mt-[-20px]">{apiResponseState?.message || passwordState?.response?.message}</p>
        }
        {
          !showPass ?
            <div className="form-col my-5">
              <button className="bg-sky-600 text-white px-3 py-2 w-full dark:text-black
                hover:bg-black hover:text-white dark:hover:bg-red-500 cursor-pointer dark:bg-sky-600
                "
                onClick={handleSubmit}
              >Submit</button>
            </div> :
            <div className="form-col my-5">
              <button className="bg-sky-600 text-white px-3 py-2 w-full dark:text-black
                hover:bg-black hover:text-white dark:hover:bg-red-500 cursor-pointer dark:bg-sky-600
                "
                onClick={handleChangePasswordSubmit}
              >Change password</button>
            </div>
        }


        <p className="text-center text-zinc-600 dark:text-zinc-50">Already have an account ?
          <button className="text-sky-600 dark:text-sky-600 ml-2.5
                  cursor-pointer hover:text-black dark:hover:text-red-500
                "
            onClick={() => loginOrlogout('login')}
          >Login</button></p>
      </div>
    </div>
  )
}

export default ForgotPassword;