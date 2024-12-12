import Lottie from "lottie-react";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import animation from "..//..//assets/Lotie/register.json";
const LogIn = () => {
  const { signInWithGoogle, signIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  const loginFormHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        if (res.user) {
          navigate(state?.location || "/");
          Swal.fire({
            title: "User Log in successfully",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: error.message,
          timer: 2000,
          showConfirmButton: false,
        });
      });
  };

  //log in with google
  const googleLoginHandler = () => {
    signInWithGoogle()
      .then((res) => {
        const user = res?.user;
        if (user) {
          const userData = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            terms: false,
          };
          try {
            fetch(`http://localhost:5000/users`, {
              method: "PATCH",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(userData),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  navigate(state?.location || "/");
                  Swal.fire({
                    timer: 2000,
                    title: data.message,
                    showConfirmButton: false,
                  });
                }
              });
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
  };
  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className=" lg:text-left">
            <Lottie className="w-full" animationData={animation} />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 duration-150 border-[#EE552A] hover:shadow-2xl ">
            <div className="text-center mt-5">
              <h1 className="text-4xl font-bold">Login now!</h1>
            </div>
            <form onSubmit={loginFormHandler} className="p-5">
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
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn hover:-translate-y-[2px] hover:bg-[#EE552A] bg-[#FFAD7B] text-white rounded-full hover:shadow-2xl transition-all duration-200">
                  {loading && (
                    <span className="loading loading-spinner loading-xs"></span>
                  )}
                  Login
                </button>
              </div>
            </form>
            <div className="p-5 pt-0">
              <div className="divider"> OR</div>
              <button
                onClick={googleLoginHandler}
                className="btn hover:-translate-y-[2px] !bg-white hover:shadow transition-all duration-200 hover:rounded-full w-full flex"
              >
                <FcGoogle size={25} /> <span>Log in with Google</span>
              </button>
              <p className="my-3 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="underline hover:text-[#EE552A]">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
