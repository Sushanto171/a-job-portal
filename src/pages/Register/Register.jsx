import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import animation from "..//..//assets/Lotie/login.json";
const Register = () => {
  const { createUser, loading, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosInstance = useAxios();

  const passwordValidation = (e) => {
    const password = e.target.value;
    setError("");
    setSuccess("");
    // password validation
    if (!/[a-z]/.test(password)) {
      return setError("At least one lowercase");
    } else if (!/[A-Z]/.test(password)) {
      return setError("At least one Uppercase");
    } else if (!/\d/.test(password)) {
      return setError("At least one digit");
    } else if (password.length < 6) {
      return setError("Password must be 6 character or longer ");
    } else {
      setSuccess("Your password is very strong 💪");
      setError("");
    }
  };

  const loginFormHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const terms = form.terms.checked;
    const userData = { email, name, photo, terms };

    if (error) {
      return error;
    }
    createUser(email, password)
      .then((res) => {
        if (res.user) {
          try {
            fetch("https://a-job-portal-server.vercel.app/users", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(userData),
            })
              .then((res) => res.json())
              .then(async (data) => {
                if (data.success) {
                  const res = await axiosInstance.post("/jwt", {
                    email: email,
                  });

                  Swal.fire({
                    title: data.message,
                    timer: 2000,
                    showConfirmButton: false,
                  });
                  navigate("/");
                  form.reset();
                } else {
                  Swal.fire({
                    title: data.message,
                    timer: 2000,
                    showConfirmButton: false,
                  });
                }
              });
          } catch (error) {
            Swal.fire({
              title: data.message,
              timer: 2000,
            });
          }
        }
      })
      .catch((error) => {
        setError(error.message);
      });
    setError("");
    setSuccess(error.message);
  };

  const googleLoginHandler = () => {
    signInWithGoogle()
      .then(async (res) => {
        const user = res?.user;
        if (user) {
          const res = await axiosInstance.post("/jwt", { email: user.email });
          const userData = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            terms: false,
          };
          try {
            fetch(`https://a-job-portal-server.vercel.app/users`, {
              method: "PATCH",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(userData),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  navigate("/");
                  Swal.fire({
                    timer: 2000,
                    title: data.message,
                    showConfirmButton: false,
                  });
                }
              });
          } catch (error) {}
        }
      })
      .catch((error) => {});
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
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered rounded-full"
                  required
                  onChange={passwordValidation}
                />
                {error && (
                  <p className="text-error text-xs absolute bottom-5 right-4">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-success text-xs absolute bottom-5 right-4">
                    {success}
                  </p>
                )}
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
                  {loading && (
                    <span className="loading loading-spinner loading-xs"></span>
                  )}
                  Register now
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
