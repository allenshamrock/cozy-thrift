"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomInput from "../backoffice/CustomInput";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button";
import { z } from "zod";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
// import { signup} from "@/actions/authActions"
import { useState } from "react";

export const signupFormSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(2).max(20),
    password: z.string().min(6, "Password must be a minimum of 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TsignUp = typeof signupFormSchema;

export default function SignUpForm({
  message,
}: {
  message: string | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(data)

    try{
        setLoading(true)
        // const response = await signup(data)
        // console.log("signup done",response)
        setLoading(false)
    }catch(error){
        console.log(error)
        toast.error("Something went wrong!")
    }finally{
        setLoading(false)
    }
  };

   return (
     <>
       <button
         className="flex items-center gap-2 font-semibold"
         onClick={() => router.back()}
       >
         <ChevronLeft /> <span>Back</span>
       </button>
       <div className="grid place-items-center mt-1 mb-6">
         <motion.form
           initial={{
             y: 30,
             opacity: 0,
           }}
           animate={{
             y: 0,
             opacity: 1,
           }}
           transition={{ duration: 0.5 }}
           onSubmit={handleSubmit(onSubmit)}
           className="md:shadow md:border md:p-10 mt-4 md:mt-10 rounded-3xl max-md:w-full md:min-w-[500px]"
         >
           <div className="text-center">
             <h1 className="font-semibold text-lg ">Create an account</h1>
             <p className="text-gray-500">Please fill in your details</p>
           </div>
           <div className="mt-6 md:mt-10 flex flex-col gap-3">
             <CustomInput
               label="Email"
               name="email"
               type="email"
               placeholder="Enter your email"
               register={register}
               errors={errors}
             />
             <CustomInput
               label="First Name"
               name="firstname"
               placeholder="John"
               register={register}
               errors={errors}
             />
             <CustomInput
               label="Last Name"
               name="lastname"
               placeholder="Doe"
               register={register}
               errors={errors}
             />
             <CustomInput
               label="Password"
               name="password"
               placeholder="Enter your password"
               register={register}
               errors={errors}
               type="password"
             />
             {message && (
               <p className="text-center text-red-600 mt-3">{message}</p>
             )}
             <Button
               disabled={loading}
               className="mt-4 bg-rose-600 text-white border-secondary py-3"
               solid
               loading={loading}
               label={loading ? "Signing up..." : "Sign Up"}
             />
           </div>
           <div className="mt-6 text-center text-gray-500">
             Already have an account ?{" "}
             <Link className="font-semibold text-rose-600" href="/signin">
               Sign in
             </Link>
           </div>
         </motion.form>
       </div>
     </>
   );
}
