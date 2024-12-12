import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../assets/logo.png";
import { AuthContext } from "./../../../Provider/AuthContext/AuthContext";

const Navbar = () => {
  const {
    user,
    signOutUser,
    setUser,
    loading: globalLoading,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signOutHandler = () => {
    signOutUser().then(() => {
      navigate("/login");
      Swal.fire({
        title: "sign out success",
        timer: 2000,
        showConfirmButton: false,
      });
    });
  };

  useEffect(
    () => {
      try {
        const email = user?.email;
        setLoading(true);
        if (email) {
          fetch(`http://localhost:5000/users/${email}`)
            .then((res) => res.json())
            .then((data) => {
              setUser(data.data);
            });
        } else {
          setUser(null);
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [user?.email],
    setUser
  );

  const navLink = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-application"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          My Application
        </NavLink>
      </li>
    </>
  );
  const links = (
    <>
      {user ? (
        <>
          <button
            className="hover:-translate-y-1 rounded-full duration-200 btn btn-sm bg-[#EE552A] hover:btn-outline text-black hover:!text-[#EE552A] hover:!bg-transparent hover:!border-[#EE552A]"
            onClick={signOutHandler}
          >
            Sign Out
          </button>
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

  if (loading || globalLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    );
  }
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full px-5 sm:px-10 lg:px-24">
            <div className="flex-none md:hidden">
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
            <div className="">
              <Link to={"/"} className="flex items-center gap-1 ">
                <img src={logo} className="w-10" alt="" />{" "}
                <span className="text-lg font-bold">A Job Portal</span>
              </Link>
            </div>

            <div className="flex-1 flex justify-between">
              <ul className="hidden md:flex justify-center gap-2 flex-1 w-full">
                {navLink}
              </ul>
              {user && <p>Welcome, Back! {user?.name}</p>}
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {links}
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {links}
            {navLink}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
