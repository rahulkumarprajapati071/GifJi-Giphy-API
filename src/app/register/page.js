"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import useAuthentication from "@/hooks/useAuthentication";
import { auth } from "../firebase";
import { registerValidation } from "@/validationSchema/auth";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  useAuthentication();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = registerValidation();
  const submitForm = async (values) => {
    console.log("Register form values", values);
    const result = createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    // Check if user is signed in
    if (result) {
      // Send email verification
      sendEmailVerification((await result).user);
      alert("Please check your email for verification.");
      reset();
      router.push("/login");
    } else {
      // Handle the case where the user is not signed in
      alert("User registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br">
      <div className="w-full mx-5 md:w-1/2 rounded-md bg-white/30 shadow-lg flex justify-between flex-col">
        <div className="h-28 w-full justify-center flex items-center">
          <span className="text-2xl md:text-3xl text-black font-mono font-semibold bg-slate-300 p-3 rounded-lg">
            Welcome To Register
          </span>
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="h-full w-1/2 mx-auto "
        >
          <InputField
            register={register}
            error={errors.email}
            type="text"
            placeholder="Enter Your Email Here..."
            name="email"
            label="Email"
          />
          <InputField
            register={register}
            error={errors.password}
            type="password"
            placeholder="Enter Your Password Here..."
            name="password"
            label="Password"
          />
          <InputField
            register={register}
            error={errors.cnfPassword}
            type="password"
            placeholder="Enter Your Confirm Password Here..."
            name="cnfPassword"
            label="Confirm Password"
          />
          <SubmitButton label="Submit" />
        </form>
        <div className="h-20 mx-auto">
          <span className="text-sm text-gray-600">
            Already have account?
            <Link href={"/login"}>
              <span className="text-black font-semibold text-md">
                {" "}
                Login Here
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
