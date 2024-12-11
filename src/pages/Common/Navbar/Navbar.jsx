import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/icons8-job-seeker-100.png";
import { AuthContext } from "./../../../Provider/AuthContext/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const links = (
    <>
      {user ? (
        <>
          <button>Sign Out</button>
        </>
      ) : (
        <>
          <li className=" hover:-translate-y-[2px] duration-200 hover:text-[#EE552A] underline ">
            <Link to={"/register"} className="!bg-transparent">
              Register
            </Link>
          </li>
          <li className="relative">
            <Link
              to={"/login"}
              className="hover:-translate-y-1 rounded-full duration-200 btn btn-sm bg-[#EE552A] hover:btn-outline text-black hover:!text-[#EE552A] hover:!bg-transparent hover:!border-[#EE552A]"
            >
              Log in
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full px-5 sm:px-10 lg:px-20">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">
              <Link to={"/"} className="flex items-center gap-1 ">
                <img src={logo} className="w-10" alt="" />{" "}
                <span className="text-lg font-bold">A Job Portal</span>
              </Link>
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {links}
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {links}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
