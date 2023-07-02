import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <div className="min-h-screen sm:px-6 lg:px-8 justify-center py-12 px-12 flex flex-col">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-xl font-bold">LOG IN</h2>
      </div>
      <div className="mt-2 sm:max-w-md sm:w-full sm:mx-auto">
        <div className=" py-8  sm:rounded">
          <form className="space-y-6">
            {/* email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium ">
                EMAIL *
              </label>
              <div className="">
                <input
                  type="email"
                  autoComplete="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full py-2   rounded-sm
                focus:outline-none
               border-b-2
               border-black
                "
                />
              </div>
            </div>
            {/* end email */}
            {/* password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium ">
                PASSWORD *
              </label>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  autoComplete="current-password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full py-2   rounded-sm
                focus:outline-none
               border-b-2
               border-black
                "
                />
                {visible ? (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-3 cursor-pointer"
                    size={20}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEye
                    className="absolute right-2 top-3 cursor-pointer"
                    size={20}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            {/* end password */}
            {/* */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-3.5 w-3.5 cursor-pointer "
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 cursor-pointer  text-sm block font-medium"
                >
                  REMEMBER ME
                </label>
              </div>
              <div className="text-sm">
                <a href="#">FORGOT YOUR PASSWORD?</a>
              </div>
            </div>
            {/*end */}
            {/* */}
            <div>
              <button
                type="submit"
                className="w-full bg-black h-8 font-medium text-sm text-white hover:bg-[#292828] hover:cursor-pointer"
              >
                SIGN IN
              </button>
            </div>
            {/*end */}
            {/* */}
            <div>
              <h1 className="mt-5">CREATE AN ACCOUNT !!!!</h1>
              <p className="text-xs mt-3">
                ENJOY A FASTER CHECKOUT EXPERIENCE AND
                {/* MANAGE ALL YOUR PERSONAL
                INFORMATION IN YOUR DEDICATED ACCOUNT */}
              </p>
              <div>
                <Link to="/register">
                  <button
                    type="submit"
                    className=" mt-5 w-full bg-black h-8 font-medium text-sm text-white hover:bg-[#292828] hover:cursor-pointer"
                  >
                    CREATE AN ACCOUNT
                  </button>
                </Link>
              </div>
            </div>
            {/*end */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
