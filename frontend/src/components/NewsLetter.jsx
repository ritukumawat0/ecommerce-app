import React from "react";

const NewsLetter = () => {
    const onSubmitHandler=(e)=>{
        e.preventDefault()
    }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now and get 20% off
      </p>
      <p className="text-gray-400 mt-3 mb-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
      </p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto border pl-3">
        <input type="email" placeholder="enter your email" className="w-full sm:flex-1 outline-none" required/>
        <button type="submit" className="bg-black text-white text-xs px-10 py-4">SUBSCRIBE</button>
      </form>
    </div>
  );
};

export default NewsLetter;
