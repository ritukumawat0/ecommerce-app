import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    setCartItems,
    cartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order)=>{
     const options = {
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:order.amount,
        currency:order.currency,
        name:"Order Payment",
        description:"Order Payment",
        order_id:order.id,
        receipt:order.receipt,
        handler:async(response)=>{
          try {
            const {data} = await axios.post(backendUrl+"/api/order/verifyRazorpay",response,{headers:{token}})
            if(data.success){
              navigate("/orders")
              setCartItems({})
            }
          } catch (error) {
            console.log(error);
            toast.error(error)
          }

        }
     }
     const rzp = new window.Razorpay(options)
     rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      //we will get cart items which is placed to proceed to checkout
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      // we are sending address,items,amount
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      //we will use switch case so user choose different payment method

      switch (method) {
        //api calls for cod
        case "cod":
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          break;
 
        case "stripe":
            const responseStripe = await axios.post(backendUrl+"/api/order/stripe",orderData,{headers:{token}})
            if (responseStripe.data.success) {
              const{session_url} = responseStripe.data;
              window.location.replace(session_url)
            }else {
              toast.error(responseStripe.data.message);
            }
          break;

        case "razorpay":
  
           const responseRazorpay = await axios.post(backendUrl+"/api/order/razorpay",orderData,{headers:{token}})
           if(responseRazorpay.data.success){
            initPay(responseRazorpay.data.order)
           }else {
            toast.error(responseRazorpay.data.message);
          }
        break;

        default:
          break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ----------left side---- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"information"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            required
            name="firstName"
            onChange={(e) => onChangeHandler(e)}
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            required
            name="lastName"
            onChange={(e) => onChangeHandler(e)}
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => onChangeHandler(e)}
          placeholder="Email Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          name="street"
          required
          onChange={(e) => onChangeHandler(e)}
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            name="city"
            required
            onChange={(e) => onChangeHandler(e)}
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="state"
            required
            onChange={(e) => onChangeHandler(e)}
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            name="zipcode"
            required
            onChange={(e) => onChangeHandler(e)}
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="country"
            required
            onChange={(e) => onChangeHandler(e)}
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="number"
          name="phone"
          required
          onChange={(e) => onChangeHandler(e)}
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* ----------Right side------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          {/* ---- payment method selection --- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash On Delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
