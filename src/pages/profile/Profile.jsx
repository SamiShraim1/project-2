import React from 'react'
import { useState } from 'react';
import axios  from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
export default function Profile() {
    const [order, setorder] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    // const [isLoadingForButton, setIsLoadingForButton] = useState(false);
    const [error, setError] = useState(false);
  
    const getprofile = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        });
        setorder(data.orders);
        console.log(data);
      } catch (error) {
        toast.warn(error.response?.data?.message || 'Something went wrong while get data');
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    useEffect(() => {
     getprofile();
    // getUserInfo();
  }, []);
  if (isLoading) {
    return <BeatLoader color="#0b0d19" />;
  }
  if (error) {
    return <h2>Something went wrong while fetching data</h2>;
  }

  return (
    <>
    <div>Profile</div>
   
    {order.map((e)=>(
    <div key={e._id}>
        <p>the order have {e.products.length} products ,its {e.status} ,the price is {e.finalPrice}$ {e.paymentType} </p>
        {/* <button disabled={isLoadingForButton}className="btn btn-secondary" onClick={() => cancelOrder(e._id)}>
            {!isLoadingForButton ? 'remove the order' : <BeatLoader color="#0b0d19" />}
          </button>  */}
   </div>
    ))}    


    </>
    
  )
}
// const getUserInfo = async () => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}//user/profile`,
//        {
//         headers: {
//           Authorization: `Tariq__${token}`,
//         },
//       });
//       console.log(data);
//     } catch (error) {
//       toast.warn(error.response?.data?.message || 'Something went wrong while get data');
//       setError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const confirmAction = async (message, onConfirm) => {
//     if (window.confirm(message)) {
//       onConfirm();
//     }
//   };
//   const cancelOrder = (id)=>{
//     confirmAction('Are you sure you want to remove this item?', async () => {
//         setIsLoadingForButton(true);
//         try {
//           const token = localStorage.getItem('userToken');
//           const { data } = await axios.patch(
//             `${import.meta.env.VITE_API_URL}/order/cancel/${id}`,{},
//             {
//               headers: {
//                 Authorization: `Tariq__${token}`,
//               },
//             }
//           );
//           getprofile(); 
//           console.log(order);
//         } catch (error) {
//           toast.warn(error.response?.data?.message || 'Something went wrong while updating quantity');
//         } finally {
//           setIsLoadingForButton(false);
//         }
//     })
//   }