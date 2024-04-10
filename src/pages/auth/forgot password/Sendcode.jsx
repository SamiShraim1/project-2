/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { object , string} from 'yup';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Sendcode() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    email: "",
  });
  
  const validateData = async () => {
    const userSchema = object({
      email: string().email().required(),
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
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({
        ...user,
        [name]: value,
      });
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
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API_URL}/auth/sendcode`,
          user
        );
      
      if (data.message == "success") {        
        toast.success('The code has been sent to your email',{
          position: "top-right",
        });
        localStorage.setItem("email",user.email);
        navigate('/ForgotPassword');
      }
      }catch(error){
        toast.error(error.response?.data?.message||"Something  wrong");
      }finally {
        setisLoading(false);
      }
    }
  
  return (
   <>
   <form onSubmit={handelSubmit}>
   <label htmlFor="email1">email</label>
        <input
          type="text"
          name="email"
          id="email1"
          value={user.email}
          onChange={handleChange}
        />
        <button className="btn btn-secondary" disabled={isLoading ? "disabled" : null}>
          {!isLoading ? "Login" : <BeatLoader color="#0b0d19" />}
        </button>
   </form>
   </>
  )
}
