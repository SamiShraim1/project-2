/* eslint-disable react/jsx-key */
import axios from "axios";
import { useState } from "react";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import {useNavigate} from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };

  const validateData = async () => {
    const userSchema = object({
      userName: string().min(4).max(15).required(),
      email: string().email().required(),
      password: string().min(8).max(20).required(),
      image: string().required(),
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
    setErrors([]);
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

    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image);
    setisLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.info("Now you have to confirm your email",{
        autoClose: false,
      });
      navigate('/login');
      console.log(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message|| "Something  wrong");
      console.log(error.response.data.message);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handelSubmit}>
        <label htmlFor="name1">user name</label>
        <input
          type="text"
          name="userName"
          id="name1"
          value={user.userName}
          onChange={handleChange}
        />
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
        <label htmlFor="image1">image</label>
        <input type="file" name="image" id="image1" onChange={handleImageChange} />
        <button className="btn btn-secondary" disabled={isLoading ? "disabled" : null}>
          {!isLoading ? "Register" : <BeatLoader color="#0b0d19" />}
        </button>
      </form>
    </>
  );
}
