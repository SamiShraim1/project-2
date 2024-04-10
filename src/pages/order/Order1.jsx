/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { string, object } from 'yup';
import { useParams } from 'react-router-dom';
export default function Order1() {
    const {price} = useParams();
    const [isLoading, setisLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        "couponName":"",
        "address":"",
        "phone":"",
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
            couponName: string(),
            address: string().required(),
            phone : string().required().min(10).max(15),
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
    const confirmAction = async (message, onConfirm) => {
        if (window.confirm(message)) {
          onConfirm();
        }
      };
  
      const handelSubmit = async (e) => {
        e.preventDefault();
        const validate = await validateData();
        if (!validate) {
          errors.map((e) =>
            toast.error(e, {
              autoClose: 5000,
              hideProgressBar: false,
            })
          );
          return;
        }
    confirmAction(`Are you sure you want to order this items the price is ${price} ?`, async () => {
      setisLoading(true);
      try {
        const token = localStorage.getItem('userToken');
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/order`,
          user,
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }

        );
        toast.success('well done');
        console.log(data.message);
        }
     catch (error) {
        toast.error(error.response.data.message||"Something  wrong");
      } finally {
        setisLoading(false);
      }
    })
};

  return(
    <>
      
   
      <form onSubmit={handelSubmit}>
        <label htmlFor="coupon">coupon</label>
        <input
          type="text"
          name="couponName"
          id="coupon"
          value={user.couponName}
          onChange={handleChange}
        />
        <label htmlFor="address">address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={user.address}
          onChange={handleChange}
        />
        <label htmlFor="phone">phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={user.phone}
          onChange={handleChange}
        />

        <button className="btn btn-secondary" disabled={isLoading ? "disabled" : null}>
          {!isLoading ? "done" : <BeatLoader color="#0b0d19" />}
        </button>
      </form>
      <hr />
      
    </>
  );
}
