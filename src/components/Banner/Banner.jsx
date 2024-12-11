import React from "react";
import image1 from "../../assets/developer/developer-celebrate.jpg";
import image from "../../assets/developer/developer-team.jpg";

const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div>
          <img
            src={image}
            className="max-w-sm rounded-lg shadow-2xl rounded-t-[40px] rounded-br-[40px] border-l-8 border-b-8 border-[#EE552A]"
          />
          <img
            src={image1}
            className="max-w-sm rounded-lg shadow-2xl rounded-t-[40px] rounded-br-[40px] border-l-8 border-b-8 border-[#EE552A] h-56 object-cover"
          />
        </div>
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
