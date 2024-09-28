import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { loginUser, logoutUser } from "../features/auth/authSlice";
import axios from "axios";
import config from '../lip/config'
import Helper from "../lip/Helper";
import ApiUrl from '../lip/ApiUrl'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!loginState) {
      localStorage.clear();
      store.dispatch(logoutUser());
    }
  }, [loginState]);

  const isValidate = () => {
    let isProceed = true;

    if (email.length === 0) {
      isProceed = false;
      toast.warn("Please enter a email");
    } else if (password.length < 4) {
      isProceed = false;
      toast.warn("Password must be minimum 4 characters");
    }
    return isProceed;
  };

  const loginBtn = async (e) => {
    e.preventDefault();
    try {
      if (isValidate()) {
        let data = {
          email: email,
          password: password,
        }
        Helper.makeRequest({ url: ApiUrl.LOGIN, method: 'POST', data: data })
          .then((response) => {
            console.log(response, '=+++++++++++++++++');
            if(response.success){
              toast.success(response.message);
              localStorage.setItem("token", response?.token);
              localStorage.setItem("userData", response?.user?._id);
              Helper.UserData = response?.user
              store.dispatch(loginUser());
              navigate("/");
              console.log(response?.user,'+++++++++user+++++++++++')
              console.log(response?.token,'+++++++++token+++++++++++')
            }
          })
          .catch((error) => {
            toast.error("Login failed: " + error.message);
            console.error(error);
          });
      }
    } catch (err) {
      console.log(err, 'err++++++++++');
    }
  }

  return (
    <>
      <SectionTitle title="Login" path="Home | Login" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={loginBtn}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                E-mail
              </label>
              <input
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Password
              </label>
              <input
                type="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
              to="/register"
              className="btn btn-neutral text-white"
              onClick={() => window.scrollTo(0, 0)}
            >
              Don't have an account? Please register.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
