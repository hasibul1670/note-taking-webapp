/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import signup from "../../assets/animation/118046-lf20-oahmox5rjson.json";

const SignUp = () => {
  const [gender, setGender] = useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser } = useContext(AuthContext);

  const mutation = useMutation((userData) => createUser(userData), {
    onSuccess: (data) => {
      reset();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User created successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    },
    onError: (error) => {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const address = data.address;
    const dateofBirth = data.dob;
    const contactNo = data.contactNo;
    mutation.mutate({
      email: email,
      role: "user",
      password: password,
      name: { firstName, lastName },
      address: address,
      dateofBirth: dateofBirth,
      contactNo: contactNo,
    });
  };

  return (
    <div className="main-container lg:p-10  p-4 py-20 md:hero min-h-screen justify-items-center">
      <Helmet>
        <title> Notes | SignUp❤️</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse  ">
          <div className="text-center ">
            <h1 className="text-2xl lg:text-5xl font-bold">
              SignUp <span className="text-blue-500">Now!</span>{" "}
            </h1>

            <div className="w-full mb-10 lg:md:mb-0 lg:mx-auto">
              <Lottie animationData={signup} loop={true} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:hero font-bold "
          >
            <div className="card flex-shrink-0  w-full max-w-screen-md shadow-2xl ">
              <div className="card-body">
                {/* FirstName */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text"> First Name: </span>
                  </label>

                  <input
                    {...register("firstName", { required: true })}
                    name="firstName"
                    placeholder="First Name"
                    className="input input-bordered"
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName?.type === "required" && (
                    <small className="text-red-600">
                      First name is required!
                    </small>
                  )}
                </div>
                {/* Last Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>

                  <input
                    {...register("lastName", { required: true })}
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered"
                  />
                  {errors.lastName?.type === "required" && (
                    <small className="text-red-600">
                      Last name is required!
                    </small>
                  )}
                </div>

                {/* email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Email:</span>
                  </label>

                  <input
                    {...register("email", {
                      required: "Email is required",
                      validate: {
                        maxLength: (v) =>
                          v.length <= 50 ||
                          "The email should have at most 50 characters",
                        matchPattern: (v) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            v
                          ) || "Email address must be a valid address",
                      },
                    })}
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                  />

                  {errors.email?.message && (
                    <small className="text-red-600">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password : </span>
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      validate: {
                        maxLength: (v) =>
                          v.length <= 15 ||
                          "The Password have at most 15 characters",
                        minLength: (v) =>
                          v.length >= 6 ||
                          "The Password have at least 6 characters",
                      },
                    })}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                  />
                  {errors.password?.message && (
                    <small className="text-red-600">
                      {errors.password.message}
                    </small>
                  )}
                </div>


                <div className="form-control mt-6">
                  <button className="btn font-bold btn-primary">
                    Register
                  </button>
                  <p className="text-sm font-bold mt-4">
                    Already have an Account?{" "}
                    <Link to="/login" className="text-blue-500 ">
                      Login
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
