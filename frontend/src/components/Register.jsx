import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleFileInPutChange = (e) => {
    const avatar = e.target.files[0];
    setAvatar(avatar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("password", password);
    newForm.append("email", email);

    axios.post(`${server}/user/register-user`, newForm).then(() => {
      setName("");
      setEmail("");
      setPassword("");
      setAvatar();
    });
  };

  return (
    <div className="min-h-screen sm:px-6 lg:px-8 justify-center py-12 px-12 flex flex-col">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-xl font-bold">CREATE AN ACCOUNT</h2>
      </div>
      {/*  */}
      <div className=" mt-3 sm:mx-auto sm:w-full sm:max-w-md inline-block">
        <Link to="/login" className="flex">
          <MdKeyboardBackspace className="mr-2" />
          <h4 className="text-xs">BACK TO LOGIN </h4>
        </Link>
      </div>
      {/*  */}
      <div className=" sm:max-w-md sm:w-full sm:mx-auto">
        <div className=" py-8  sm:rounded">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium ">
                FULL NAME *
              </label>
              <div className="">
                <input
                  type="text"
                  autoComplete="name"
                  name="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full py-2   rounded-sm
                focus:outline-none
               border-b-2
               border-black
                "
                />
              </div>
            </div>
            {/* end name */}
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
            {/*avatar*/}
            <div>
              {/* <label htmlFor="avatar" className="block"></label> */}
              <div className="flex items-center mt-2">
                <span className=" h-10 w-10 rounded">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full rounded"
                    />
                  ) : (
                    <RxAvatar className="h-10 w-10 " />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 py-2 border-2 border-black flex items-center justify-center px-4"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInPutChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            {/*end avatar */}
            {/* */}
            <div>
              <button
                type="submit"
                className="w-full bg-black h-8 font-medium text-sm text-white hover:bg-[#292828] hover:cursor-pointer"
              >
                CREATE AN ACCOUNT
              </button>
            </div>
            {/*end */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
