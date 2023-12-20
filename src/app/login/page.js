"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import Link from "next/link";
import {auth} from '../firebase';
import { loginValidation } from "@/validationSchema/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";

const Login = () => {
    const { handleSubmit, register, formState:{errors}} = loginValidation();
    const router = useRouter();
    useAuthentication();
    const submitForm = (values) => {
        signInWithEmailAndPassword(auth,values.email,values.password).then((response)=>{
            console.log(response);
            if(response.user.emailVerified){
                router.push("/home");
            }else{
                alert("Sorry, you are not verified. Please verify your email.");
            }
        }).catch((e)=>{
            console.log("Login Error ", e.message);
            alert("Please try Again");
        });
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br">
            <div className="w-full mx-4 md:w-1/2 rounded-md bg-white/30 shadow-lg flex justify-between flex-col">
                <div className="h-28 w-full justify-center flex items-center">
                    <span className="text-2xl mx-4 text-black font-mono font-semibold bg-slate-300 p-3 rounded-lg">Welcome To SignIn</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto ">
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
                    <SubmitButton label="Submit" />
                </form>
                <div className="h-20 mx-auto">
                    <span className="text-sm text-gray-600">Don't have an account?  
                        <Link href={"/register"}><span className="text-black font-semibold text-md" > Register Here</span></Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login;