import React from 'react'
import { useState } from 'react';
import { object , string} from 'yup';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
      email: localStorage.getItem('email'),
      password:"",
      code:"",
    });
    
    const validateData = async () => {
        const userSchema = object({
          email: string().email().required(),
          password: string().min(8).max(20).required(),
          code:string().required(),
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
            `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
            user
          );
         
        if (data.message == "success") {        
          toast.success('password changed',{
            position: "top-right",
          });
          localStorage.removeItem('email');
          navigate("/Login");
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
      {/* <label htmlFor="email1">email</label>
          <input
            type="text"
            name="email"
            id="email1"
            value={user.email}
            onChange={handleChange}
          />  */}
     <label htmlFor="password1">password</label>
          <input
            type="text"
            name="password"
            id="password1"
            value={user.password}
            onChange={handleChange}
          />
     <label htmlFor="code1">code</label>
          <input
            type="text"
            name="code"
            id="code1"
            value={user.code}
            onChange={handleChange}
          />
          <button className="btn btn-secondary" disabled={isLoading ? "disabled" : null}>
            {!isLoading ? "Login" : <BeatLoader color="#0b0d19" />}
          </button>
     </form>
     </>
    )
}
