import { motion } from "framer-motion";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import image1 from "../../../assets/developer/developer-celebrate.jpg";
import image from "../../../assets/developer/developer-team.jpg";

const Banner = () => {
  return (
    <div className="hero bg-base-100">
      <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          animate={{ y: [50, 0] }}
          transition={{
            duration: 1,
            delay: 0,
            ease: "easeInOut",
          }}
        >
          <h1 className="text-5xl font-bold">
            Latest {""}
            <motion.span
              animate={{ color: ["#EE552A", "#ff9f33", "#f1bd24", "#ec812e"] }}
              transition={{ duration: 3, delay: 1, repeat: Infinity }}
            >
              Jobs
            </motion.span>{" "}
            For You!
          </h1>
          <p className="py-6 opacity-80">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="flex justify-center">
            <button className="group btn text-[#EE552A] btn-outline rounded-full flex gap-1 min-w-40 transition-all hover:bg-[#EE552A] hover:text-white hover:border-transparent hover:shadow-md relative pr-14">
              Get Started
              <span className="transition-all absolute right-7 group-hover:right-5">
                <IoIosArrowRoundForward size={30} />
              </span>
            </button>
          </div>
        </motion.div>

        <div className="hidden md:block">
          <motion.img
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 3,
              delay: 0,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            src={image}
            className="max-w-72  shadow-2xl rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-[#EE552A]"
          />
          <motion.img
            animate={{ x: [100, 120, 100] }}
            transition={{ duration: 3, delay: 1.5, repeat: Infinity }}
            src={image1}
            className="max-w-60  mt-16 shadow-2xl rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-[#EE552A] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
