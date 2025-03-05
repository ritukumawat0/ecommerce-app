import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from '../components/NewsLetter';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col gap-16 md:flex-row">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            quasi veritatis doloremque earum eveniet sed quibusdam omnis placeat
            numquam tenetur, voluptas necessitatibus atque reprehenderit
            molestiae vel repudiandae? Repellat, culpa? Id!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            eius sapiente delectus quae molestias voluptas? Magnam nulla atque,
            facere quisquam eius consequatur nihil ducimus similique hic beatae.
            Saepe, blanditiis quis?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque,
            eligendi, ducimus, soluta quasi illum aperiam voluptas est
            consequatur odit doloremque officiis repudiandae aliquam vitae?
            Inventore dolores dolorem sed minima dignissimos.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quasi
            ab quo recusandae eum atque.
          </p>
        </div>
        <div className="border px-10 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quasi
            ab quo recusandae eum atque.
          </p>
        </div>
        <div className="border px-10 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quasi
            ab quo recusandae eum atque.
          </p>
        </div>
      </div>
      <NewsLetter/>
    </div>
  );
};

export default About;
