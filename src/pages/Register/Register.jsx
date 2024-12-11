import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import animation from "..//..//assets/Lotie/login.json";
const Register = () => {
  const loginFormHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const terms = form.terms.checked;
    console.log({ email, password, name, photo, terms });
  };
  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className=" lg:text-left">
            <Lottie className="w-full max-w-md" animationData={animation} />
          </div>
          <div className="card bg-base-100 w-full shrink-0 duration-150 max-w-md border-[#EE552A] hover:shadow-2xl ">
            <div className="text-center mt-5">
              <h1 className="text-4xl font-bold">Register now!</h1>
            </div>
            <form onSubmit={loginFormHandler} className="p-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered rounded-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL"
                  className="input input-bordered rounded-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered rounded-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered rounded-full"
                  required
                />
                <div className="form-control">
                  <label className="cursor-pointer label flex-row-reverse justify-end gap-1">
                    <span className="label-text">
                      Accept our terms & conditions
                    </span>
                    <input
                      name="terms"
                      type="checkbox"
                      className="checkbox rounded-full "
                    />
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn hover:-translate-y-[2px] hover:bg-[#EE552A] bg-[#FFAD7B] text-white rounded-full hover:shadow-2xl transition-all duration-200">
                  Register now
                </button>
              </div>
            </form>
            <div className="p-5 pt-0">
              <div className="divider"> OR</div>
              <button className="btn hover:-translate-y-[2px] !bg-white hover:shadow transition-all duration-200 hover:rounded-full w-full flex">
                <FcGoogle size={25} /> <span>Log in with Google</span>
              </button>
              <p className="my-3 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline hover:text-[#EE552A]">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
