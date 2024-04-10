/* eslint-disable react/jsx-key */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { BeatLoader } from 'react-spinners';
import {UserContext} from "../../../../context/User";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const {getUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const validateData = async () => {
    const userSchema = object({
    
      email: string().email().required(),
      password: string().min(8).max(20).required(),
    
    });
    try {
      await userSchema.validate(user, { abortEarly: false });
      setErrors([]);
      return true;
    } catch (error) {
      error.errors.map((e) => {
        toast.error(e, {
          autoClose: 5000,
          hideProgressBar: false,
        });
      });
      setErrors(error.errors);
      return false;
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const validate= await validateData();
    if (!validate) {
      errors.map((e) =>
        toast.error(e, {
          autoClose: 5000,
          hideProgressBar: false,
        })
      );
      return;
    }
    setisLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        user
      );
      console.log(data.message);
      if (data.message == "success") {        
        toast.success(`hi ${jwtDecode(data.token).userName}`,{
          position: "top-right",
        });
        localStorage.setItem("userToken", data.token);
        getUserData();
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message||"Something  wrong");
    } finally {
      setisLoading(false);
    }
  };
  return (
    <>
      <h2>Login</h2>
   
      <form onSubmit={handelSubmit}>
        <label htmlFor="email1">email</label>
        <input
          type="text"
          name="email"
          id="email1"
          value={user.email}
          onChange={handleChange}
        />
        <label htmlFor="password1">password</label>
        <input
          type="password"
          name="password"
          id="password1"
          value={user.password}
          onChange={handleChange}
        />

        <button className="btn btn-secondary" disabled={isLoading ? "disabled" : null}>
          {!isLoading ? "Login" : <BeatLoader color="#0b0d19" />}
        </button>
      </form>
      <hr />
      <Link  className="btn btn-secondary" to={"/Sendcode/"} >
      forgot password ?
      </Link>
    </>
  );
}
